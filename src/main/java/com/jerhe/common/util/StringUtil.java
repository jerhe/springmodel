package com.jerhe.common.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class StringUtil {

    /**
     * 按照参数format的格式，日期转字符串
     *
     * @param date
     * @param format
     * @return
     */
    public static String dateStr(Date date, String format) {
        if (date != null) {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            return sdf.format(date);
        } else {
            return "";
        }
    }
}
