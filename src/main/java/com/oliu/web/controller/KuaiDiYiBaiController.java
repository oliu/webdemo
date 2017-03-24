package com.oliu.web.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

/**
 * Created by zli on 2017/3/24.
 * 快递100的接口测试
 */
@Controller
@RequestMapping("/kuaidi100")
public class KuaiDiYiBaiController {

    @Value("${kuaidi100Key}")
    private String key;//快递100的身份授权key

    @RequestMapping(value = "/officialDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Object officialDemo(String company, String expressNo) {
        try {
            StringBuffer urlSB = new StringBuffer();
            urlSB.append("http://api.kuaidi100.com/api");
            urlSB.append("?id=");//身份授权key
            urlSB.append(key);
            urlSB.append("&com=");//要查询的快递代码（这个是否是根据规则找出快递公司代码）
            urlSB.append(company);
            urlSB.append("&nu=");//要查询的快递单号
            urlSB.append(expressNo);
            urlSB.append("&show=2");//返回类型。0为json，1为xml，2为html，3为text 顺丰只支持html
            urlSB.append("&muti=1");//返回信息的数量。1为多行，0为一行
            urlSB.append("&order=desc");//排序。desc按时间由新到旧排序，asc按时间由就旧到新排列

            URL url = new URL(urlSB.toString());
            URLConnection con = url.openConnection();
            con.setAllowUserInteraction(false);
            InputStream urlStream = url.openStream();
            String type = con.guessContentTypeFromStream(urlStream);
            String charSet = null;
            if (type == null)
                type = con.getContentType();

            if (type == null || type.trim().length() == 0 || type.trim().indexOf("text/html") < 0)
                return "";

            if (type.indexOf("charset=") > 0)
                charSet = type.substring(type.indexOf("charset=") + 8);

            byte b[] = new byte[10000];
            int numRead = urlStream.read(b);
            String content = new String(b, 0, numRead);
            while (numRead != -1) {
                numRead = urlStream.read(b);
                if (numRead != -1) {
                    //String newContent = new String(b, 0, numRead);
                    String newContent = new String(b, 0, numRead, charSet);
                    System.out.println(newContent);
                    content += newContent;
                }
            }
            System.out.println("content:" + content);
            urlStream.close();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "ok";
    }
}
