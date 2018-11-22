package com.jerhe.common.msg.mq;

/**
 * 消息发送器接口
 */
public interface MessageProducer {
	public void sendTopicMsg(MqMessage mqMessage);

	public void sendTopicMsgAsync(MqMessage mqMessage);

	public void sendTopicMsg(MqMessage mqMessage, long expiration);
}
