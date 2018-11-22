package com.jerhe.common.msg;

import com.jerhe.common.enums.MqTopicEnum;
import com.jerhe.common.util.RedisKeyConst;
import com.jerhe.model.util.SpringContextHolder;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MsgLoggingProcessor {
	public static final Logger logger = LogManager.getLogger(MsgLoggingProcessor.class);
	public static final String KEY_TPL = "%s_%s";

	private RedisTemplate<String, String> redisTemplate;
	private HashOperations<String, String, String> hashOperations;

	@Resource
    ThreadPoolTaskExecutor mqExecutorService;

	public boolean isLoggingEnabled(String mti, String processNo) {

		redisTemplate = (RedisTemplate<String, String>) SpringContextHolder.getBean("redisTemplateStr");
		hashOperations = redisTemplate.opsForHash();
		String key = String.format(KEY_TPL, new Object[] { mti, processNo });
		String value = hashOperations
				.get(RedisKeyConst.MKEY_MSG_LOG, String.format(KEY_TPL, new Object[] { mti, processNo }));
		if (StringUtils.isNoneBlank(value) && "1".equals(value)) {
			logger.debug("消息类型: {}, 启用联机报文记录", key);
			return true;
		} else {
			logger.debug("消息类型: {}, 关闭联机报文记录", key);
			return false;
		}
	}

	/**
	 * 发布消息, 和ecard端的通讯消息
	 *
	 * @param mti
	 * @param processingNo
	 * @param content
	 */
	public void issue4Ecard(String mti, String processingNo, String content, boolean requestFlag) {
		if (!isLoggingEnabled(mti, processingNo)) {
			return;
		}
		BusMessageNotifier busMessageNotifier = new BusMessageNotifier(mti, processingNo, content,
				MqTopicEnum.MQ_ECARD_MESSAGE);
		busMessageNotifier.setRequestFlag(requestFlag);
		mqExecutorService.execute(busMessageNotifier);
	}

	/**
	 * 发布消息, 和pos端的通讯消息
	 *
	 * @param mti
	 * @param processingNo
	 * @param content
	 */
	public void issue4Pos(String mti, String processingNo, String content, boolean requestFlag) {
		if (!isLoggingEnabled(mti, processingNo)) {
			return;
		}
		BusMessageNotifier busMessageNotifier = new BusMessageNotifier(mti, processingNo, content,
				MqTopicEnum.MQ_POS_MESSAGE);
		busMessageNotifier.setRequestFlag(requestFlag);

		mqExecutorService.execute(busMessageNotifier);
	}

}
