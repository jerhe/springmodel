package com.jerhe.common.lock;

import java.util.concurrent.TimeUnit;

public interface DistributedReentrantLock {
	public boolean tryLock(long timeout, TimeUnit unit) throws InterruptedException;

	public void unlock();
}
