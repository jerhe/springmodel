package com.jerhe.common.id.generator;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.jerhe.common.config.Global;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * 节点时间戳时间戳ID生成器
 * <p>
 * 格式为yyyyMMddHHmmssSSS+workId+seqId
 * </p>
 * <p>
 * <pre> *
 * 10bits 工作进程Id
 * 16bits 同一个毫秒内的自增量
 * </pre>
 */
public class NodeDTTSIdGenerator implements IdGenerator<String> {
    public static final Logger logger = LoggerFactory.getLogger(NodeDTTSIdGenerator.class);

    public static final long SEQUENCE_BITS = 14L;

    public static final long WORKER_ID_BITS = 9L;
    public static final long SEQUENCE_MASK = -1L ^ (-1L << SEQUENCE_BITS);

    public static final long WORKER_ID_LEFT_SHIFT_BITS = SEQUENCE_BITS;

    private static final long WORKER_ID_MASK = -1L ^ (-1L << WORKER_ID_BITS);
    private static final long WORKER_ID_MAX_VALUE = 1L << WORKER_ID_BITS;

    private static AbstractClock clock = AbstractClock.systemClock();

    private static long workerId = 1;

    static {
        initWorkerId();
    }

    public NodeDTTSIdGenerator() {
    }

    private volatile long sequence;

    private volatile long lastTimestamp;

    static void initWorkerId() {
        String workerIdStr = Global.getConfig("iets.id.generator.worker.id", StringUtils.EMPTY);
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
        NodeDTTSIdGenerator.workerId = workerId;
    }

    /**
     * 生成Id.
     *
     * @return 返回@{@link Long}类型的Id
     */
    @Override
    public synchronized String generateId() {
        long timestamp = clock.millis();

        Preconditions.checkState(lastTimestamp <= timestamp,
                "Clock is moving backwards, last time is %d milliseconds, current time is %d milliseconds",
                lastTimestamp, timestamp);
        if (lastTimestamp == timestamp) {
            sequence = (sequence + 1) & SEQUENCE_MASK;
            //毫秒内序列溢出
            if (sequence == 0) {
                //阻塞到下一个毫秒,获得新的时间戳
                timestamp = waitUntilNextTime(lastTimestamp);
            }
        } else {
            sequence = RandomUtils.nextInt(1, 2000);
        }
        Date date = new Date(timestamp);
        FastDateFormat format = FastDateFormat.getInstance("yyyyMMddHHmmssSSS");
        String dateStr = format.format(date);
        lastTimestamp = timestamp;

        String id = StringUtils
                .leftPad(String.valueOf((((WORKER_ID_MASK & workerId) << WORKER_ID_LEFT_SHIFT_BITS) | sequence)), 8,
                        '0');
        //		System.out.println(Long.toBinaryString(workerId));
        //		System.out.println(Long.toBinaryString((WORKER_ID_MASK & workerId)));
        //		System.out.println(Long.toBinaryString((WORKER_ID_MASK & workerId)<< WORKER_ID_LEFT_SHIFT_BITS));
        //		System.out.println(Long.toBinaryString(sequence));
        //		System.out.println(id);
        //		System.out.println(Long.toBinaryString(((WORKER_ID_MASK & workerId) << WORKER_ID_LEFT_SHIFT_BITS) | sequence));
        //		System.out.println(Long.toString(WORKER_ID_MASK & workerId));
        //		System.out.println(Long.toString( sequence));
        //		System.out.println(Long.toString(((WORKER_ID_MASK & workerId) << WORKER_ID_LEFT_SHIFT_BITS) | sequence));
        String ts = dateStr.substring(16);
        return dateStr + id + RandomUtils.nextInt(0, 10);
    }

    private synchronized long waitUntilNextTime(final long lastTime) {
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
        NodeDTTSIdGenerator.clock = clock;
    }

    public static long getWorkerId() {
        return workerId;
    }

    public static void main(String[] args) {
        List<String> keyList = new ArrayList<>();
        Set<String> keySet = new HashSet<>();
        NodeDTTSIdGenerator timestampIdGenerator = new NodeDTTSIdGenerator();
        for (int i = 0; i < 1000; i++) {
            String key = timestampIdGenerator.generateId();
            System.out.println(key);
        }


    }

}
