package com.icode.gmsystem.model;

/**
 * @author 张欣宇
 * @date 2019/6/17
 */
public class Column {
    /**
     * 栏目ID
     */
    int id;
    /**
     * 栏目名称
     */
    String name;

    /**
     * 总栏目
     */
    int total;

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

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
