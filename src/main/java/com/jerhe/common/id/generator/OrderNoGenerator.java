package com.jerhe.common.id.generator;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.jerhe.common.config.Global;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 订单号生成器
 */
public class OrderNoGenerator {
    public static final Logger logger = LoggerFactory.getLogger(CommonIdStrGenerator.class);

    public static final long SEQUENCE_BITS = 16L;

    public static final long WORKER_ID_BITS = 10L;

    public static final long SEQUENCE_MASK = (1 << SEQUENCE_BITS) - 1L;

    public static final long WORKER_ID_LEFT_SHIFT_BITS = SEQUENCE_BITS;

    private static final long WORKER_ID_MAX_VALUE = 1L << WORKER_ID_BITS;

    private static AbstractClock clock = AbstractClock.systemClock();

    private static long workerId;

    static {
        initWorkerId();
    }

    public OrderNoGenerator() {
    }

    private long sequence;

    private long lastTime;

    static void initWorkerId() {
        String workerIdStr = Global.getConfig("orderNo.generator.worker.id", StringUtils.EMPTY);
        if (!Strings.isNullOrEmpty(workerIdStr)) {
            setWorkerId(Long.valueOf(workerIdStr));
            return;
        }
    }

    /**
     * 设置工作进程Id.
     *
     * @param workerId 工作进程Id
     */
    public static void setWorkerId(final Long workerId) {
        Preconditions.checkArgument(workerId >= 0L && workerId < WORKER_ID_MAX_VALUE);
        OrderNoGenerator.workerId = workerId;
    }

    /**
     * 生成Id.
     *
     * @return 返回@{@link Long}类型的Id
     */
    public synchronized String generatorOrderNo() {
        long time = clock.millis();

        Preconditions.checkState(lastTime <= time,
                "Clock is moving backwards, last time is %d milliseconds, current time is %d milliseconds",
                lastTime, time);
        if (lastTime == time) {
            if (0L == (sequence = ++sequence & SEQUENCE_MASK)) {
                time = waitUntilNextTime(time);
            }
        } else {
            sequence = 0;
        }
        Date date = new Date();
        FastDateFormat format = FastDateFormat.getInstance("yyyyMMddHHmmssSSS");
        String dateStr = format.format(date);
        lastTime = time;
        if (logger.isDebugEnabled()) {
            logger.debug("{}-{}-{}", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date(lastTime)),
                    workerId, sequence);
        }
        String id = StringUtils.leftPad(String.valueOf((workerId << WORKER_ID_LEFT_SHIFT_BITS) | sequence), 8, '0');
        return dateStr + id;
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
        OrderNoGenerator.clock = clock;
    }

    public static long getWorkerId() {
        return workerId;
    }
}
