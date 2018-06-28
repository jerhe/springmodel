package com.jerhe.common.util;

import org.apache.poi.hssf.usermodel.*;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 导出model导出excel工具类
 */
public class ObjectExcelView extends AbstractExcelView {
    /**
     * 实现自定义导出类
     * @param model
     * @param workbook
     * @param request
     * @param response
     * @throws Exception
     */
    @Override
    protected void buildExcelDocument(Map<String, Object> model, HSSFWorkbook workbook, HttpServletRequest request, HttpServletResponse response) throws Exception {
        String filename = model.get("varList") == null ? StringUtil.dateStr(new Date(), "yyyyMMddHHmmss") : (String) model.get("filename");
        HSSFSheet sheet;
        HSSFCell cell;
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=" + filename + ".xls");
        sheet = workbook.createSheet("sheet1");
        List<String> titles = (List<String>) model.get("titles");
        HSSFCellStyle headerStyle = workbook.createCellStyle(); // 标题样式
        headerStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        headerStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        HSSFFont headerFont = workbook.createFont(); // 标题字体
        headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        headerFont.setFontHeightInPoints((short) 11);
        headerStyle.setFont(headerFont);
        short width = 20, height = 25 * 20;
        sheet.setDefaultColumnWidth(width);
        for (int i = 0; i < titles.size(); i++) { // 设置标题
            String title = titles.get(i);
            cell = getCell(sheet, 0, i);
            cell.setCellStyle(headerStyle);
            setText(cell, title);
        }
        sheet.getRow(0).setHeight(height);
        HSSFCellStyle contentStyle = workbook.createCellStyle(); // 内容样式
        contentStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        List<Map<String,Object>> varList = (List<Map<String, Object>>) model.get("varList");
        for (int i = 0; i < varList.size(); i++) {
            Map<String,Object> vpd = varList.get(i);
            for (int j = 0; j < titles.size(); j++) {
                String varstr = vpd.get("var" + (j + 1)) != null ? (String) vpd.get("var" + (j + 1)) : "";
                cell = getCell(sheet, i + 1, j);
                cell.setCellStyle(contentStyle);
                setText(cell, varstr);
            }
        }
    }
}
