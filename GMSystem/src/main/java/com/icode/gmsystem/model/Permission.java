package com.icode.gmsystem.model;

/**
 * @author 张欣宇
 * @date 2019/6/17
 */
public class Permission {
    /**
     * 权限ID
     */
    int id;
    /**
     * 身份ID
     */
    int operatorId;
    /**
     * 模块
     */
    String modules;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(int operatorId) {
        this.operatorId = operatorId;
    }

    public String getModules() {
        return modules;
    }

    public void setModules(String modules) {
        this.modules = modules;
    }
}
