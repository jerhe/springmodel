package com.jerhe.common.enums;

import com.google.common.collect.Maps;

import java.util.Map;

/**
 * 消息主题枚举定义
 */
public enum MqTopicEnum {

	MQ_COMMON("common.mq", "通用"),
	MQ_JERHE("mq.jerhe.queue", "jerhe的测试通知"),
	MQ_POS_TRANS("mq.pos.trans", "POS 交易通知"),
	MQ_POS_SIGN_IN("mq.pos.sign.in", "POS 签到"),
	MQ_CITIZEN_SECRET_DOWNLOAD("mq.citizen.secret.down", "市民卡密钥下载"),
	MQ_CITIZEN_SETTLE_FILE_DOWNLOAD("mq.citizen.settle.file.down", "市民卡对账文件下载"),
	MQ_ECARD_BLACKLIST_DOWNLOAD("mq.ecard.blacklist.down", "e通卡黑名單下载"),
	MQ_ECARD_WHITELIST_DOWNLOAD("mq.ecard.whitelist.down", "e通卡白名單下载"),
	MQ_ECARD_EXCP_BILL_FILE_DOWNLOAD("mq.ecard.ex.bill.file.down", "e通卡可疑对账文件下载"),
	MQ_ECARD_SETTLE_FILE_DOWNLOAD("mq.ecard.settle.file.down", "e通卡对账文件下载"),
	MQ_POS_MESSAGE("mq.pos.message", "POS消息"),
	MQ_ECARD_MESSAGE("mq.ecard.message", "e通卡消息"),
	MQ_UPDATE_STAFF_CARD_CHECK("mq.update.staff.card.check","更新签到签退配对表数据"),
	MQ_SE_QR_CODE("mq.se.qr.code","自有二维码交易上送");


	private String topic;
	private String desc;

	MqTopicEnum(String topic, String desc) {
		this.topic = topic;
		this.desc = desc;
	}

	public String topic() {
		return topic;
	}

	public String desc() {
		return desc;
	}

	private static final Map<Short, MqTopicEnum> toEnum = Maps.newHashMap();

}
