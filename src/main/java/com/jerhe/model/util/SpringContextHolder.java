package com.jerhe.model.util;

import org.apache.commons.lang3.Validate;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
@Lazy(false)
public class SpringContextHolder implements ApplicationContextAware, DisposableBean {
	private static ApplicationContext ctx;

	public static ApplicationContext getApplicationContext() {
		return ctx;
	}

	public static Object getBean(String var1) throws BeansException {
		assertContextInjected();
		return getApplicationContext().getBean(var1);
	}

	public static <T> T getBean(String var1, Class<T> var2) throws BeansException {
		assertContextInjected();
		return getApplicationContext().getBean(var1, var2);
	}

	public static <T> T getBean(Class<T> var1) throws BeansException {
		assertContextInjected();
		return getApplicationContext().getBean(var1);
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		SpringContextHolder.ctx = applicationContext;
	}

	@Override
	public void destroy() throws Exception {
		ctx = null;
	}

	// 判断application是否为空
	public static void assertContextInjected() {
		Validate.isTrue(ctx != null, "application未注入 ，请在springContext.xml中注入SpringHolder!");
	}
}
