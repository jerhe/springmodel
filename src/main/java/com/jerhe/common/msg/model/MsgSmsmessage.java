package com.jerhe.common.msg.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "msg_smsmessage")
public class MsgSmsmessage implements Serializable {
    private static final long serialVersionUID = -1126145845493117576L;
    private String id;
    private String phone;
    private String sign;
    private String modelid;
    private String msgparam;
    private Date createtime;
    private Date presendtime;
    private Integer issend;

    /**
     * new
     */
    private Date sendtime;
    /**
     * new
     */
    private double rescode;
    /**
     * new
     */
    private String resmsg;

    public MsgSmsmessage() {
    }

    @Id
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSign() {
        return this.sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public String getModelid() {
        return this.modelid;
    }

    public void setModelid(String modelid) {
        this.modelid = modelid;
    }

    public String getMsgparam() {
        return this.msgparam;
    }

    public void setMsgparam(String msgparam) {
        this.msgparam = msgparam;
    }

    @Column(nullable = false)
    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getPresendtime() {
        return this.presendtime;
    }

    public void setPresendtime(Date presendtime) {
        this.presendtime = presendtime;
    }

    public Integer getIssend() {
        return issend;
    }

    public void setIssend(Integer issend) {
        this.issend = issend;
    }

    public Date getSendtime() {
        return sendtime;
    }

    public void setSendtime(Date sendtime) {
        this.sendtime = sendtime;
    }

    public double getRescode() {
        return rescode;
    }

    public void setRescode(double rescode) {
        this.rescode = rescode;
    }

    public String getResmsg() {
        return resmsg;
    }

    public void setResmsg(String resmsg) {
        this.resmsg = resmsg;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("MsgSmsmessage [id=");
        builder.append(id);
        builder.append(", phone=");
        builder.append(phone);
        builder.append(", sign=");
        builder.append(sign);
        builder.append(", modelid=");
        builder.append(modelid);
        builder.append(", msgparam=");
        builder.append(msgparam);
        builder.append(", createtime=");
        builder.append(createtime);
        builder.append(", presendtime=");
        builder.append(presendtime);
        builder.append(", issend=");
        builder.append(issend);
        builder.append("]");
        return builder.toString();
    }

}
