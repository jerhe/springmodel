package com.jerhe.model.listener;

import com.jerhe.common.listener.AbstractMessageListener;
import com.jerhe.common.msg.BusMessageNotifier;
import com.jerhe.model.entity.msg.MsgOrderMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 根据报文存储文件
 *
 * @author
 */
@Component
public class MessageListener extends AbstractMessageListener {
    private static final Logger logger = LogManager.getLogger(MessageListener.class);
    @Resource
    protected MessageConverter messageConverter;

    @Override
    public void handle(Message message) {
        Object targetBean = messageConverter.fromMessage(message);
        if (!(targetBean instanceof BusMessageNotifier)) {
            logger.info("消息内容不对, 类型为{}", targetBean.getClass().getName());
            return;
        }
        BusMessageNotifier busMessageNotifier = (BusMessageNotifier) targetBean;

        String digest = busMessageNotifier.getMessage();
        MsgOrderMsg msgOrderMsg = new MsgOrderMsg();
        msgOrderMsg.setMsg(digest);
        msgOrderMsg.setOrderId(busMessageNotifier.getMessage());

    }


}
