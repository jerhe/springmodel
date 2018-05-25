package com.jerhe.common.base.dao;

import com.jerhe.common.util.ReflectionUtils;
import org.hibernate.*;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.metadata.ClassMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 数据库连接类
 * 
 * @param <T>
 * @param <ID>
 */
public class SimpleHibernateDao<T, ID extends Serializable> {
	protected Logger logger = LoggerFactory.getLogger(this.getClass());

	@Resource(name = "sessionFactory")
	private SessionFactory sessionFactory;

	protected Class<T> entityClass;

	public SimpleHibernateDao() {
		this.entityClass = ReflectionUtils.getSuperClassGenricType(this.getClass());
	}

	/**
	 * 
	 * @param sessionFactory
	 * 
	 * @param entityClass
	 *            实体类
	 */
	public SimpleHibernateDao(final SessionFactory sessionFactory, final Class<T> entityClass) {
		this.sessionFactory = sessionFactory;
		this.entityClass = entityClass;
	}

	/**
	 * 
	 * @return
	 */
	public SessionFactory getSessionFactory() {
		return this.sessionFactory;
	}

	/**
	 * 
	 * @param sessionFactory
	 */
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	/**
	 * 
	 * @return
	 */
	public Session getSession() {
		return this.sessionFactory.getCurrentSession();
	}

	/**
	 * 数据保存
	 * 
	 * @param entity
	 *            实体类
	 */
	public void save(final T entity) {
		Assert.notNull(entity, "entity can not be null!");
		this.getSession().saveOrUpdate(entity);
		this.logger.debug("save entity {}", entity);
	}

	/**
	 * 数据保存
	 * 
	 * @param entity
	 *            实体类
	 */
	public void saveT(final T entity) {
		Assert.notNull(entity, "entity can not be null!");
		this.getSession().save(entity);
		this.logger.debug("save entity {}", entity);
	}

	/**
	 * 删除数据
	 * 
	 * @param entity
	 *            实体类
	 */
	public void delete(final T entity) {
		Assert.notNull(entity, "entity can not be null!");
		this.getSession().delete(entity);
		this.logger.debug("delete entity {}", entity);
	}

	/**
	 * 更新数据
	 * 
	 * @param entity
	 *            实体类
	 */
	public void update(final T entity) {
		Assert.notNull(entity, "entity can not be null!");
		this.getSession().update(entity);
		this.logger.debug("update entity {}", entity);
	}

	/**
	 * 删除目标数据
	 * 
	 * @param id
	 *            查询参数
	 */
	public void delete(final ID id) {
		Assert.notNull(id, "id can not be null!");
		this.delete(this.get(id));
		this.logger.debug("delete entity {},id is {}", this.entityClass.getSimpleName(), id);
	}

	/**
	 * 目标数据获取
	 * 
	 * @param id
	 *            查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T get(ID id) {
		Assert.notNull(id, "id can not be null!");
		return (T) this.getSession().get(this.entityClass, id);
	}

	/**
	 * 
	 * @param ids
	 * @return
	 */
	public List<T> get(final Collection<ID> ids) {
		return this.find(Restrictions.in(this.getIdName(), ids));
	}

	/**
	 * 返回所有目标数据
	 * 
	 * @return
	 * 
	 */
	public List<T> getAll() {
		return this.find();
	}

	/**
	 * 
	 * @param orderByProperty
	 * @param isAsc
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> getAll(String orderByProperty, boolean isAsc) {
		Criteria c = this.createCriteria();
		if (isAsc) {
			c.addOrder(Order.asc(orderByProperty));
		} else {
			c.addOrder(Order.desc(orderByProperty));
		}
		return c.list();
	}

	/**
	 * 获取一条数据
	 * 
	 * @param propertyName
	 *            目标参数
	 * @param value
	 *            查询参数
	 * @return
	 */
	public List<T> findBy(final String propertyName, final Object value) {
		Assert.hasText(propertyName, "propertyName can not be null!");
		Criterion criterion = Restrictions.eq(propertyName, value);
		return this.find(criterion);
	}

	/**
	 * 获取唯一数据
	 * 
	 * @param propertyName
	 *            目标参数
	 * @param value
	 *            查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T findUniqueBy(final String propertyName, final Object value) {
		Assert.hasText(propertyName, "propertyName can not be null!");
		Criterion criterion = Restrictions.eq(propertyName, value);
		return (T) this.createCriteria(criterion).uniqueResult();
	}

	/**
	 * 获取目标数据
	 * 
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <X> List<X> find(final String hql, final Object... values) {
		return this.createQuery(hql, values).list();
	}

	/**
	 * 获取多条数据
	 * 
	 * @param limit
	 * 
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <X> List<X> find(int limit, final String hql, final Object... values) {
		if (limit == 0) {
			limit = 1;
		}
		Query query = this.createQuery(hql, values);
		query.setFirstResult(0);
		query.setMaxResults(limit);
		return query.list();
	}

	/**
	 * 获取多条数据
	 * 
	 * @param limit
	 * 
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <X> List<X> find(int offset, int limit, final String hql, final Object... values) {
		if (offset < 0) {
			offset = 0;
		}
		if (limit == 0) {
			limit = 1;
		}
		Query query = this.createQuery(hql, values);
		query.setFirstResult(offset);
		query.setMaxResults(limit);
		return query.list();
	}

	/**
	 * 获取多条数据
	 * 
	 * @param offset
	 * @param limit
	 * 
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <X> List<X> find(int offset, int limit, final String hql, final Map<String, Object> values) {
		if (offset < 0) {
			offset = 0;
		}
		if (limit == 0) {
			limit = 1;
		}
		Query query = this.createQuery(hql, values);
		query.setFirstResult(offset);
		query.setMaxResults(limit);
		return query.list();
	}

	/**
	 * 获取多条数据(不带查询条件)
	 * 
	 * @param offset
	 * @param limit
	 * @param hql
	 * @return
	 */
	public <X> List<X> find(int offset, int limit, final String hql) {
		if (offset < 0) {
			offset = 0;
		}
		if (limit == 0) {
			limit = 1;
		}
		Query query = this.createQuery(hql);
		query.setFirstResult(offset);
		query.setMaxResults(limit);
		return query.list();
	}

