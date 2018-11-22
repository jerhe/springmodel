package com.jerhe.common.msg.mq;

import com.alibaba.fastjson.JSON;
import com.jerhe.common.util.Constant;
import com.jerhe.model.util.SpringContextHolder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessagePostProcessor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

public class BaseMsgProducer implements MessageProducer {
    private Logger logger = LogManager.getLogger(getClass());
    protected AmqpTemplate amqpTemplate;
    private ThreadPoolTaskExecutor taskExecutor;

    @Override
    public void sendTopicMsg(MqMessage mqMessage) {
        logger.debug(">>>>> 发送MQ消息， {}", JSON.toJSONString(mqMessage));
        if (mqMessage.getContent() == null) {
            mqMessage.setContent("");
        }
        amqpTemplate.convertAndSend(Constant.MQ_TOPIC_EXCHANGE, mqMessage.getTopic(), mqMessage.getContent());
    }

    @Override
    public void sendTopicMsg(MqMessage mqMessage, final long expiration) {
        if (expiration <= 0) {
            throw new IllegalArgumentException("expiration must great than 0");
        }
        logger.debug(">>>>>  send ttl message {} {}", expiration, JSON.toJSONString(mqMessage));
        amqpTemplate.convertAndSend(Constant.MQ_TOPIC_EXCHANGE, mqMessage.getTopic(), mqMessage.getContent(),
                new MessagePostProcessor() {
                    @Override
                    public Message postProcessMessage(Message message) throws AmqpException {
                        message.getMessageProperties().setExpiration(Long.toString(expiration));
                        return message;
                    }
                });
    }

    @Override
    public void sendTopicMsgAsync(final MqMessage mqMessage) {

        logger.debug(">>>>> 发送MQ消息， {}", JSON.toJSONString(mqMessage));
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                amqpTemplate.convertAndSend(Constant.MQ_TOPIC_EXCHANGE, mqMessage.getTopic(), mqMessage.getContent());
            }
        };

        taskExecutor = (ThreadPoolTaskExecutor) SpringContextHolder.getBean("mqExecutorService");
        taskExecutor.execute(runnable);

        logger.debug("<<<<< 发送MQ消息， {}", JSON.toJSONString(mqMessage));
    }

    public AmqpTemplate getAmqpTemplate() {
        return amqpTemplate;
    }

    public void setAmqpTemplate(AmqpTemplate amqpTemplate) {
        this.amqpTemplate = amqpTemplate;
    }

    public ThreadPoolTaskExecutor getTaskExecutor() {
        return taskExecutor;
    }

    public void setTaskExecutor(ThreadPoolTaskExecutor taskExecutor) {
        this.taskExecutor = taskExecutor;
    }
}
