package com.oliu.utils;


import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.oliu.utils.browser.BrowserUtils;
import com.oliu.utils.conversion.JacksonMapperUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.zip.GZIPOutputStream;

/**
 * Http与Servlet工具类.
 */
public class WebUtils extends org.springframework.web.util.WebUtils {

    private static final Log logger = LogFactory.getLog(WebUtils.class);

    //-- header 常量定义 --//
    private static final String HEADER_ENCODING = "encoding";
    private static final String HEADER_NOCACHE = "no-cache";
    private static final String DEFAULT_ENCODING = "UTF-8";
    private static final boolean DEFAULT_NOCACHE = true;


    //-- Content Type 定义 --//
    public static final String TEXT_TYPE = "text/plain";
    public static final String JSON_TYPE = "application/json";
    public static final String XML_TYPE = "text/xml";
    public static final String HTML_TYPE = "text/html";
    public static final String JS_TYPE = "text/javascript";
    public static final String EXCEL_TYPE = "application/vnd.ms-excel";

    //-- Header 定义 --//
    public static final String AUTHENTICATION_HEADER = "Authorization";

    //-- 常用数值定义 --//
    public static final long ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

    /**
     * 设置客户端缓存过期时间 Header.
     */
    public static void setExpiresHeader(HttpServletResponse response, long expiresSeconds) {
        // Http 1.0 header
        response.setDateHeader("Expires", System.currentTimeMillis() + expiresSeconds * 1000);
        // Http 1.1 header
        response.setHeader("Cache-Control", "max-age=" + expiresSeconds);
    }

    /**
     * 设置客户端无缓存Header.
     */
    public static void setNoCacheHeader(HttpServletResponse response) {
        //Http 1.0 header
        response.setDateHeader("Expires", 1L);
        response.addHeader("Pragma", "no-cache");
        //Http 1.1 header
        response.setHeader("Cache-Control", "no-cache, no-store, max-age=0");
    }

    /**
     * 设置LastModified Header.
     */
    public static void setLastModifiedHeader(HttpServletResponse response, long lastModifiedDate) {
        response.setDateHeader("Last-Modified", lastModifiedDate);
    }

    /**
     * 设置Etag Header.
     */
    public static void setEtag(HttpServletResponse response, String etag) {
        response.setHeader("ETag", etag);
    }

    /**
     * 根据浏览器If-Modified-Since Header, 计算文件是否已被修改.
     * <p/>
     * 如果无修改, checkIfModify返回false ,设置304 not modify status.
     *
     * @param lastModified 内容的最后修改时间.
     */
    public static boolean checkIfModifiedSince(HttpServletRequest request,
                                               HttpServletResponse response, long lastModified) {
        long ifModifiedSince = request.getDateHeader("If-Modified-Since");
        if ((ifModifiedSince != -1) && (lastModified < ifModifiedSince + 1000)) {
            response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
            return false;
        }
        return true;
    }

    /**
     * 根据浏览器 If-None-Match Header, 计算Etag是否已无效.
     * <p/>
     * 如果Etag有效, checkIfNoneMatch返回false, 设置304 not modify status.
     *
     * @param etag 内容的ETag.
     */
    public static boolean checkIfNoneMatchEtag(HttpServletRequest request,
                                               HttpServletResponse response, String etag) {
        String headerValue = request.getHeader("If-None-Match");
        if (headerValue != null) {
            boolean conditionSatisfied = false;
            if (!"*".equals(headerValue)) {
                StringTokenizer commaTokenizer = new StringTokenizer(
                        headerValue, ",");

                while (!conditionSatisfied && commaTokenizer.hasMoreTokens()) {
                    String currentToken = commaTokenizer.nextToken();
                    if (currentToken.trim().equals(etag)) {
                        conditionSatisfied = true;
                    }
                }
            } else {
                conditionSatisfied = true;
            }

            if (conditionSatisfied) {
                response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
                response.setHeader("ETag", etag);
                return false;
            }
        }
        return true;
    }

