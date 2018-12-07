/**
 * Copyright &copy; 2012-2013 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.jerhe.common.config;

import com.google.common.collect.Maps;
import com.jerhe.common.util.PropertiesLoader;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * 全局配置类
 *
 * @author ThinkGem
 * @version 2013-03-23
 * zhuzhen 添加默认值获取 2018-11-1
 */
public class Global {

    /**
     * 保存全局属性值
     */
    private static Map<String, String> map = Maps.newConcurrentMap();

    public static final String appCodeKey = "appCode";
    private static Boolean useShiroUserInCurThread = null;

    public final static String KEY_USE_SHIRO_USER_CURRENT_THREAD = "curthread.user.use.shiro";
    /**
     * 属性文件加载对象
     */
    private static PropertiesLoader mainPropertiesLoader = new PropertiesLoader("application.properties");
    private static List<PropertiesLoader> propertiesLoaders = new ArrayList<PropertiesLoader>();

    static {
        init();
    }

    public static void init() {
        propertiesLoaders.add(mainPropertiesLoader);
        String allProperties = mainPropertiesLoader.getProperty("allProperties");
        {
            if (StringUtils.isNotBlank(allProperties)) {
                String[] propertiesArray = allProperties.split(",");
                for (String properties : propertiesArray) {
                    PropertiesLoader propertiesLoaderTemp = new PropertiesLoader(properties);
                    propertiesLoaders.add(propertiesLoaderTemp);
                }
            }
        }
        Collections.reverse(propertiesLoaders);
    }

    /**
     * 获取配置
     */
    public static String getConfig(String key, String defaultValue) {
        String value = map.get(key);
        if (StringUtils.isEmpty(value)) {
            for (PropertiesLoader propertiesLoader : propertiesLoaders) {
                value = propertiesLoader.getProperty(key);
                if (StringUtils.isNotBlank(value)) {
                    value = value.trim();
                    map.put(key, value);
                    break;
                }
            }
            if (StringUtils.isEmpty(value)) {
                value = defaultValue;
            }
        }
        return value;
    }

    public static Integer getIntegerConfig(String key, String defaultValue) {
        String value = getConfig(key, defaultValue);
        if (StringUtils.isEmpty(value)) {
            return null;
        }
        return Integer.valueOf(value);
    }

    public static Boolean getBooleanConfig(String key, String defaultValue) {
        return Boolean.valueOf(getConfig(key, defaultValue));
    }

    public static Boolean getUseShiroUserInCurThread() {
        if (useShiroUserInCurThread == null) {
            Global.useShiroUserInCurThread = Global.getBooleanConfig(KEY_USE_SHIRO_USER_CURRENT_THREAD, null);
        }
        return useShiroUserInCurThread;
    }

    public static void setUseShiroUserInCurThread(Boolean useShiroUserInCurThread) {
        Global.useShiroUserInCurThread = useShiroUserInCurThread;
    }

    /**
     * 获取前端根路径
     */
    public static String getFrontPath() {
        return getConfig("frontPath", null);
    }

    /**
     * 获取URL后缀
     */
    public static String getUrlSuffix() {
        return getConfig("urlSuffix", null);
    }

}
