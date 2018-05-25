package com.jerhe.model.controller;

import com.alibaba.fastjson.JSON;
import com.jerhe.common.base.BaseController;
import com.jerhe.model.entity.Test;
import com.jerhe.model.service.TestService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 *
 * @author zhuzhen
 */
@Controller
public class IndexController extends BaseController {
    /**
     * 访问webapp/jsp/index.jsp文件
     * @return
     */
    @Resource
    private TestService testService;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String index(){
        return "index";
    }

    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public ModelAndView home(){
        ModelAndView mv =new ModelAndView("index");
        //方式1 mybatis
        List<Map<String,Object>> test= (List<Map<String, Object>>) testService.getAll();
        //List<Test> test =testService.getAllHibernate();
        String str = JSON.toJSONString(test);
        logger.info("啊啊啊{}",str);
        mv.addObject("test",test);
        return mv;
    }
}
