package com.jerhe.model.service;

import com.jerhe.common.base.BaseService;
import com.jerhe.model.dao.test.TestDao;
import com.jerhe.model.entity.Test;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TestService extends BaseService {

    public Object getAll(){
        return dao.findForListX("com.jerhe.model.TestMapper.getAllTest",null);
    }

    @Resource
    private TestDao testDao;
    public List<Test> getAllHibernate(){

        return testDao.getAll();
    }
}