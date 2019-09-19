package com.icode.gmsystem.mappers;

import com.icode.gmsystem.model.Interact;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/19
 */
public interface InteractMapper {
    /**
     * 获取所有留言信息（问题与答疑）
     * */
    List<Interact> listInteract(@Param("question")String question, @Param("spokesmanName")String spokesmanName,@Param("className")String className);

    /**
     * 删除留言信息
     * */
    Integer deleteInteract(@Param("id")Integer id);

    /**
     * 回答问题
     * 修改留言信息
     * */
    Integer updateInteract(@Param("answer")String answer, @Param("id")Integer id);

    /**
     * 新增留言
     * */
    Integer insertInteract(@Param("interact")Interact interact);
}
