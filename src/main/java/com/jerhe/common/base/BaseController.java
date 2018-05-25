package com.jerhe.common.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;

/**
 * 基础控制层
 * @author zhuzhen
 */
public class BaseController {
    protected Logger logger = LoggerFactory.getLogger(getClass());
    /**
     * 获取当前时间
     * @return
     */
    public Date getSysdate() {
        Date sysdate = new Date(System.currentTimeMillis());
        return sysdate;
    }
    /**
     * 得到ModelAndView
     */
    public ModelAndView getModelAndView(String url) {
        return new ModelAndView(url);
    }

} 