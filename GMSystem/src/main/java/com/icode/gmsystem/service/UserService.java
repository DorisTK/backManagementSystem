package com.icode.gmsystem.service;

import com.icode.gmsystem.mappers.UserMapper;
import com.icode.gmsystem.model.User;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @author 张欣宇
 * @date 2019/6/18
 */
@Service
public class UserService {
    @Resource
    private UserMapper userMapper;

    public List<Map<String,Object>> selectUser(Integer id){
        return userMapper.selectUser(id);
    }

    public List<Integer> selectAccount(){
        return userMapper.selectAccount();
    }

    public void deleteUser(int id){
       userMapper.deleteUser(id);
    }

    public void insertUser(User user){
        userMapper.insertUser(user);
    }

    public void updateUser(User user){
        userMapper.updateUser(user);
    }

    public List<Map<String,Object>> selectUerByUnclear (String name,String idenity){
        return userMapper.selectUerByUnclear(name,idenity);
    }
}
