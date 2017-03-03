package com.oliu.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by zli on 2017/3/3.
 */
@Component
@ConfigurationProperties(prefix = "girl")
@Setter
@Getter
public class GirlProperties {
    private String name;
    private Integer age;
}