    /**
     * 检查浏览器客户端是否支持gzip编码.
     */
    public static boolean checkAccetptGzip(HttpServletRequest request) {
        // Http1.1 header
        String acceptEncoding = request.getHeader("Accept-Encoding");

        if (StringUtils.contains(acceptEncoding, "gzip")) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 设置Gzip Header并返回GZIPOutputStream.
     */
    public static OutputStream buildGzipOutputStream(
            HttpServletResponse response) throws IOException {
        response.setHeader("Content-Encoding", "gzip");
        response.setHeader("Vary", "Accept-Encoding");
        return new GZIPOutputStream(response.getOutputStream());
    }

    /**
     * 设置让浏览器弹出下载对话框的Header.
     *
     * @param fileName 下载后的文件名.
     */
    public static void setDownloadableHeader(HttpServletResponse response,
                                             String fileName) {
        response.setHeader("Content-Disposition", "attachment; filename=\""
                + fileName + "\"");
    }

    /**
     * 设置让浏览器弹出下载对话框的Header.
     *
     * @param fileName 下载后的文件名.
     */
    public static void setDownloadableHeader(HttpServletRequest request, HttpServletResponse response, String fileName) {
        try {
            if (BrowserUtils.isIE(request)) {
                response.setHeader("content-disposition", "attachment;filename=\"" + EncodeUtils.urlEncode(fileName) + "\"");
            } else {
                //中文文件名支持
                String encodedfileName = new String(fileName.getBytes(), "ISO8859-1");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedfileName + "\"");
            }

        } catch (UnsupportedEncodingException e) {
        }
    }

    /**
     * 取得带相同前缀的Request Parameters.
     * <p/>
     * 返回的结果Parameter名已去除前缀.
     */
    public static Map<String, Object> getParametersStartingWith(
            HttpServletRequest request, String prefix) {
        return org.springframework.web.util.WebUtils.getParametersStartingWith(
                request, prefix);
    }

