package com.jerhe.common.util;

/**
 * @author zhuzhen
 * 和腾讯交互相关
 */
public class TencentUtil {
    /**
     * 获取access_token
     * @param accessToken
     * @param wxAppId
     * @param wxAppSecret
     * @return
     */
    /*public static String getJsapiTicket(String accessToken, String wxAppId, String wxAppSecret) {
        String url = TencentConfig.GetJsapiTicketUrl.replace("ACCESS_TOKEN", accessToken);
        HttpConfig config = HttpConfig.custom();
        config.client(HCB.custom().timeout(5000).build());
        config.encoding(Const.CHARSET);
        config.url(url);
        String requestData = StringUtils.EMPTY;
        try {
            requestData = HttpClientUtil.get(config);
            logger.info("requestData:{}", requestData);
            JSONObject json = JSONObject.parseObject(requestData);
            return json.getString("ticket");
            // {"errcode":0,"errmsg":"ok","ticket":"kgt8ON7yVITDhtdwci0qeQjgpt7xDtJPE8zJqXWvPlCJZu9YJiAQhtOQzo3lmlamNnozfDWcG0NatTza_CEgig","expires_in":7200}
        } catch (Exception e) {
            logger.warn("", e);
        }
        return StringUtils.EMPTY;
    }*/
}
