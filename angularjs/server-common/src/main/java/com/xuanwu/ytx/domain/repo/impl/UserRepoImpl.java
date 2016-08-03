package com.xuanwu.ytx.domain.repo.impl;

import org.springframework.stereotype.Repository;

import com.xuanwu.ytx.db.BaseRepository;
import com.xuanwu.ytx.domain.entity.User;
import com.xuanwu.ytx.domain.repo.UserRepo;

/**
 * @Description UserRepoImpl
 * @author <a href="mailto:jiji@javawind.com">XueFang.Xu</a>
 * @date 2016-07-07
 * @version 1.0.0
 */
@Repository
public class UserRepoImpl extends BaseRepository<User> implements UserRepo {

	@Override
	protected String namesapceForSqlId() {
		return "com.xuanwu.ytx.mapper.UserMapper";
	}

}
