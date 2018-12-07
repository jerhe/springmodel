package com.jerhe.common.id.generator;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.jerhe.common.config.Global;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 时间戳ID生成器
 * <p>
 * 格式为yyyyMMddHHmmssSSS+workId+seqId
 * </p>
 * <p>
 * <pre> *
 * 10bits 工作进程Id
 * 16bits 同一个毫秒内的自增量
 * </pre>
 */
public class TimestampIdGenerator implements IdGenerator<String> {
    public static final Logger logger = LoggerFactory.getLogger(TimestampIdGenerator.class);

    public static final long SEQUENCE_BITS = 12L;

    public static final long WORKER_ID_BITS = 10L;

    public static final long SEQUENCE_MASK = (1 << SEQUENCE_BITS) - 1;

    public static final long WORKER_ID_LEFT_SHIFT_BITS = SEQUENCE_BITS;

    private static final long WORKER_ID_MAX_VALUE = 1L << WORKER_ID_BITS;

    private static volatile AbstractClock clock = AbstractClock.systemClock();
    static FastDateFormat format = FastDateFormat.getInstance("yyyyMMddHHmmssSSS");

    private static long workerId = 1;

    static {
        initWorkerId();
    }

    public TimestampIdGenerator() {
    }

    private long sequence;

    private long lastTime;

    static void initWorkerId() {
        String workerIdStr = Global.getConfig("ites.id.generator.worker.id", StringUtils.EMPTY);
        if (!Strings.isNullOrEmpty(workerIdStr)) {
            setWorkerId(Long.valueOf(workerIdStr));
            return;
        } else {
            setWorkerId(1L);
        }
    }

    /**
     * 设置工作进程Id.
     *
     * @param workerId 工作进程Id
     */
    public static void setWorkerId(final Long workerId) {
        Preconditions.checkArgument(workerId >= 0L && workerId < WORKER_ID_MAX_VALUE);
        TimestampIdGenerator.workerId = workerId;
    }

    /**
     * 生成Id.
     *
     * @return 返回@{@link Long}类型的Id
     */
    @Override
    public synchronized String generateId() {
        long time = clock.millis();

        Preconditions.checkState(lastTime <= time,
                "Clock is moving backwards, last time is %d milliseconds, current time is %d milliseconds", lastTime,
                time);
        if (lastTime == time) {
            if (0L == (sequence = ++sequence & SEQUENCE_MASK)) {
                time = waitUntilNextTime(time);
            }
        } else {
            sequence = 1;
        }
        Date date = new Date(time);
        FastDateFormat format = FastDateFormat.getInstance("yyyyMMddHHmmssSSS");
        String dateStr = format.format(date);
        lastTime = time;
        if (logger.isDebugEnabled()) {
            logger.debug("{}-{}-{}", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date(lastTime)),
                    workerId, sequence);
        }
        String id = StringUtils.leftPad(String.valueOf((workerId << WORKER_ID_LEFT_SHIFT_BITS) | sequence), 8, '0');
        return dateStr.substring(0, 12) + id + dateStr.substring(12);
    }

    private long waitUntilNextTime(final long lastTime) {
        long time = clock.millis();
        while (time <= lastTime) {
            time = clock.millis();
        }
        sequence = 0;
        return time;
    }

    public static AbstractClock getClock() {
        return clock;
    }

    public static void setClock(AbstractClock clock) {
        TimestampIdGenerator.clock = clock;
    }

    public static long getWorkerId() {
        return workerId;
    }

    public static void main(String[] args) {
        List<String> keyList = new ArrayList<>();
        Set<String> keySet = new HashSet<>();
        TimestampIdGenerator timestampIdGenerator = new TimestampIdGenerator();
        for (int i = 0; i < 1000; i++) {
            String key = timestampIdGenerator.generateId();
            keySet.add(key);
            keyList.add(key);
        }
        Iterator<String> iterator = keyList.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
        System.out.println(keySet.size());
        System.out.println(keyList.size());
        System.out.println(SEQUENCE_MASK);
    }

}
