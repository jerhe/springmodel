package com.jerhe.common.base.resolver;

import com.alibaba.fastjson.JSONObject;
import com.jerhe.common.base.exception.BusinessException;
import com.jerhe.common.util.CodeConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author zhuzhen
 * 异常拦截器
 */
public class MyExceptionResolver implements HandlerExceptionResolver {
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
										 Exception ex) {
		JSONObject json = new JSONObject();
		json.put(CodeConstants.OPER_RESULT_KEY, false);
		if (ex instanceof BusinessException) {
			BusinessException e = (BusinessException) ex;
			json.put(CodeConstants.ERROR_CODE_KEY, e.getErrorCode());
			json.put(CodeConstants.ERROR_MSG_KEY, e.getErrorMessage());
			logger.warn("oops, help me! {} {}", e.getErrorCode(), e.getErrorMessage());
		} else {
			logger.warn("oops, help me!", ex);
			json.put(CodeConstants.ERROR_CODE_KEY, CodeConstants.G_UNKNOW);
		}
		response.setHeader("content-type", "application/json;charset=UTF-8");
		try {
			PrintWriter printer = response.getWriter();
			printer.write(json.toJSONString());
			printer.close();
			logger.warn("response {}", json);
		} catch (IOException e) {
			logger.warn("oops, tell me why!", ex);
		}
		return null;
	}

}
