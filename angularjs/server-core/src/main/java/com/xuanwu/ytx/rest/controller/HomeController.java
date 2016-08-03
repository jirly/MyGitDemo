package com.xuanwu.ytx.rest.controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.web.bind.annotation.RestController;

/**
 * @Description HomeController
 * @author <a href="mailto:jiji@javawind.com">XueFang.Xu</a>
 * @date 2016-07-07
 * @version 1.0.0
 */
@RestController
@Path("home")
public class HomeController {

	@GET
	public String home() {
		return "Hello home!";
	}

}