	/**
	 * 获取多条数据
	 * 
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数(Map(String,?))
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <X> List<X> find(final String hql, final Map<String, ?> values) {
		return this.createQuery(hql, values).list();
	}

	/**
	 * 获取多添数据
	 * 
	 * @param limit
	 * 
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数(Map(String,Object))
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <X> List<X> find(int limit, final String hql, final Map<String, Object> values) {
		if (limit == 0) {
			limit = 1;
		}
		Query query = this.createQuery(hql, values);
		query.setFirstResult(0);
		query.setMaxResults(limit);
		return query.list();
	}

	/**
	 * 获取一条数据
	 * 
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <X> X findUnique(final String hql, final Object... values) {
		return (X) this.createQuery(hql, values).uniqueResult();
	}

	/**
	 * 获取一条数据
	 * 
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数(Map(String,?))
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <X> X findUnique(final String hql, final Map<String, ?> values) {
		return (X) this.createQuery(hql, values).uniqueResult();
	}

	/**
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数
	 * @return
	 */
	public int batchExecute(final String hql, final Object... values) {
		return this.createQuery(hql, values).executeUpdate();
	}

	/**
	 * @param hql
	 *            查询语句
	 * @param values
	 *            查询参数（Map(String,?)）
	 * @return
	 */
	public int batchExecute(final String hql, final Map<String, ?> values) {
		return this.createQuery(hql, values).executeUpdate();
	}

	/**
	 * 创建查询语句
	 * 
	 * @param queryString
	 *            查询语句
	 * @param values
	 *            查询参数
	 * @return
	 */
	public Query createQuery(final String queryString, final Object... values) {
		Assert.hasText(queryString, "queryString can not be null!");
		Query query = this.getSession().createQuery(queryString);
		if (values != null) {
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return query;
	}

	public Query createQuery(final String queryString) {
		Assert.hasText(queryString, "queryString can not be null!");
		Query query = this.getSession().createQuery(queryString);
		return query;
	}

	/**
	 * 创建查询语句
	 * 
	 * @param queryString
	 *            查询语句
	 * @param values
	 *            查询参数（Map(String,?)）
	 * @return
	 */
	public Query createQuery(final String queryString, final Map<String, ?> values) {
		Assert.hasText(queryString, "queryString can not be null!");
		Query query = this.getSession().createQuery(queryString);
		if (values != null) {
			query.setProperties(values);
		}
		return query;
	}

	/**
	 * 
	 * @param criterions
	 *            查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> find(final Criterion... criterions) {
		return this.createCriteria(criterions).list();
	}

	/**
	 * 
	 * @param criterions
	 *            查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T findUnique(final Criterion... criterions) {
		return (T) this.createCriteria(criterions).uniqueResult();
	}

	/**
	 * 
	 * @param criterions
	 *            查询参数
	 * @return
	 */
	public Criteria createCriteria(final Criterion... criterions) {
		Criteria criteria = this.getSession().createCriteria(this.entityClass);
		for (Criterion c : criterions) {
			criteria.add(c);
		}
		return criteria;
	}

	/**
	 * 
	 * @param proxy
	 */
	public void initProxyObject(Object proxy) {
		Hibernate.initialize(proxy);
	}

	/**
	* 
	*/
	public void flush() {
		this.getSession().flush();
	}

	/**
	 * 
	 * @param query
	 * @return
	 */
	public Query distinct(Query query) {
		query.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
		return query;
	}

	/**
	 * 
	 * @param criteria
	 *            查询参数
	 * @return
	 */
	public Criteria distinct(Criteria criteria) {
		criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
		return criteria;
	}

	/**
	 * 
	 * @return
	 */
	public String getIdName() {
		ClassMetadata meta = this.getSessionFactory().getClassMetadata(this.entityClass);
		return meta.getIdentifierPropertyName();
	}

	/**
	 * 
	 * @param propertyName
	 *            属性名称
	 * @param newValue
	 *            新数据
	 * @param oldValue
	 *            旧数据
	 * @return
	 */
	public boolean isPropertyUnique(final String propertyName, final Object newValue, final Object oldValue) {
		if (newValue == null || newValue.equals(oldValue)) {
			return true;
		}
		Object object = this.findUniqueBy(propertyName, newValue);
		return (object == null);
	}

}
