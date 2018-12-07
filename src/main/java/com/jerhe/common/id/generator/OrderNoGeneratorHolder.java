package com.jerhe.common.id.generator;

import com.google.common.base.Preconditions;

public class OrderNoGeneratorHolder {
	private static NodeDTTSIdGenerator idStrGenerator = new NodeDTTSIdGenerator();

	public static String generateOrderNo() {
		Preconditions.checkState(NodeDTTSIdGenerator.getWorkerId()>0,
						"订单号生成节点ID未设置，请设置后再使用。");
		return idStrGenerator.generateId();
	}
}
