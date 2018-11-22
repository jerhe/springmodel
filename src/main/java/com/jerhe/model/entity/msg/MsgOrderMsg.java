package com.jerhe.model.entity.msg;

import java.io.Serializable;

/**
 * @author zhuzhen
 */
public class MsgOrderMsg implements Serializable {
    private String orderId;
    private String msg;

    public MsgOrderMsg() {
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("MsgOrderMsg{");
        sb.append("orderId='").append(orderId).append('\'');
        sb.append(", msg='").append(msg).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
