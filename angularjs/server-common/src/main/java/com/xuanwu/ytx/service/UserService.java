package com.xuanwu.ytx.service;

import java.util.Collection;

import com.xuanwu.ytx.domain.entity.User;
import com.xuanwu.ytx.utils.QueryParameters;

/**
 * @Description UserService
 * @author <a href="mailto:jiji@javawind.com">XueFang.Xu</a>
 * @date 2016-07-07
 * @version 1.0.0
 */
public interface UserService {

	public Integer count(QueryParameters params);

	public Collection<User> list(QueryParameters params);

	public User get(Integer id);

	public User save(final User user);

	public int updateSpecify(final User user);

	public int deleteById(Integer id);

}
