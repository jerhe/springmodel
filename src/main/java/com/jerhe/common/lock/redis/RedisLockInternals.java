package com.jerhe.common.lock.redis;

import com.jerhe.common.util.Constant;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisCluster;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.LockSupport;

class RedisLockInternals {
	private static final Logger logger = LoggerFactory.getLogger(RedisLockInternals.class);

	private RedisTemplate<String, String> redisTemplate;

	/**
	 * 重试等待时间
	 */
	private int retryAwait = 30;

	private int lockTTL = 2000;

	RedisLockInternals(RedisTemplate redisTemplate) {
		this.redisTemplate = redisTemplate;
		if (Constant.LOCK_TTL != null && Constant.LOCK_TTL > 0) {
			this.lockTTL = Constant.LOCK_TTL;
		}
	}

	RedisLockInternals(RedisTemplate redisTemplate, int lockTTL) {
		this.redisTemplate = redisTemplate;
		this.lockTTL = lockTTL;
	}

	/**
	 * 获取锁
	 * 1. 获取等待的毫秒数
	 * 2. 使用指定lockId 获取redis 锁,
	 * 2.1 获取到锁, 返回
	 * 2.2 未获取到锁, 判断消耗的时间是否大于获取锁的超时时间, 是, 返回.
	 * 3. 线程阻塞指定时间的毫秒数, 通过后循环重新进入 步骤2
	 *
	 * @param lockId
	 * @param time
	 * @param unit
	 * @return
	 */
	String tryRedisLock(String lockId, long time, TimeUnit unit) {
		logger.debug("请求获取锁, 请求超时时间：{}", time);
		final long startMillis = System.currentTimeMillis();
		final Long millisToWait = (unit != null) ? unit.toMillis(time) : null;
		String lockValue = null;
		while (lockValue == null) {
			lockValue = createRedisKey(lockId);
			if (lockValue != null) {
				break;
			}
			if (System.currentTimeMillis() - startMillis - retryAwait > millisToWait) {
				break;
			}
			LockSupport.parkNanos(TimeUnit.MILLISECONDS.toNanos(retryAwait));
		}
		return lockValue;
	}

	private String createRedisKey(String lockId) {
		try {
			String value = lockId + randomId(1);
			final String luaScript = "" + "\nlocal r = tonumber(redis.call('SETNX', KEYS[1],ARGV[1]));"
					+ "\nredis.call('PEXPIRE',KEYS[1],ARGV[2]);" + "\nreturn r";
			final List<String> keys = new ArrayList<String>();
			keys.add(lockId);
			final List<String> args = new ArrayList<String>();
			args.add(value);
			args.add(lockTTL + "");
			Object ret = redisTemplate.execute(new RedisCallback<Object>() {
				@Override
				public Object doInRedis(RedisConnection connection) {
					Object obj = connection.getNativeConnection();
					if (obj instanceof Jedis) {
						Jedis jedis = (Jedis) obj;
						return jedis.eval(luaScript, keys, args);
					} else if (obj instanceof JedisCluster) {
						JedisCluster jedis = (JedisCluster) obj;
						return jedis.eval(luaScript, keys, args);
					} else {
						throw new RuntimeException("分布式锁错误");
					}
				}

			}, true);

			if (NumberUtils.LONG_ONE.equals(ret)) {
				if (logger.isDebugEnabled()) {
					logger.debug("获取到redis锁：" + lockId);
				}
				return value;
			} else {
				if (logger.isDebugEnabled()) {
					logger.debug("未获取到redis锁");
				}
			}
		} finally {
		}
		return null;
	}

	void unlockRedisLock(String key, String value) {
		try {
			if (logger.isDebugEnabled()) {
				logger.debug("释放redis锁");
			}
			final String luaScript =
					"" + "\nlocal v = redis.call('GET', KEYS[1]);" + "\nlocal r= 0;" + "\nif v == ARGV[1] then"
							+ "\nr =redis.call('DEL',KEYS[1]);" + "\nend" + "\nreturn r";
			final List<String> keys = new ArrayList<String>();
			keys.add(key);
			final List<String> args = new ArrayList<String>();
			args.add(value);
			Object ret = redisTemplate.execute(new RedisCallback<Object>() {
				@Override
				public Object doInRedis(RedisConnection connection) {
					Object obj = connection.getNativeConnection();
					if (obj instanceof Jedis) {
						Jedis jedis = (Jedis) obj;
						return jedis.eval(luaScript, keys, args);
					} else if (obj instanceof JedisCluster) {
						JedisCluster jedis = (JedisCluster) obj;
						return jedis.eval(luaScript, keys, args);
					} else {
						throw new RuntimeException("分布式锁错误");
					}

				}

			}, true);
		} finally {
		}
	}

	public int getLockTTL() {
		return lockTTL;
	}

	private final static char[] digits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e',
			'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
			'V', 'W', 'X', 'Y', 'Z' };

	private String randomId(int size) {
		char[] cs = new char[size];
		for (int i = 0; i < cs.length; i++) {
			cs[i] = digits[ThreadLocalRandom.current().nextInt(digits.length)];
		}
		return new String(cs);
	}

	public static void main(String[] args) {
		System.out.println(System.currentTimeMillis());
		LockSupport.parkNanos(TimeUnit.MILLISECONDS.toNanos(1));
		System.out.println(System.currentTimeMillis());
	}

}
