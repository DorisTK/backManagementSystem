package com.icode.gmsystem.mappers;

import com.icode.gmsystem.model.TotalColumn;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/20
 * */
public interface TotalColumnMapper {
    /**
     * 查询所有一级栏目
     * */
    List<TotalColumn> listFirstColumn();
    /**
     * 新增一级栏目
     * */
    Integer addFirstColumn(@Param("name")String name);
    /**
     * 修改一级目录
     * */
    Integer changeFirstColumn(@Param("id")Integer id, @Param("name")String name);
    /**
     * 删除一级目录
     * */
    Integer deleteFirstColumn(@Param("id")Integer id);
}
