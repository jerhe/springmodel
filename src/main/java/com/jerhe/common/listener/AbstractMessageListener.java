package com.jerhe.common.listener;

import com.rabbitmq.client.Channel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 抽象消息监听类
 */
@Component
public abstract class AbstractMessageListener implements ChannelAwareMessageListener {
	private static final Logger logger = LogManager.getLogger(AbstractMessageListener.class);

	@Override
	public void onMessage(Message message, Channel channel) throws Exception {
		logger.info("receive message {}", message);
		MessageProperties p = message.getMessageProperties();
		long deliveryTag = p.getDeliveryTag();
		try {
			this.handle(message);
			channel.basicAck(deliveryTag, false);
			logger.info("processing complete");
		} catch (Exception e) {
			channel.basicReject(deliveryTag, false);
			logger.warn("processing failure message will discarded {}", message, e);
		}
	}

	public abstract void handle(Message message);

}
