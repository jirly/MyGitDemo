/*
 * Copyright (c) 2016 by XuanWu Wireless Technology Co,. Ltd. 
 *             All rights reserved                         
 */
package com.xuanwu.ytx.server;

import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

/**
 * @Description JerseyConfig
 * @author <a href="mailto:jiji@javawind.com">XueFang.Xu</a>
 * @date 2016-07-07
 * @version 1.0.0
 */
@Component
public class JerseyConfig extends ResourceConfig {

	public JerseyConfig() {
		packages("com.xuanwu");
		register(MultiPartFeature.class);
	}

}
