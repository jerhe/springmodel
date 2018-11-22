package com.jerhe.model.util;

import java.util.HashMap;

@SuppressWarnings("unchecked")
public class ContextHolder {

	private static ThreadLocal<HashMap<Object, Object>> threadLocal = new ThreadLocal<HashMap<Object, Object>>();
	private static final String SEQUENCE = "_sequence_";

	public static <K, V> V put(K key, V value) {
		HashMap<Object, Object> map = getMap();
		return (V) map.put(key, value);
	}

	public static <K, V> V get(K key) {
		HashMap<Object, Object> map = getMap();
		return (V) map.get(key);
	}

	public static <K, V> V remove(K key) {
		HashMap<Object, Object> map = threadLocal.get();
		if (map != null) {
			return (V) map.remove(key);
		}
		return null;
	}

	private static HashMap<Object, Object> getMap() {
		HashMap<Object, Object> map = threadLocal.get();
		if (map == null) {
			map = new HashMap<Object, Object>();
			threadLocal.set(map);
		}
		return map;
	}

	public static String getSeq() {
		return get(SEQUENCE);
	}

	public static String setSeq(String sequence) {
		return put(SEQUENCE, sequence);
	}
}
