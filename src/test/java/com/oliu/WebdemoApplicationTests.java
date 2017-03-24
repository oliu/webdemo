package com.oliu;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WebdemoApplicationTests {

	@Test
	public void contextLoads() {
	}

	//zli
	@Value("${local.server.port}")
	private int port;

	@Test
	public void testHello()throws Exception{
		ResponseEntity<String> entity= new TestRestTemplate().getForEntity("http://localhost:"+this.port+"/",String.class);
		//assertEquals(httpStatus.OK)
	}
}
