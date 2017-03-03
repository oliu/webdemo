package com.oliu.web.controller;

import com.oliu.config.GirlProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zli on 2017/3/2.
 */
@RestController
public class HelloController {
    @Value("${projectName}")
    private String projectName;

    @Autowired
    private GirlProperties girlProperties;

    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public String say(){
        StringBuffer sb = new StringBuffer();
        sb.append(projectName);
        sb.append(" hello ");
        sb.append(girlProperties.getName());
        sb.append(Integer.toString(girlProperties.getAge()));
        return sb.toString();
    }

    //http://localhost:8080/one?id=1
    @RequestMapping(value = {"/one","/two"},method = RequestMethod.GET)
    public String one(@RequestParam(value = "id",required = false,defaultValue = "0") String id){
        return "one or two id is:" + id;
    }
}
