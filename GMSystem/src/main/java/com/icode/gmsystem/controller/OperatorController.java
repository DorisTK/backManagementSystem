package com.icode.gmsystem.controller;

import com.icode.gmsystem.model.OperatorType;
import com.icode.gmsystem.service.OperatorService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.Console;
import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/24
 * */
@RestController
public class OperatorController {
    @Resource
    public OperatorService operatorService;

    /**
     * 查询身份
     * */
    @GetMapping("/listOperator")
    public List<OperatorType> listOperator(@RequestParam Integer operatorId){
        return operatorService.listOperator(operatorId);
    }

    /**
     * 新增角色
     * */
    @PostMapping("/insertOperator")
    public Integer insertOperator(@RequestBody OperatorType operator){
        return operatorService.insertOperator(operator);
    }

    /**
     * 删除角色
     * */
    @DeleteMapping("/deleteOperator")
    public Integer deleteOperator(@RequestParam Integer operatorId){
        return operatorService.deleteOperator(operatorId);
    }
}
