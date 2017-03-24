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
 * Just test case
 */
@RestController
public class HelloController {
    @Value("${projectName}")
    private String projectName;

    @Autowired
    private GirlProperties girlProperties;

    /**
     *
     * @return
     */
    @RequestMapping(value = "/getPropertiesValue",method = RequestMethod.GET)
    public String say(){
        StringBuffer sb = new StringBuffer();
        sb.append("Try get properties value.");
        sb.append("The projectName is:");
        sb.append(projectName);
        sb.append(".The girl name is:");
        sb.append(girlProperties.getName());
        sb.append(",the girl age is:");
        sb.append(Integer.toString(girlProperties.getAge()));
        return sb.toString();
    }

    /**
     * test two url one interface
     * http://localhost:8080/one?id=1
     *
     * @param id
     * @return
     */
    @RequestMapping(value = {"/one","/two"},method = RequestMethod.GET)
    public String one(@RequestParam(value = "id",required = false,defaultValue = "0") String id){
        return "the api one or two id value is:" + id;
    }
}
