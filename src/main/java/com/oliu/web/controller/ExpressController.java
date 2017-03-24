package com.oliu.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.oliu.utils.WebUtils;
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
 * Created by zli on 2017/3/15.
 */
@Controller
@RequestMapping("/express")
public class ExpressController {
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String expressList() {
        return "express";
    }

    @RequestMapping(value = "/kuaidi1002", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Object kuaidi1002(String company, String expressNo) {
        try {
            StringBuffer urlSB = new StringBuffer();
            urlSB.append("http://api.kuaidi100.com/api");
            urlSB.append("?id=");//身份授权key
            urlSB.append("07d716372e2bd23d");
            urlSB.append("&com=");//要查询的快递代码（这个是否是根据规则找出快递公司代码）
            urlSB.append(company);
            urlSB.append("&nu=");//要查询的快递单号
            urlSB.append(expressNo);
            urlSB.append("&show=0");//返回类型。0为json，1为xml，2为html，3为text
            urlSB.append("&muti=1");//返回信息的数量。1为多行，0为一行
            urlSB.append("&order=desc");//排序。desc按时间由新到旧排序，asc按时间由就旧到新排列
            JSONObject data = WebUtils.requestThirdUrl(urlSB.toString(), "GET");
            System.out.println(data);
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @RequestMapping(value = "/kuaidi100", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Object kuaidi100(String company, String expressNo) {
        System.out.println("start--------------------");
        for (int i = 0; i < 500; i++) {
            try {
                StringBuffer urlSB = new StringBuffer();
                //ip被禁止{"com":"","ischeck":"0","condition":"","data":[],"nu":"","state":"0","message":"非法访问:IP禁止访问","status":"604"}

               /* {
                    "message": "ok",
                        "nu": "1202535764881",
                        "ischeck": "1",
                        "condition": "F00",
                        "com": "yunda",
                        "status": "200",
                        "state": "3",
                        "data": [
                    {
                        "time": "2017-03-16 13:36:08",
                            "ftime": "2017-03-16 13:36:08",
                            "context": "[广东深圳公司龙岗区深惠创新分部]快件已被 已签收 签收",
                            "location": "广东深圳公司龙岗区深惠创新分部"
                    },
                    {
                        "time": "2017-03-16 10:14:35",
                            "ftime": "2017-03-16 10:14:35",
                            "context": "[广东深圳公司龙岗区深惠创新分部]进行派件扫描；派送业务员：胡八军；联系电话：13597695428",
                            "location": "广东深圳公司龙岗区深惠创新分部"
                    },
                    {
                        "time": "2017-03-16 07:16:54",
                            "ftime": "2017-03-16 07:16:54",
                            "context": "[广东深圳公司龙岗区布吉深惠分拨分部]进行快件扫描，将发往：广东深圳公司龙岗区深惠创新分部",
                            "location": "广东深圳公司龙岗区布吉深惠分拨分部"
                    },
                    {
                        "time": "2017-03-15 18:15:45",
                            "ftime": "2017-03-15 18:15:45",
                            "context": "[广东深圳公司]进行快件扫描，将发往：广东深圳公司龙岗区布吉深惠分拨分部",
                            "location": "广东深圳公司"
                    },
                    {
                        "time": "2017-03-15 18:04:17",
                            "ftime": "2017-03-15 18:04:17",
                            "context": "[广东深圳公司]在分拨中心进行卸车扫描",
                            "location": "广东深圳公司"
                    },
                    {
                        "time": "2017-03-15 02:24:10",
                            "ftime": "2017-03-15 02:24:10",
                            "context": "[福建晋江分拨中心]进行装车扫描，即将发往：广东深圳公司",
                            "location": "福建晋江分拨中心"
                    },
                    {
                        "time": "2017-03-15 02:22:07",
                            "ftime": "2017-03-15 02:22:07",
                            "context": "[福建晋江分拨中心]在分拨中心进行称重扫描",
                            "location": "福建晋江分拨中心"
                    },
                    {
                        "time": "2017-03-14 23:24:16",
                            "ftime": "2017-03-14 23:24:16",
                            "context": "[福建厦门公司]进行发出扫描，将发往：福建晋江分拨中心",
                            "location": "福建厦门公司"
                    },
                    {
                        "time": "2017-03-14 23:20:42",
                            "ftime": "2017-03-14 23:20:42",
                            "context": "[福建厦门公司]进行下级地点扫描，将发往：广东深圳公司",
                            "location": "福建厦门公司"
                    },
                    {
                        "time": "2017-03-14 21:29:24",
                            "ftime": "2017-03-14 21:29:24",
                            "context": "[福建厦门公司]进行揽件扫描",
                            "location": "福建厦门公司"
                    },
                    {
                        "time": "2017-03-14 18:27:06",
                            "ftime": "2017-03-14 18:27:06",
                            "context": "[福建厦门公司高林分部]进行揽件扫描",
                            "location": "福建厦门公司高林分部"
                    }
  ]
                }*/
                urlSB.append("http://www.kuaidi100.com/query");
                urlSB.append("?type=");//要查询的快递代码（这个是否是根据规则找出快递公司代码）
                urlSB.append(company);
                urlSB.append("&postid=");//要查询的快递单号
                urlSB.append(expressNo);
                JSONObject data = WebUtils.requestThirdUrl(urlSB.toString(), "GET");
                System.out.println(String.valueOf(i)+" "+data);
                //return "ok";
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("error");
                //return "error";
            }
        }
        return "ok";
    }

    public Object kuaidicom() {
        /*try {
            StringBuffer urlSB = new StringBuffer();
            urlSB.append("http://api.kuaidi.com/openapi.html");
            urlSB.append("?id=");//身份授权key
            urlSB.append("07d716372e2bd23d");
            urlSB.append("&com=");//要查询的快递代码（这个是否是根据规则找出快递公司代码）
            urlSB.append(company);
            urlSB.append("&nu=");//要查询的快递单号
            urlSB.append(expressNo);
            urlSB.append("&show=0");//返回类型。0为json，1为xml，2为html，3为text
            urlSB.append("&muti=1");//返回信息的数量。1为多行，0为一行
            urlSB.append("&order=desc");//排序。desc按时间由新到旧排序，asc按时间由就旧到新排列
            JSONObject data = WebUtils.requestThirdUrl(urlSB.toString(), "GET");
            System.out.println(data);
            return "ok";
        }catch (Exception e){
            e.printStackTrace();
            return "error";
        }*/
        return "ok";
    }

    //{"message":"快递公司网络异常，请稍后查询.","status":"2"}
    public String kuaidicomBaidu(String company, String expressNo) {
        try {
            StringBuffer urlSB = new StringBuffer();
            urlSB.append("http://apis.baidu.com/kuaidicom/express_api/express_api");
            urlSB.append("?apikey=66a181c0e43a649c8214caa76e3bd61e");
            urlSB.append("?id=");//身份授权key
            urlSB.append("07d716372e2bd23d");
            urlSB.append("&com=");//要查询的快递代码（这个是否是根据规则找出快递公司代码）
            urlSB.append(company);
            urlSB.append("&nu=");//要查询的快递单号
            urlSB.append(expressNo);
            urlSB.append("&show=0");//返回类型。0为json，1为xml，2为html，3为text
            urlSB.append("&muti=1");//返回信息的数量。1为多行，0为一行
            urlSB.append("&order=desc");//排序。desc按时间由新到旧排序，asc按时间由就旧到新排列
            JSONObject data = WebUtils.requestThirdUrl(urlSB.toString(), "GET");
            System.out.println(data);
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
        //return "ok";
    }
}
