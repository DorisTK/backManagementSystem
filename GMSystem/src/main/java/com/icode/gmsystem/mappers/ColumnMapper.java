package com.icode.gmsystem.mappers;

import com.icode.gmsystem.model.Column;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author 张欣宇
 * @date 2019/6/20
 */
public interface ColumnMapper {
    /**
     * 查询所有栏目
     * @return
     */
    List<Column> selectColumn();

    /**
     * 新增一个栏目
     * @param column
     */
    void insertColumn(@Param("column") Column column);

    /**
     * 更新栏目
     * @param column
     */
    void updateColumn(@Param("column") Column column);

    /**
     * 删除栏目
     * @param id
     */
    void deleteColumn(@Param("id") int id);

}
