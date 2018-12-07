package com.jerhe.common.lock.zk;

import com.jerhe.common.lock.DistributedLockTemplate;
import com.jerhe.common.lock.LockCallbackOperation;
import org.apache.curator.framework.CuratorFramework;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

/**
 * zk 分布式锁
 */
public class ZkDistributedLockTemplate implements DistributedLockTemplate {
    private static final Logger log = LoggerFactory.getLogger(ZkReentrantLock.class);

    private CuratorFramework client;


    public ZkDistributedLockTemplate(CuratorFramework client) {
        this.client = client;
    }


    private boolean tryLock(ZkReentrantLock distributedReentrantLock, Long timeout) throws Exception {
        return distributedReentrantLock.tryLock(timeout, TimeUnit.MILLISECONDS);
    }

    @Override
    public Object execute(String lockId, int timeout, LockCallbackOperation callback) {
        ZkReentrantLock distributedReentrantLock = null;
        boolean getLock = false;
        try {
            distributedReentrantLock = new ZkReentrantLock(client, lockId);
            if (tryLock(distributedReentrantLock, new Long(timeout))) {
                getLock = true;
                return callback.onGetLock();
            } else {
                return callback.onTimeout();
            }
        } catch (InterruptedException ex) {
            log.error(ex.getMessage(), ex);
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        } finally {
            if (getLock) {
                distributedReentrantLock.unlock();
            }
        }
        return null;
    }
}
