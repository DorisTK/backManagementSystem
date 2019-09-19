package com.icode.gmsystem.model;

/**
 * @author 张欣宇
 * @date 2019/6/17
 */
public class OperatorType {
    /**
     * 类型ID
     */
    Integer operatorId;
    /**
     * 身份类型名称
     */
    String name;

    public Integer getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(Integer operatorId) {
        this.operatorId = operatorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
