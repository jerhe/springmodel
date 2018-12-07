package com.jerhe.common.util;

import com.jerhe.common.config.Global;
import org.apache.commons.lang3.StringUtils;

public class Constant {


	public static final String CHARSET="utf-8";
	public  static final String MQ_TOPIC_EXCHANGE = "xmbus.topic.exchange";

	public static final Integer LOCK_TTL= Global.getIntegerConfig("iets.id.generator.worker.id", StringUtils.EMPTY);;

}
