package com.jerhe.common.util;

import com.alibaba.fastjson.JSONObject;

public class CodeConstants {
	public static final String SESSION_SECURITY_CODE = "sessionSecCode";
	public final static String OPER_RESULT_KEY = "isOk";
	public final static String OPER_DESC_KEY = "desc";
	public final static String OPER_DATA_KEY = "data";
	public final static String ERROR_CODE_KEY = "errorCode";
	public final static String ERROR_MSG_KEY = "error";

	public final static String WEB_OPER_RESULT_KEY = "operResult";
	public final static String WEB_OPER_DATA_KEY = "data";
	public final static String WEB_ERROR_CODE_KEY = "errorCode";
	public final static String WEB_ERROR_MSG_KEY = "errorMsg";

	public static JSONObject getUnknowErrorJson() {
		JSONObject json = new JSONObject();
		json.put(CodeConstants.OPER_RESULT_KEY, false);
		json.put(CodeConstants.ERROR_CODE_KEY, G_UNKNOW);
		json.put(CodeConstants.ERROR_MSG_KEY, "系统错误");
		return json;
	}

	/**************************** 请求错误码 ****************/
	/** 请求错误 */
	public static int R_ERROR = 10000;
	/** 请求参数错误 */
	public static int R_PARAM_ERROR = 10001;
	/** 请求格式错误 */
	public static int R_PARAM_FORMAT_ERROR = 10002;
	/** 请求超时 */
	public static int R_TIMEOUT = 10003;
	/** 请求的appId在系统中找不到 */
	public static int R_APPID_NOT_FOUND = 10004;
	/** 授权错误 */
	public static int R_AUTHOR_ERROR = 10005;
	/** 没有访问权限 */
	public static int R_AUTHOR_REQUIRED = 10006;
	/** 文件上传的请求方式必须为post，MIME类型必须为multipart/form-data */
	public static int R_MIME_ERROR = 10007;
	/** 参数无效 */
	public static int R_PARAM_INVALID = 10008;
	/** 校验码错误 */
	public static int R_CODE_INVALID = 10009;
	/** 图片验证吗不正确 */
	public static int G_VERIFY_CODE_INVALID = 10010;
	/** 请求成功（路桥年费） */
	public static int G_REQ_SUCCESS = 0;

	/**************************** 系统错误码 ****************/
	public static int G_UNKNOW = 20001;
	/** 访问第三方系统出错 */
	public static int G_UNKNOW_3RD = 20002;
	/** 不需要访问第三方系统 */
	public static int G_NONEED_3RD = 20003;

	/**************************** 业务错误码 ****************/

}
