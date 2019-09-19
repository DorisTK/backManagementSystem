package com.icode.gmsystem.service;

import com.icode.gmsystem.mappers.OperatorMapper;
import com.icode.gmsystem.model.OperatorType;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OperatorService {
    @Resource
    public OperatorMapper operatorMapper;

    /**
     * 查询身份
     * */
    public List<OperatorType> listOperator(Integer operatorId){
        return operatorMapper.listOperator(operatorId);
    }

    /**
     * 新增角色
     * */
    public Integer insertOperator(OperatorType operator){
        return operatorMapper.insertOperator(operator);
    }

    /**
     * 删除角色
     * */
    public Integer deleteOperator(Integer operatorId){
        return operatorMapper.deleteOperator(operatorId);
    }
}
