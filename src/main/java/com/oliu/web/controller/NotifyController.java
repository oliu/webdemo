package com.oliu.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by zli on 2017/3/6.
 */
@Controller
@RequestMapping("/n")
public class NotifyController {
    @RequestMapping(value = "/getNotify",method = RequestMethod.GET)
    @ResponseBody
    public Object getNotify(String str){
        return "hello";
    }
}
