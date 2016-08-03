/*
 * Copyright (c) 2015 by XuanWu Wireless Technology Co., Ltd. 
 *             All rights reserved                         
 */
package com.xuanwu.ytx.domain;

import java.io.Serializable;

public interface Entity extends Serializable {

	Serializable getId();

	boolean isSaveSuccess();

	void setSaveSuccess(boolean saveSuccess);

}
