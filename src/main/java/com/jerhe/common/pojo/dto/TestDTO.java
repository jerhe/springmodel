package com.jerhe.common.pojo.dto;

import com.alibaba.excel.annotation.ExcelProperty;

import java.io.Serializable;

public class TestDTO implements Serializable{

    @ExcelProperty(value = {"表头3","表头3","表头3"},index = 2)
    private int id;

    @ExcelProperty(value = {"表头1","表头4","表头4"},index = 3)
    private
}
