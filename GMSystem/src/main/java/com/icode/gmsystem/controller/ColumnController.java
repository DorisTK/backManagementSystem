package com.icode.gmsystem.controller;

import com.icode.gmsystem.mappers.ColumnMapper;
import com.icode.gmsystem.model.Column;
import com.icode.gmsystem.service.ColumnService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 张欣宇
 * @date 2019/6/20
 */
@RestController
@RequestMapping(value = "/column")
public class ColumnController {
    @Resource
    private ColumnService columnService;


    /**
     * 查询所有栏目
     * @return
     */
    @RequestMapping(value = "/selectColumn")
    List<Column> selectColumn() {
        return columnService.selectColumn();
    }

    /**
     * 新增栏目
     * @param column
     */
    @RequestMapping(value = "/insertColumn")
    public void insertColumn (@RequestBody Column column){
        columnService.insertColumn(column);
    }

    /**
     * 修改栏目
     * @param column
     */
    @RequestMapping(value = "/updateColumn")
    public void updateColumn (@RequestBody Column column){
        columnService.updateColumn(column);
    }

    /**
     * 删除栏目
     * @param id
     */
    @RequestMapping(value = "/deleteColumn")
    public void deleteColumn (@RequestParam int id){
        columnService.deleteColumn(id);
    }
}
