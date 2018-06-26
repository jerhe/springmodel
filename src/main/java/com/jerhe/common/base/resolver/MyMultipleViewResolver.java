package com.jerhe.common.base.resolver;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;

import java.util.Locale;
import java.util.Map;

public class MyMultipleViewResolver implements ViewResolver {
	private Map<String, ViewResolver> resolvers;
	private String defaultKey = "jsp";

	public void setResolvers(Map<String, ViewResolver> resolvers) {
		this.resolvers = resolvers;
	}

	@Override
	public View resolveViewName(String viewName, Locale locale) throws Exception {
		String name = null;
		String suffix = defaultKey;

		int n = viewName.lastIndexOf(".");
		if (n == -1) {
			name = viewName;
		} else {
			name = viewName.substring(0, n);
			suffix = viewName.substring(n + 1);

		}
        ViewResolver resolver = resolvers.get(suffix);
        if (resolver != null) {
			return resolver.resolveViewName(name, locale);
        }
		return null;
	}

	public String getDefaultKey() {
		return defaultKey;
	}

	public void setDefaultKey(String defaultKey) {
		this.defaultKey = defaultKey;
	}

	public Map<String, ViewResolver> getResolvers() {
		return resolvers;
	}

}