package com.jerhe.common.msg;

import com.jerhe.common.enums.MqTopicEnum;
import com.jerhe.common.msg.mq.BaseMsgProducer;
import com.jerhe.common.msg.mq.MqMessage;
import com.jerhe.model.util.SpringContextHolder;

import java.io.Serializable;

/**
 * 消息通知类
 */
public class BusMessageNotifier implements Runnable, Serializable {

    private static final long serialVersionUID = 2273086175414127551L;

    private String message;
    private String mti;
    private String processingNo;
    private String mqTopic;
    private boolean requestFlag;

    public BusMessageNotifier() {

    }

    public BusMessageNotifier(String mti, String processingNo, String message, String mqTopic) {
        this.message = message;
        this.mti = mti;
        this.processingNo = processingNo;
        this.mqTopic = mqTopic;
    }

    public BusMessageNotifier(String mti, String processingNo, String message, MqTopicEnum mqTopicEnum) {
        this.message = message;
        this.mti = mti;
        this.processingNo = processingNo;
        this.mqTopic = mqTopicEnum.topic();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMti() {
        return mti;
    }

    public void setMti(String mti) {
        this.mti = mti;
    }

    public String getProcessingNo() {
        return processingNo;
    }

    public void setProcessingNo(String processingNo) {
        this.processingNo = processingNo;
    }

    public boolean isRequestFlag() {
        return requestFlag;
    }

    public void setRequestFlag(boolean requestFlag) {
        this.requestFlag = requestFlag;
    }

    @Override
    public void run() {
        BaseMsgProducer baseMsgProducer = (BaseMsgProducer) SpringContextHolder.getBean("baseMsgProducer");
        MqMessage mqMessage = MqMessage.topicMessage(mqTopic);
        mqMessage.setContent(this);
        baseMsgProducer.sendTopicMsg(mqMessage);
    }

    @Override
    public String toString() {
        return "BusMessageNotifier{" + "message='" + message + '\'' + ", mti='" + mti + '\'' + ", processingNo='"
                + processingNo + '\'' + ", mqTopic=" + mqTopic + '}';
    }
}
