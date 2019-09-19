package com.icode.gmsystem.controller;

import com.icode.gmsystem.model.User;
import com.icode.gmsystem.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @author 张欣宇
 * @date 2019/6/18
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Resource
    UserService userService;

    @RequestMapping(value = "/selectUser")
    public List<Map<String,Object>> selectUser(@RequestParam Integer id){
        return userService.selectUser(id);
    }

    @RequestMapping(value = "/selectAccount")
    public List<Integer> selectAccount(){
        return userService.selectAccount();
    }

    @RequestMapping(value = "/deleteUser")
    public void deleteUser(int id){
        userService.deleteUser(id);
    }

    @RequestMapping(value = "/insertUser")
    public void insertUser(@RequestBody User user){
        userService.insertUser(user);
    }

    @RequestMapping(value = "/updateUser")
    public void updateUser(@RequestBody  User user){
        userService.updateUser(user);
    }

    @RequestMapping(value = "/selectUerByUnclear")
    public List<Map<String,Object>> selectUerByUnclear (@Param("name") String name, @Param("identity") String identity){
        return userService.selectUerByUnclear(name,identity);
    }
}
