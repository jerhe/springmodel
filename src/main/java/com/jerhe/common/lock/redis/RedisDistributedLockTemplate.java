package com.jerhe.common.lock.redis;

import com.jerhe.common.lock.DistributedLockTemplate;
import com.jerhe.common.lock.LockCallbackOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.concurrent.TimeUnit;

/**
 * redis 分布式锁
 */
public class RedisDistributedLockTemplate implements DistributedLockTemplate {
    private static final Logger logger = LoggerFactory.getLogger(RedisDistributedLockTemplate.class);

    private RedisTemplate<String, String> redisTemplate;

    public RedisDistributedLockTemplate(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Object execute(String lockId, int timeout, LockCallbackOperation callback) {
        RedisReentrantLock distributedReentrantLock = null;
        boolean getLock = false;
        try {
            distributedReentrantLock = new RedisReentrantLock(redisTemplate, lockId);
            if (distributedReentrantLock.tryLock(new Long(timeout), TimeUnit.MILLISECONDS)) {
                logger.debug("获取到锁, 锁最大存活时长：{}", distributedReentrantLock.getLockTTL());
                getLock = true;
                return callback.onGetLock();
            } else {
                return callback.onTimeout();
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            Thread.currentThread().interrupt();
            throw new RuntimeException(ex);
        } finally {
            if (getLock) {
                distributedReentrantLock.unlock();
            }
        }
    }
}
