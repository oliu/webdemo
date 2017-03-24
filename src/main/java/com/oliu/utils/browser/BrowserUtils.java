package com.oliu.utils.browser;

import javax.servlet.http.HttpServletRequest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 浏览器工具类.
 */
public class BrowserUtils {

    private final static String IE11 = "rv:11.0";
    private final static String IE10 = "MSIE 10.0";
    private final static String IE9 = "MSIE 9.0";
    private final static String IE8 = "MSIE 8.0";
    private final static String IE7 = "MSIE 7.0";
    private final static String IE6 = "MSIE 6.0";
    private final static String MAXTHON = "Maxthon";
    private final static String QQ = "QQBrowser";
    private final static String GREEN = "GreenBrowser";
    private final static String SE360 = "360SE";
    private final static String FIREFOX = "Firefox";
    private final static String OPERA = "Opera";
    private final static String CHROME = "Chrome";
    private final static String SAFARI = "Safari";
    private final static String CAMINO = "Camino";
    private final static String OTHER = "其它";

    /**
     * 判断是否是IE
     *
     * @param request
     * @return The browser is IE return true else return false
     */
    public static boolean isIE(HttpServletRequest request) {
        return (getUserAgent(request).toLowerCase().indexOf("msie") > 0 || getUserAgent(request).toLowerCase().indexOf("rv:11.0") > 0) ? true : false;
    }

    /**
     * 获取IE版本
     * get IE version
     *
     * @param request
     * @return IE version
     */
    public static Double getIEversion(HttpServletRequest request) {
        Double version = 0.0;
        if (getBrowserType(request, IE11)) {
            version = 11.0;
        } else if (getBrowserType(request, IE10)) {
            version = 10.0;
        } else if (getBrowserType(request, IE9)) {
            version = 9.0;
        } else if (getBrowserType(request, IE8)) {
            version = 8.0;
        } else if (getBrowserType(request, IE7)) {
            version = 7.0;
        } else if (getBrowserType(request, IE6)) {
            version = 6.0;
        }
        return version;
    }

    /**
     * 获取浏览器类型
     *
     * @param request
     * @return
     */
    public static BrowserTypeEnum getBrowserType(HttpServletRequest request) {
        BrowserTypeEnum browserTypeEnum = null;
        if (getBrowserType(request, IE11)) {
            browserTypeEnum = BrowserTypeEnum.IE11;
        }
        if (getBrowserType(request, IE10)) {
            browserTypeEnum = BrowserTypeEnum.IE10;
        }
        if (getBrowserType(request, IE9)) {
            browserTypeEnum = BrowserTypeEnum.IE9;
        }
        if (getBrowserType(request, IE8)) {
            browserTypeEnum = BrowserTypeEnum.IE8;
        }
        if (getBrowserType(request, IE7)) {
            browserTypeEnum = BrowserTypeEnum.IE7;
        }
        if (getBrowserType(request, IE6)) {
            browserTypeEnum = BrowserTypeEnum.IE6;
        }
        if (getBrowserType(request, FIREFOX)) {
            browserTypeEnum = BrowserTypeEnum.Firefox;
        }
        if (getBrowserType(request, SAFARI)) {
            browserTypeEnum = BrowserTypeEnum.Safari;
        }
        if (getBrowserType(request, CHROME)) {
            browserTypeEnum = BrowserTypeEnum.Chrome;
        }
        if (getBrowserType(request, OPERA)) {
            browserTypeEnum = BrowserTypeEnum.Opera;
        }
        if (getBrowserType(request, CAMINO)) {
            browserTypeEnum = BrowserTypeEnum.Camino;
        }
        return browserTypeEnum;
    }

    private static boolean getBrowserType(HttpServletRequest request, String brosertype) {
        return getUserAgent(request).indexOf(brosertype) > 0 ? true : false;
    }


    public static String checkBrowse(HttpServletRequest request) {
        String userAgent = getUserAgent(request);
        if (regex(OPERA, userAgent))
            return OPERA;
        if (regex(CHROME, userAgent))
            return CHROME;
        if (regex(FIREFOX, userAgent))
            return FIREFOX;
        if (regex(SAFARI, userAgent))
            return SAFARI;
        if (regex(SE360, userAgent))
            return SE360;
        if (regex(GREEN, userAgent))
            return GREEN;
        if (regex(QQ, userAgent))
            return QQ;
        if (regex(MAXTHON, userAgent))
            return MAXTHON;
        if (regex(IE11, userAgent))
            return IE11;
        if (regex(IE10, userAgent))
            return IE10;
        if (regex(IE9, userAgent))
            return IE9;
        if (regex(IE8, userAgent))
            return IE8;
        if (regex(IE7, userAgent))
            return IE7;
        if (regex(IE6, userAgent))
            return IE6;
        return OTHER;
    }

    public static boolean regex(String regex, String str) {
        Pattern p = Pattern.compile(regex, Pattern.MULTILINE);
        Matcher m = p.matcher(str);
        return m.find();
    }

    /**
     * 客户端信息
     *
     * @param request
     * @return
     */
    public static String getUserAgent(HttpServletRequest request) {
        return request.getHeader("USER-AGENT");
    }

}