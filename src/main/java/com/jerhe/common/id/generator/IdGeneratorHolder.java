package com.jerhe.common.id.generator;

import com.google.common.base.Preconditions;

public class IdGeneratorHolder {
	private static NodeDTTSIdGenerator idStrGenerator = new NodeDTTSIdGenerator();

	public static String getNextId() {
		Preconditions.checkState(NodeDTTSIdGenerator.getWorkerId() > 0, "主键生成节点ID未设置，请设置后再使用。");
		String id = idStrGenerator.generateId();
		return id;
	}
}