    /**
     * 判断请求是否是Ajax请求.
     *
     * @param request
     * @return
     */
    public static boolean isAjaxRequest(HttpServletRequest request) {
        String header = request.getHeader("X-Requested-With");
        if (header != null && "XMLHttpRequest".equals(header)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 对Http Basic验证的 Header进行编码.
     */
    public static String encodeHttpBasic(String userName, String password) {
        String encode = userName + ":" + password;
        return "Basic " + EncodeUtils.base64Encode(encode.getBytes());
    }

    /**
     * 取得HttpRequest中Parameter的简化方法.
     */
    public static <T> T getParameter(HttpServletRequest request, String name) {
        return (T) request.getParameter(name);
    }

    /**
     * 获取sessiont attribute
     *
     * @param name 属性名称
     * @return T
     */
    public static <T> T getSessionAttribute(HttpSession session, String name) {
        return (T) session.getAttribute(name);
    }


    /**
     * 分析并设置contentType与headers.
     */
    private static HttpServletResponse initResponseHeader(HttpServletResponse response, final String contentType, final String... headers) {
        //分析headers参数
        String encoding = DEFAULT_ENCODING;
        boolean noCache = DEFAULT_NOCACHE;
        for (String header : headers) {
            String headerName = org.apache.commons.lang3.StringUtils.substringBefore(header, ":");
            String headerValue = org.apache.commons.lang3.StringUtils.substringAfter(header, ":");

            if (StringUtils.equalsIgnoreCase(headerName, HEADER_ENCODING)) {
                encoding = headerValue;
            } else if (StringUtils.equalsIgnoreCase(headerName, HEADER_NOCACHE)) {
                noCache = Boolean.parseBoolean(headerValue);
            } else {
                throw new IllegalArgumentException(headerName + "不是一个合法的header类型");
            }
        }

        //设置headers参数
        String fullContentType = contentType + ";charset=" + encoding;
        response.setContentType(fullContentType);
        if (noCache) {
            WebUtils.setNoCacheHeader(response);
        }

        return response;
    }

    /**
     * 直接输出内容的简便函数.
     * <p>
     * eg.
     * render("text/plain", "hello", "encoding:GBK");
     * render("text/plain", "hello", "no-cache:false");
     * render("text/plain", "hello", "encoding:GBK", "no-cache:false");
     *
     * @param headers 可变的header数组，目前接受的值为"encoding:"或"no-cache:",默认值分别为UTF-8和true.
     */
    public static void render(HttpServletResponse response, final String contentType, final Object data, final String... headers) {
        initResponseHeader(response, contentType, headers);
        try {
            JacksonMapperUtils.getInstance().writeValue(response.getWriter(), data);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }


    /**
     * 直接输出文本.
     *
     * @param response
     * @param data     输出数据 可以是List Map等
     * @param headers  相应头 为null 则默认值：UTF-8编码 无缓存
     * @throws java.io.IOException
     * @see #render(javax.servlet.http.HttpServletResponse, String, Object, String...)
     */
    public static void renderText(HttpServletResponse response, Object data, final String... headers) {
        render(response, TEXT_TYPE, data, headers);
    }

    /**
     * 直接输出HTML.
     *
     * @param response
     * @param data     输出数据 可以是List Map等
     * @param headers  相应头 为null 则默认值：UTF-8编码 无缓存
     * @throws java.io.IOException
     * @see #render(javax.servlet.http.HttpServletResponse, String, Object, String...)
     */
    public static void renderHtml(HttpServletResponse response, Object data, final String... headers) {
        render(response, HTML_TYPE, data, headers);
    }

    /**
     * 直接输出XML.
     *
     * @param response
     * @param data     输出数据 可以是List Map等
     * @param headers  相应头 为null 则默认值：UTF-8编码 无缓存
     * @throws java.io.IOException
     * @see #render(javax.servlet.http.HttpServletResponse, String, Object, String...)
     */
    public static void renderXml(HttpServletResponse response, Object data, final String... headers) {
        renderXml(response, data, new XmlMapper(), headers);
    }

    /**
     * 直接输出XML.
     *
     * @param response
     * @param data      输出数据 可以是List Map等
     * @param xmlMapper {@link XmlMapper}
     * @param headers   相应头 为null 则默认值：UTF-8编码 无缓存
     * @throws java.io.IOException
     * @see #render(javax.servlet.http.HttpServletResponse, String, Object, String...)
     */
    public static void renderXml(HttpServletResponse response, Object data, XmlMapper xmlMapper, final String... headers) {
        try {
            String result = xmlMapper.writeValueAsString(data);
            render(response, XML_TYPE, result, headers);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }


    /**
     * 直接输出JSON.
     *
     * @param response
     * @param data     输出数据 可以是List Map等
     * @param headers  相应头 为null 则默认值：UTF-8编码 无缓存
     * @throws java.io.IOException
     * @see #render(javax.servlet.http.HttpServletResponse, String, Object, String...)
     */
    public static void renderJson(HttpServletResponse response, Object data, final String... headers) {
        render(response, JSON_TYPE, data, headers);
    }

    /**
     * 直接输出支持跨域Mashup的JSONP.
     *
     * @param response
     * @param data     输出数据 可以是List Map等
     * @param headers  相应头 为null 则默认值：UTF-8编码 无缓存
     * @throws java.io.IOException
     * @see #render(javax.servlet.http.HttpServletResponse, String, Object, String...)
     */
    public static void renderJsonp(final String callbackName, HttpServletResponse response, Object data, final String... headers) {
        String result = JacksonMapperUtils.nonDefaultMapper().toJsonP(callbackName, data);
        render(response, JSON_TYPE, result, headers);
    }


    /**
     * 设置cookie.
     *
     * @param response
     * @param name
     * @param value
     * @param path
     */
    public static void setCookie(HttpServletResponse response, String name,
                                 String value, String path) {
        if (logger.isDebugEnabled()) {
            logger.debug("设置Cookie '" + name + "',位置: '" + path + "'");
        }

        Cookie cookie = new Cookie(name, value);
        cookie.setSecure(false);
        cookie.setPath(path);
        cookie.setMaxAge(2592000);

        response.addCookie(cookie);
    }

    /**
     * 获取Cookie.
     *
     * @param request
     * @param name
     * @return
     */
    public static Cookie getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        Cookie returnCookie = null;

        if (cookies == null) {
            return returnCookie;
        }

        for (Cookie thisCookie : cookies) {
            if (thisCookie.getName().equals(name)) {
                if (!thisCookie.getValue().equals("")) {
                    returnCookie = thisCookie;

                    break;
                }
            }
        }

        return returnCookie;
    }

    /**
     * 删除Cookie.
     *
     * @param response
     * @param cookie
     * @param path
     */
    public static void deleteCookie(HttpServletResponse response,
                                    Cookie cookie, String path) {
        if (cookie != null) {
            cookie.setMaxAge(0);
            cookie.setPath(path);
            response.addCookie(cookie);
        }
    }

    public static String getAppURL(HttpServletRequest request) {
        StringBuffer url = new StringBuffer();
        int port = request.getServerPort();
        if (port < 0) {
            port = 80;
        }
        String scheme = request.getScheme();
        url.append(scheme);
        url.append("://");
        url.append(request.getServerName());
        if (((scheme.equals("http")) && (port != 80))
                || ((scheme.equals("https")) && (port != 443))) {
            url.append(':');
            url.append(port);
        }
        url.append(request.getContextPath());
        return url.toString();
    }

    /**
     * @param request
     * @return String
     * @throws
     * @Title: getRequestHeadrJson
     * @Description: request.getHeader()转成json
     */
    public static String getRequestHeadrJson(HttpServletRequest request) {
        //校验必传参数
        Map<String, String> mapHeadr = new HashMap<String, String>();
        mapHeadr.put("deviceId", request.getHeader("deviceId"));
        mapHeadr.put("deviceModel", request.getHeader("deviceModel"));
        mapHeadr.put("cType", request.getHeader("cType"));
        mapHeadr.put("appName", request.getHeader("appName"));
        mapHeadr.put("appVersion", request.getHeader("appVersion"));
        mapHeadr.put("channelCode", request.getHeader("channelCode"));
        mapHeadr.put("sign", request.getHeader("sign"));
        mapHeadr.put("token", request.getHeader("token"));
        mapHeadr.put("osVersion", request.getHeader("osVersion"));
        mapHeadr.put("netWorkStandard", request.getHeader("netWorkStandard"));
        mapHeadr.put("longitude", request.getHeader("longitude"));
        mapHeadr.put("latitude", request.getHeader("latitude"));
        mapHeadr.put("userAgent", request.getHeader("user-agent"));
        return JSONObject.toJSONString(mapHeadr);
    }

    public static JSONObject requestThirdUrl(String thirdUrl, String methodType) {
        BufferedReader reader = null;
        String result = null;
        StringBuffer sbf = new StringBuffer();
        try {
            URL url = new URL(thirdUrl);
            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            connection.setRequestMethod(methodType);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);
            connection.connect();
            InputStream is = connection.getInputStream();
            reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            String strRead = null;
            while ((strRead = reader.readLine()) != null) {
                sbf.append(strRead);
                sbf.append("\r\n");
            }
            reader.close();
            result = sbf.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JSONObject.parseObject(result);
    }

    /**
     * @Title getUserAgentInfo
     * @Description 获取userAgentInfo用户信息
     * @author wangyk
     * @date 2016年01月13日 上午11:46:14
     */
    public static String getUserAgentInfo(HttpServletRequest request, String userAgentKey) {
        String result = "";
        String userInfo = "";
        String userAgent = request.getHeader("user-agent");
        if (userAgent.indexOf("miaoqian_json:") > -1) {
            userInfo = userAgent.substring(userAgent.indexOf("miaoqian_json:")
                    + "miaoqian_json:".length(), userAgent.length());
        }
        if (!StringUtils.isBlank(userInfo)) {
            JSONObject userObj = JSONObject.parseObject(userInfo.trim());
            result = userObj.getString(userAgentKey);
        }
        return result;
    }

    /**
     * @return String  photoUrl
     * @Title saveUrlAs
     * @Description 获取项目详情介绍
     * @author wangyk
     * @date 2015年9月4日 上午11:46:14
     */
    public static String saveUrlAs(String photoUrl) {
        URL url = null;
        BufferedInputStream bis = null;
        ByteArrayOutputStream bos = null;
        try {
            url = new URL(photoUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            DataInputStream in = new DataInputStream(connection.getInputStream());
            bos = new ByteArrayOutputStream();
            bis = new BufferedInputStream(in);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            int c = bis.read();//读取bis流中的下一个字节
            while (c != -1) {
                baos.write(c);
                baos.flush();
                c = bis.read();
            }
            bis.close();
            byte retArr[] = baos.toByteArray();
            String result = new String(retArr, "UTF-8");
            return result;
        } catch (Exception e) {
            return "";
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                    bos = null;
                } catch (IOException e) {
                }
            }
            if (bis != null) {
                try {
                    bis.close();
                    bis = null;
                } catch (IOException e) {

                }
            }
            if (url != null) {
                url = null;
            }
        }
    }

    /**
     * 发送post请求
     *
     * @param requestUrl
     * @param params
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
  /*  public static String doPost(String requestUrl, Map<String, String> params) throws ClientProtocolException, IOException {
        String result = null;
        List<NameValuePair> nvps = HttpClientHandler.buildNameValuePair(params);
        CloseableHttpClient httpclient = HttpClients.createDefault();
        EntityBuilder builder = EntityBuilder.create();
        try {
            HttpPost httpPost = new HttpPost(requestUrl);
            builder.setParameters(nvps);
            httpPost.setEntity(builder.build());
            CloseableHttpResponse response = httpclient.execute(httpPost);

            try {
                HttpEntity entity = response.getEntity();
                if (response.getStatusLine().getReasonPhrase().equals("OK")
                        && response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                    result = EntityUtils.toString(entity, "UTF-8");
                }
                EntityUtils.consume(entity);
            } finally {
                response.close();
            }
        } finally {
            httpclient.close();
        }
        return result;
    }*/
}
