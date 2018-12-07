/*
 * Copyright 1999-2015 dangdang.com.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * </p>
 */

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

/**
 * 自生成Id生成器.
 * <p>
 * <p>
 * 长度为64bit,从高位到低位依次为
 * </p>
 * <p>
 * <pre>
 * 1bit   符号位
 * 41bits 时间偏移量从2016年11月1日零点到现在的毫秒数
 * 10bits 工作进程Id
 * 12bits 同一个毫秒内的自增量
 * </pre>
 * <p>
 * <p>
 * 工作进程Id获取优先级: 系统变量{@code sjdbc.self.id.generator.worker.id} 大于 环境变量
 * {@code SJDBC_SELF_ID_GENERATOR_WORKER_ID} ,另外可以调用@
 * {@code CommonSelfIdGenerator.setWorkerId}进行设置
 * </p>
 *
 * @author gaohongtao
 */

public class CommonSelfIdGenerator implements IdGenerator<Long> {
    public static final Logger logger = LoggerFactory.getLogger(CommonSelfIdGenerator.class);

    public static final long SJDBC_EPOCH;

    private static final long SEQUENCE_BITS = 12L;

    private static final long WORKER_ID_BITS = 10L;

    private static final long SEQUENCE_MASK = (1 << SEQUENCE_BITS) - 1;

    private static final long WORKER_ID_LEFT_SHIFT_BITS = SEQUENCE_BITS;

    private static final long TIMESTAMP_LEFT_SHIFT_BITS = WORKER_ID_LEFT_SHIFT_BITS + WORKER_ID_BITS;

    private static final long WORKER_ID_MAX_VALUE = 1L << WORKER_ID_BITS;

    private static AbstractClock clock = AbstractClock.systemClock();

    private static long workerId;

    public CommonSelfIdGenerator(long workerId) {

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
        CommonSelfIdGenerator.workerId = workerId;
    }

    /**
     * 生成Id.
     *
     * @return 返回@{@link Long}类型的Id
     */
    @Override
    public synchronized Long generateId() {
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
        sequence = 0;
        return time;
    }

    public static AbstractClock getClock() {
        return clock;
    }

    public static void setClock(AbstractClock clock) {
        CommonSelfIdGenerator.clock = clock;
    }

    public static long getWorkerId() {
        return workerId;
    }

    public static void setWorkerId(long workerId) {
        CommonSelfIdGenerator.workerId = workerId;
    }
}
