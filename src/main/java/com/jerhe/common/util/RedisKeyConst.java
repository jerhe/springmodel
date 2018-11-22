package com.jerhe.common.util;

public final class RedisKeyConst {

	private RedisKeyConst() {
	}

	public static final String PAGE_VIEW_NUM_NOTICE = "page:view:num:notice";
	public static final String PAGE_VIEW_NUM_PUBLICITY = "page:view:num:publicity";
	public static final String KEY_PAGE_VIEW_OP_FLAG_PREFIX = "page.view.lock.%s";
	/** 保存用户登陆信息 */
	public static final String KEY_IETS_USER_LOGIN_FLAG = "iets:user:login:flag:%s";



	public static final String MKEY_SHIFT_TIME = "shift.time";
	public static final String KEY_LAST_SHIFT_TIME = "last.shift";
	public static final String KEY_CURRENT_SETTLE_DATE = "cur.settle";
	public static final String KEY_THE_DAY_B4_SHIFT_TIME = "theday.b4.shift";

	public static final String MKEY_MSG_LOG = "online.msg.logging";


}
