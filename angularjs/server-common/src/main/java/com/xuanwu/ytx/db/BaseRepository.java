/*
 * Copyright (c) 2015 by XuanWu Wireless Technology Co., Ltd. 
 *             All rights reserved                         
 */
package com.xuanwu.ytx.db;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.xuanwu.ytx.domain.Entity;
import com.xuanwu.ytx.utils.QueryParameters;

/**
 * 基于MyBatis的基本仓储实现
 * 
 * @author <a href="mailto:liushuaiying@139130.net">Shuaiying.Liu</a>
 * @Data 2015年5月27日
 * @Version 1.0.0
 */
public abstract class BaseRepository<T extends Entity> implements EntityRepository<T> {

	private Logger logger = LoggerFactory.getLogger(BaseRepository.class);

	@Autowired
	protected SqlSessionFactory sqlSessionFactory;

	@Autowired
	private SqlSession session;

	protected abstract String namesapceForSqlId();

	protected String fullSqlId(String sqlId) {
		return namesapceForSqlId() + "." + sqlId;
	}

	@Override
	public T save(T t) {
		try (SqlSession session = sqlSessionFactory.openSession()) {
			int ret = 0;
			if (t.getId() != null) {
				ret = session.update(fullSqlId("update"), t);
			}
			if (ret == 0) {
				ret = session.insert(fullSqlId("insert"), t);
			}
			t.setSaveSuccess(ret > 0);
			session.commit(true);
		} catch (Exception e) {
			logger.error("Save/Update Entity failed: ", e);
			t.setSaveSuccess(false);
		}
		return t;
	}

	@Override
	@SuppressWarnings("unchecked")
	public int saveBatch(T... t) {
		int count = 0;
		try (SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH)) {
			count = session.update(fullSqlId("insertBatch"), t);
			session.commit(true);
		} catch (Exception e) {
			logger.error("SaveBatch Entities failed: ", e);
		}
		return count;
	}

	@Override
	public int updateSpecify(T t) {
		int count = 0;
		try (SqlSession session = sqlSessionFactory.openSession()) {
			count = session.update(fullSqlId("updateSpecify"), t);
			session.commit(true);
		} catch (Exception e) {
			logger.error("UpdateSpecify Entity failed: ", e);
		}
		return count;
	}

	@Override
	public int deleteById(Serializable id) {
		int count = 0;
		try (SqlSession session = sqlSessionFactory.openSession()) {
			count = session.delete(fullSqlId("deleteById"), id);
			session.commit(true);
		} catch (Exception e) {
			logger.error("Remove Entity failed: ", e);
		}
		return count;
	}

	@Override
	public int delete(T t) {
		int count = 0;
		try (SqlSession session = sqlSessionFactory.openSession()) {
			count = session.delete(fullSqlId("delete"), t);
			session.commit(true);
		} catch (Exception e) {
			logger.error("Remove Entity failed: ", e);
		}
		return count;
	}

	@Override
	public T getById(Serializable id) {
		return session.selectOne(fullSqlId("getById"), id);
	}

	@Override
	public int findResultCount(QueryParameters params) {
		return session.selectOne(fullSqlId("findResultCount"), params);
	}

	@Override
	public List<T> findResults(QueryParameters params) {
		return session.selectList(fullSqlId("findResults"), params);
	}

}
