package com.xuanwu.ytx.rest.controller;

import java.util.Collection;

import javax.validation.Valid;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.xuanwu.ytx.domain.entity.User;
import com.xuanwu.ytx.rest.dto.JsonResp;
import com.xuanwu.ytx.rest.dto.PageReqt;
import com.xuanwu.ytx.rest.dto.PageResp;
import com.xuanwu.ytx.service.UserService;
import com.xuanwu.ytx.utils.PageInfo;
import com.xuanwu.ytx.utils.QueryParameters;

/**
 * @Description UserController
 * @author <a href="mailto:jiji@javawind.com">XueFang.Xu</a>
 * @date 2016-07-08
 * @version 1.0.0
 */
@RestController
@Path("user")
public class UserController {

	@Autowired
	private UserService userService;

	@POST
	@Path("list")
	@Produces({ MediaType.APPLICATION_JSON })
	public JsonResp list(@Valid PageReqt req) {
		QueryParameters params = new QueryParameters();
		params.addParams(req.getParams());
		if (req.getSorts().size() > 0) {
			params.addSorts(req.getSorts());
		}
		int total = userService.count(params);
		if (total == 0) {
			return PageResp.emptyResult();
		}

		PageInfo pageInfo = new PageInfo(req.getPage(), req.getCount(), total);
		params.setPage(pageInfo);
		Collection<User> users = userService.list(params);
		return PageResp.success(total, users);
	}

	@POST
	@Path("save")
	@Produces({ MediaType.APPLICATION_JSON })
	public JsonResp add(@Valid User user) {
		user = userService.save(user);
		if (!user.isSaveSuccess()) {
			return PageResp.fail(-1, "保存数据失败！");
		}

		return PageResp.success();
	}

	@POST
	@Path("del")
	@Produces({ MediaType.APPLICATION_JSON })
	public JsonResp delete(Integer[] ids) {
		if (ids == null || ids.length == 0) {
			return JsonResp.fail("请选择需要删除的用户！");
		}

		int count = 0;
		for (int id : ids) {
			count += userService.deleteById(id);
		}
		if (count == 0) {
			return PageResp.fail(-1, "删除数据失败！");
		}

		return JsonResp.success();
	}

	@GET
	@Path("user/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public JsonResp getUser(@PathParam("id") Integer id) {
		User user = userService.get(id);
		return JsonResp.success(user);
	}

	@GET
	@Path("user")
	@Produces({ MediaType.APPLICATION_JSON })
	public JsonResp getUserById(@QueryParam("id") Integer id) {
		User user = userService.get(id);
		return JsonResp.success(user);
	}
}
