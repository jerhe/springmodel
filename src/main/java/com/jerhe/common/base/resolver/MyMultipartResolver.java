package com.jerhe.common.base.resolver;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.commons.CommonsMultipartResolver;

public class MyMultipartResolver extends CommonsMultipartResolver {
	@Override
	public boolean isMultipart(HttpServletRequest request) {
		if (request.getServletPath().startsWith("/commom/ueditor/upload")) {
			return false;
		}
		if (request.getServletPath().startsWith("/wx/d")) {
			return false;
		}
		return super.isMultipart(request);
	}

}
