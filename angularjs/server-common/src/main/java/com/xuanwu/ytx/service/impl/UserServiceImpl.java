package com.xuanwu.ytx.service.impl;

import java.util.Collection;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xuanwu.ytx.domain.entity.User;
import com.xuanwu.ytx.domain.repo.UserRepo;
import com.xuanwu.ytx.service.UserService;
import com.xuanwu.ytx.utils.QueryParameters;

/**
 * @Description UserServiceImpl
 * @author <a href="mailto:jiji@javawind.com">XueFang.Xu</a>
 * @date 2016-07-07
 * @version 1.0.0
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	public Integer count(QueryParameters params) {
		return userRepo.findResultCount(params);
	}

	public Collection<User> list(QueryParameters params) {
		return userRepo.findResults(params);
	}

	public User get(Integer id) {
		return userRepo.getById(id);
	}

	public User save(final User user) {
		if (user.getId() == 0) {// add
			user.setAddTime(new Date());
		}
		return userRepo.save(user);
	}

	public int updateSpecify(final User user) {
		return userRepo.updateSpecify(user);
	}

	public int deleteById(Integer id) {
		return userRepo.deleteById(id);
	}
}
