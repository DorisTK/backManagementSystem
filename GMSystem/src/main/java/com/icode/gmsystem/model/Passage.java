package com.icode.gmsystem.model;

import java.util.Date;

/**
 * @author 张欣宇
 * @date 2019/6/17
 */
public class Passage {
    /**
     * 文章ID
     */
    int id;
    /**
     * 文章标题
     */
    String title;
    /**
     * 文章作者
     */
    String author;
    /**
     * 栏目ID
     */
    int columnId;
    /**
     * 创建日期
     */
    Date createTime;
    /**
     * 是否置顶
     */
    int isTop;
    /**
     * 文章内容
     */
    String content;
    /**
     * 是否审核
     * */
    int isChecked;



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getColumnId() {
        return columnId;
    }

    public void setColumnId(int columnId) {
        this.columnId = columnId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public int getIsTop() {
        return isTop;
    }

    public void setIsTop(int isTop) {
        this.isTop = isTop;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getIsChecked() {
        return isChecked;
    }

    public void setIsChecked(int isChecked) {
        this.isChecked = isChecked;
    }
}
