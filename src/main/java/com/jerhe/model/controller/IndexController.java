package com.jerhe.model.controller;

import com.alibaba.fastjson.JSON;
import com.jerhe.common.base.BaseController;
import com.jerhe.common.enums.MqTopicEnum;
import com.jerhe.common.msg.mq.BaseMsgProducer;
import com.jerhe.common.msg.mq.MqMessage;
import com.jerhe.model.service.TestService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @author zhuzhen
 */
@Controller
public class IndexController extends BaseController {
    /**
     * 访问webapp/jsp/index.jsp文件
     *
     * @return
     */
    @Resource
    private TestService testService;
    @Resource
    private BaseMsgProducer baseMsgProducer;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("index.vm");
        //方式1 mybatis
        List<Map<String, Object>> test = (List<Map<String, Object>>) testService.getAll();
        //List<Test> test =testService.getAllHibernate();
        String str = JSON.toJSONString(test);
        logger.info("啊啊啊{}", str);
        mv.addObject("test", test);

        //test队列
        MqMessage mqMessage = MqMessage.topicMessage(MqTopicEnum.MQ_JERHE);
        mqMessage.setQueueName(MqTopicEnum.MQ_JERHE.name());
        mqMessage.setContent("我是jerhe");
        baseMsgProducer.sendTopicMsg(mqMessage,5000L);
        logger.info("send jerhe消息");
        return mv;
    }
}
