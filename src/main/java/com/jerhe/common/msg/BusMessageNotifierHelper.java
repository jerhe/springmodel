package com.jerhe.common.msg;

import com.jerhe.model.util.SpringContextHolder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 *
 */
public class BusMessageNotifierHelper {
	public static final Logger logger = LogManager.getLogger(BusMessageNotifierHelper.class);



	/**
	 * 发布消息, 和ecard端的通讯消息
	 * @param mti
	 * @param processingNo
	 * @param content
	 */
	public static void issue4Ecard(String mti, String processingNo, String content, boolean requestFlag) {

		MsgLoggingProcessor msgLoggingProcessor = SpringContextHolder.getBean(MsgLoggingProcessor.class);
		msgLoggingProcessor.issue4Ecard(mti,processingNo,content, requestFlag);
	}

	/**
	 * 发布消息, 和pos端的通讯消息
	 * @param mti
	 * @param processingNo
	 * @param content
	 */
	public static void issue4Pos(String mti, String processingNo, String content, boolean requestFlag) {
		MsgLoggingProcessor msgLoggingProcessor = SpringContextHolder.getBean(MsgLoggingProcessor.class);
		msgLoggingProcessor.issue4Pos(mti,processingNo,content, requestFlag);
	}

}
