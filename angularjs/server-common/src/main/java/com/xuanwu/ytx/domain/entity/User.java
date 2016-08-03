package com.xuanwu.ytx.domain.entity;

import java.util.Date;

import com.xuanwu.ytx.domain.AbstractEntity;

/**
 * @Description 注册用户
 * @author <a href="mailto:jiji@javawind.com">XueFang.Xu</a>
 * @date 2016-07-07
 * @version 1.0.0
 */
public class User extends AbstractEntity {

	private static final long serialVersionUID = 1164964073855943337L;

	private Integer id;// id主键
	private String name;// 用户名
	private String password;// 密码
	private String mobile;// 手机号码
	private Date addTime;// 注册日期

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Date getAddTime() {
		return addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", password=" + password + ", mobile=" + mobile + ", addTime="
				+ addTime + "]";
	}

}
