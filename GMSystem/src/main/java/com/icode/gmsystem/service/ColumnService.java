package com.icode.gmsystem.service;

import com.icode.gmsystem.mappers.ColumnMapper;
import com.icode.gmsystem.model.Column;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 张欣宇
 * @date 2019/6/20
 */
@Service
public class ColumnService {
    @Resource
    private ColumnMapper columnMapper;

    /**
     * 查询所有栏目
     * @return
     */
    public List<Column> selectColumn() {
        return columnMapper.selectColumn();
    }

    /**
     * 新增栏目
     * @param column
     */
    public void insertColumn (Column column){
        columnMapper.insertColumn(column);
    }

    /**
     * 修改栏目
     * @param column
     */
    public void updateColumn (Column column){
        columnMapper.updateColumn(column);
    }

    /**
     * 删除栏目
     * @param id
     */
    public void deleteColumn (int id){
        columnMapper.deleteColumn(id);
    }
}
