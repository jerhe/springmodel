package com.jerhe.model.dao.test;

import com.jerhe.common.base.dao.SimpleHibernateDao;
import com.jerhe.model.entity.Test;
import org.springframework.stereotype.Repository;

@Repository
public class TestDao extends SimpleHibernateDao<Test,Integer> {
}
