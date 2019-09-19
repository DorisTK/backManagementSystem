package com.icode.gmsystem.mappers;

import com.icode.gmsystem.model.OperatorType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/23
 * */
public interface OperatorMapper {
    /**
     * 查询身份
     * */
    List<OperatorType> listOperator(@Param("operatorId")Integer operatorId);
    /**
     * 新增角色
     * */
    Integer insertOperator(@Param("operator")OperatorType operator);
    /**
     * 删除角色
     * */
    Integer deleteOperator(@Param("operatorId")Integer operatorId);
}
