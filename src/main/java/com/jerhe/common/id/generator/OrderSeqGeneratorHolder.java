package com.jerhe.common.id.generator;

import com.google.common.base.Preconditions;

/**
 * 订单序号生成器
 */
public class OrderSeqGeneratorHolder {
	private static OrderSeqGenerator orderSeqGenerator = new OrderSeqGenerator();

	public static Long getNextSeq() {
		Preconditions.checkState(OrderSeqGenerator.getWorkerId()>0,
						"订单序号生成节点ID未设置，请设置后再使用。");
		return orderSeqGenerator.getNextSeq();
	}
}
