package com.jerhe.model.interceptor;

import com.jerhe.common.annotation.Bind;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BindHandlerInterceptor implements HandlerInterceptor {
    private Logger logger = LoggerFactory.getLogger(BindHandlerInterceptor.class);
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object handler) throws Exception {
        // 普通的业务controller
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Bind bind = handlerMethod.getMethod().getAnnotation(Bind.class);
        if (null!=bind){
            //做绑定的逻辑
            logger.info(">>>>> bind test");
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
