package com.icode.gmsystem.model;
/**
 * @author 张欣宇
 * @date 2019/6/17
 */
public class Class {
    /**
     * 课程ID
     */
    int id;
    /**
     * 课程名
     */
    String name;
    /**
     * 课程简介
     */
    String introduce;
    /**
     * 课程负责人
     */
    String principal;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getPrincipal() {
        return principal;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }
}
