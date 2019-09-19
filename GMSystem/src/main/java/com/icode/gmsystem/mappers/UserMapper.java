package com.icode.gmsystem.mappers;

import com.icode.gmsystem.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author 张欣宇
 * @date 2019/6/18
 */
public interface UserMapper {
    /**
     * 查询所有账号
     * @return
     */
    List<Integer> selectAccount();

    /**
     * 查询用户信息
     * @return
     */
    List<Map<String,Object>> selectUser(@Param("id") Integer id);

    /**
     * 删除账号
     * @param id
     */
    void deleteUser(int id);

    /**
     * 增加一个账号
     * @param user
     */
    void insertUser(@Param("user") User user);

    /**
     * 修改一个账号的属性
     * @param user
     */
    void updateUser(@Param("user") User user);


    List<Map<String,Object>> selectUerByUnclear(@Param("name") String name, @Param("operatorType") String operatorType);
}
