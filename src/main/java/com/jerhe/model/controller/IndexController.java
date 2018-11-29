package com.jerhe.model.controller;

import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.metadata.Sheet;
import com.alibaba.excel.support.ExcelTypeEnum;
import com.alibaba.fastjson.JSON;
import com.jerhe.common.base.BaseController;
import com.jerhe.common.enums.MqTopicEnum;
import com.jerhe.common.msg.mq.BaseMsgProducer;
import com.jerhe.common.msg.mq.MqMessage;
import com.jerhe.model.service.TestService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    @RequestMapping(value = "/excel")
    @ResponseBody
    public void getExcel(HttpServletResponse response) throws IOException {
        //方式1 mybatis
        List<Map<String, Object>> test = (List<Map<String, Object>>) testService.getAll();

        ServletOutputStream out = response.getOutputStream();
        ExcelWriter writer = new ExcelWriter(out, ExcelTypeEnum.XLSX, true);
        String fileName = new String(("Test " + new SimpleDateFormat("yyyy-MM-dd").format(new Date()))
                .getBytes(), "UTF-8");
        Sheet sheet1 = new Sheet(1, 0);
        sheet1.setSheetName("第一个sheet");
        writer.write0(getListString(), sheet1);
        writer.finish();
        response.setContentType("multipart/form-data");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Content-disposition", "attachment;filename="+fileName+".xlsx");
        out.flush();
    }
}
