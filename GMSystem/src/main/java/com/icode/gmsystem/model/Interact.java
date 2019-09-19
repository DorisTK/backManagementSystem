package com.icode.gmsystem.model;


import lombok.Data;

/**
 * @author  谭红霞
 * @date 2019/6/19
 * */
@Data
public class Interact {
    private Integer id;
    /** 问题 */
    private String question;
    /** 答案 */
    private String answer;
    /** 提问人ID */
    private Integer spokesman;
    /** 提问人姓名 */
    private String spokesmanName;
    /** 回复人ID */
    private Integer replyman;
    /** 课程ID */
    private Integer classId;
    /** 课程名称 */
    private String className;
}
