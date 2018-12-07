package com.jerhe.common.id.generator;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.jerhe.common.config.Global;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class OrderSeqGenerator {
	public static final Logger logger = LoggerFactory.getLogger(CommonSelfIdGenerator.class);

	public static final long SJDBC_EPOCH;

	private static final long SEQUENCE_BITS = 12L;

	private static final long WORKER_ID_BITS = 10L;

	private static final long SEQUENCE_MASK = (1 << SEQUENCE_BITS) - 1L;

	private static final long WORKER_ID_LEFT_SHIFT_BITS = SEQUENCE_BITS;

	private static final long TIMESTAMP_LEFT_SHIFT_BITS = WORKER_ID_LEFT_SHIFT_BITS + WORKER_ID_BITS;

	private static final long WORKER_ID_MAX_VALUE = 1L << WORKER_ID_BITS;

	private static AbstractClock clock = AbstractClock.systemClock();

	private static long workerId;

	public OrderSeqGenerator() {

	}

	static {
		Calendar calendar = Calendar.getInstance();
		calendar.set(2017, Calendar.JANUARY, 1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		SJDBC_EPOCH = calendar.getTimeInMillis();
		initWorkerId();
	}

	private long sequence;

	private long lastTime;

	static void initWorkerId() {
		String workerId = Global.getConfig("order.seq.generator.worker.id", StringUtils.EMPTY);
		if (!Strings.isNullOrEmpty(workerId)) {
			setWorkerId(Long.valueOf(workerId));
			return;
		}
		setWorkerId(Long.valueOf(workerId));
	}

	/**
	 * 设置工作进程Id.
	 *
	 * @param workerId
	 *            工作进程Id
	 */
	public static void setWorkerId(final Long workerId) {
		Preconditions.checkArgument(workerId >= 0L && workerId < WORKER_ID_MAX_VALUE);
		OrderSeqGenerator.workerId = workerId;
	}

	/**
	 * 生成Id.
	 *
	 * @return 返回@{@link Long}类型的Id
	 */
	public synchronized Long getNextSeq() {
		long time = clock.millis();
		Preconditions.checkState(lastTime <= time,
				"Clock is moving backwards, last time is %d milliseconds, current time is %d milliseconds", lastTime,
				time);
		if (lastTime == time) {
			if (0L == (sequence = ++sequence & SEQUENCE_MASK)) {
				time = waitUntilNextTime(time);
			}
		} else {
			sequence = 0;
		}
		lastTime = time;
		if (logger.isDebugEnabled()) {
			logger.debug("{}-{}-{}", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date(lastTime)),
					workerId, sequence);
		}
		return ((time - SJDBC_EPOCH) << TIMESTAMP_LEFT_SHIFT_BITS) | (workerId << WORKER_ID_LEFT_SHIFT_BITS) | sequence;
	}

	private long waitUntilNextTime(final long lastTime) {
		long time = clock.millis();
		while (time <= lastTime) {
			time = clock.millis();
		}
		return time;
	}

	public static AbstractClock getClock() {
		return clock;
	}

	public static void setClock(AbstractClock clock) {
		OrderSeqGenerator.clock = clock;
	}

	public static long getWorkerId() {
		return workerId;
	}

	public static void setWorkerId(long workerId) {
		OrderSeqGenerator.workerId = workerId;
	}
}
