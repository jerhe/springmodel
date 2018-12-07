package com.jerhe.common.lock.redis;

import com.google.common.collect.Maps;
import com.jerhe.common.lock.DistributedReentrantLock;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * sunyujia@aliyun.com
 */
public class RedisReentrantLock implements DistributedReentrantLock {

    private final ConcurrentMap<Thread, LockData> threadData = Maps.newConcurrentMap();

    private RedisTemplate<String, String> redisTemplate;

    private RedisLockInternals internals;

    private String lockId;

    public RedisReentrantLock(RedisTemplate redisTemplate, String lockId) {
        this.redisTemplate = redisTemplate;
        this.lockId = lockId;
        this.internals = new RedisLockInternals(redisTemplate);
    }

    private static class LockData {
        final Thread owningThread;
        final String lockVal;
        final AtomicInteger lockCount = new AtomicInteger(1);

        private LockData(Thread owningThread, String lockVal) {
            this.owningThread = owningThread;
            this.lockVal = lockVal;
        }
    }

    /**
     * 获取锁
     *
     * @param timeout 超时时间
     * @param unit    单位
     * @return
     * @throws InterruptedException
     */
    @Override
    public boolean tryLock(long timeout, TimeUnit unit) throws InterruptedException {
        Thread currentThread = Thread.currentThread();
        LockData lockData = threadData.get(currentThread);
        if (lockData != null) {
            lockData.lockCount.incrementAndGet();
            return true;
        }
        String lockVal = internals.tryRedisLock(lockId, timeout, unit);
        if (lockVal != null) {
            LockData newLockData = new LockData(currentThread, lockVal);
            threadData.put(currentThread, newLockData);
            return true;
        }
        return false;
    }

    public int getLockTTL() {
        return internals.getLockTTL();
    }

    @Override
    public void unlock() {
        Thread currentThread = Thread.currentThread();
        LockData lockData = threadData.get(currentThread);
        if (lockData == null) {
            throw new IllegalMonitorStateException("You do not own the lock: " + lockId);
        }
        int newLockCount = lockData.lockCount.decrementAndGet();
        if (newLockCount > 0) {
            return;
        }
        if (newLockCount < 0) {
            throw new IllegalMonitorStateException("Lock count has gone negative for lock: " + lockId);
        }
        try {
            internals.unlockRedisLock(lockId, lockData.lockVal);
        } finally {
            threadData.remove(currentThread);
        }
    }
}
