package com.jerhe.common.msg.mq;

import com.jerhe.common.enums.MqTopicEnum;

import java.io.Serializable;

public class MqMessage implements Serializable {

    private String topic;
    private String routeKey;
    private String queueName;
    private Object content;

    public static MqMessage topicMessage(String topic) {
        MqMessage mqMessage = new MqMessage();
        mqMessage.topic = topic;
        return mqMessage;
    }

    public static MqMessage topicMessage(MqTopicEnum topicEnum) {
        MqMessage mqMessage = new MqMessage();
        mqMessage.topic = topicEnum.topic();
        return mqMessage;
    }

    public static MqMessage routeMessage(String routeKey, String queueName) {
        MqMessage mqMessage = new MqMessage();
        mqMessage.routeKey = routeKey;
        mqMessage.queueName = queueName;
        return mqMessage;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getRouteKey() {
        return routeKey;
    }

    public void setRouteKey(String routeKey) {
        this.routeKey = routeKey;
    }

    public String getQueueName() {
        return queueName;
    }

    public void setQueueName(String queueName) {
        this.queueName = queueName;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }
}
