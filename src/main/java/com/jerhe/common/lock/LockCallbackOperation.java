package com.jerhe.common.lock;

public interface LockCallbackOperation<T> {

    public T onGetLock() throws Exception;

    public T onTimeout() throws Exception;
}
