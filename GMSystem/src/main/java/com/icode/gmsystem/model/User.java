package com.icode.gmsystem.model;

/**
 * @author 张欣宇
 * @date 2019/6/17
 */
public class User {
    /**
     * 用户ID
     */
    int id;
    /**
     * 用户姓名
     */
    String name;
    /**
     * 账号
     */
    String account;
    /**
     * 密码
     */
    String password;

    /**
     * 用户类型
     */
    int operatorType;
    /**
     * 邮箱
     */
    String email;

    /**
     * 性别
     */
    String sex;

    /**
     * 头像
     */
    String headPhoto;

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

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getOperatorType() {
        return operatorType;
    }

    public void setOperatorType(int operatorType) {
        this.operatorType = operatorType;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getHeadPhoto() {
        return headPhoto;
    }

    public void setHeadPhoto(String headPhoto) {
        this.headPhoto = headPhoto;
    }
}
