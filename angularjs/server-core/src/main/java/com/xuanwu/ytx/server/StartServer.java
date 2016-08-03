/*
 * Copyright (c) 2016 by XuanWu Wireless Technology Co,. Ltd. 
 *             All rights reserved                         
 */
package com.xuanwu.ytx.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * @Description StartServer
 * @author <a href="mailto:jiji@javawind.com">XueFang.Xu</a>
 * @date 2016-07-07
 * @version 1.0.0
 */
@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.xuanwu")
@SpringBootApplication
public class StartServer {

	public static void main(String[] args) {
		SpringApplication.run(StartServer.class, args);
	}
}
