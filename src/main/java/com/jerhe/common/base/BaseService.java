package com.jerhe.common.base;

import com.jerhe.common.base.dao.DaoSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 基础服务层
 * @author zhuzhen
 */
public class BaseService {
    protected Logger logger = LoggerFactory.getLogger(getClass());

    @Resource
    protected DaoSupport dao;

    public String getSystemDay() {
        Date sysdate = new Date(System.currentTimeMillis());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(sysdate);
    }

    public Date getSysdate() {
        Date sysdate = new Date(System.currentTimeMillis());
        return sysdate;
    }
} 