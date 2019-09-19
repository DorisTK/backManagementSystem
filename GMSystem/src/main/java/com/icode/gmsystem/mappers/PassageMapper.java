package com.icode.gmsystem.mappers;

import com.icode.gmsystem.model.Passage;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author 张欣宇
 * @date 2019/6/17
 */
public interface PassageMapper {
    /**
     * 获取文章所有信息
     * @return
     */
    List<Map<String,Object>> selectPassage();

    /**
     * 根据栏目查找文章
     * @param column
     * @return
     */
    List<Map<String,Object>> selectPassageByColumn(String column);

    /**
     * 模糊查询
     * @param title
     * @param startingTime
     * @param endingTime
     * @return
     */
    List<Map<String,Object>> selectPassageByUnclear (@Param("title") String title, @Param("startingTime") String startingTime, @Param("endingTime") String endingTime);

    /**
     * 获取所有文章（other）
     * */
    List<Map<String,Object>> listPassage(@Param("author")String author, @Param("columnName")String columnName,
                                         @Param("startTime")String startTime, @Param("endTime")String endTime,
                                         @Param("isChecked")Integer isChecked);
    /**
     * 根据ID返回一篇文章
     * @param id
     * @return
     */
    Passage selectPassageById(int id);

    /**
     * 增加一条文章
     * @param passage
     */
    void insertPassage(@Param("passage")Passage passage);

    /**
     * 更新数据
     * @param passage
     */
    void updatePassage(@Param("passage")Passage passage);

    /**
     * 删除数据
     * @param id
     */
    void deletePassage(int id);

    /**
     * 修改文章状态
     * @param passage
     */
    void updateIsChecked(@Param("passage") Passage passage);

    /**
     * 获取已经审核的文章
     * @return
     */
    List<Map<String,Object>> selectPassageByAprove ();

}
