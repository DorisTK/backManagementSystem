package com.icode.gmsystem.model;

/**
 * @author 谭红霞
 * @date 2019/6/24
 * */
public class Module {
    /**
     * 模块id
     * */
    Integer id;
    /**
     * 模块名字
     * */
    String name;
    /**
     * 模块等级
     * */
    Integer level;
    /**
     * 属于哪个一级模块
     * */
    Integer belong;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getBelong() {
        return belong;
    }

    public void setBelong(Integer belong) {
        this.belong = belong;
    }
}
