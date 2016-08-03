/*
 * Copyright (c) 2015 by XuanWu Wireless Technology Co., Ltd. 
 *             All rights reserved                         
 */
package com.xuanwu.ytx.db;

import java.io.Serializable;
import java.util.List;

import com.xuanwu.ytx.domain.Entity;
import com.xuanwu.ytx.utils.QueryParameters;

/**
 * 仓储访问接口, 提供通用仓储方法
 * 
 * @author <a href="mailto:liushuaiying@139130.net">Shuaiying.Liu</a>
 * @Data 2015年5月27日
 * @Version 1.0.0
 */
public interface EntityRepository<T extends Entity> {

	/**
	 * 添加一个实体
	 * 
	 * @param t
	 * @return
	 */
	public T save(T t);

	/**
	 * 批量添加实体
	 * 
	 * @param t
	 */
	@SuppressWarnings("unchecked")
	public int saveBatch(T... t);

	/**
	 * 更新一个实体
	 * 
	 * @param t
	 * @return
	 */
	public int updateSpecify(T t);

	/**
	 * 移除一个实体
	 * 
	 * @param t
	 * @return
	 */
	public int delete(T t);

	/**
	 * 根据实体ID，删除实体
	 * 
	 * @param id
	 * @return
	 */
	public int deleteById(Serializable id);

	/**
	 * 根据实体ID，查找实体
	 * 
	 * @param id
	 * @return
	 */
	public T getById(Serializable id);

	/**
	 * 查询符合查询参数的实体结果集数量
	 * 
	 * @param param
	 * @return
	 */
	public int findResultCount(QueryParameters param);

	/**
	 * 查询符合查询参数的实体结果集
	 * 
	 * @param param
	 * @return
	 */
	public List<T> findResults(QueryParameters param);

}
