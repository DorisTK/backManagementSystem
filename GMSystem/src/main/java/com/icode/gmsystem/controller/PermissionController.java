package com.icode.gmsystem.controller;

import com.icode.gmsystem.model.Permission;
import com.icode.gmsystem.service.PermissionService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/23
 * */
@RestController
public class PermissionController {
    @Resource
    public PermissionService permissionService;

    /**
     * 修改权限
     * */
    @PostMapping("/updatePermission")
    public Integer updatePermission(@RequestBody Permission permission){
        return permissionService.updatePermission(permission);
    }
    /**
     * 查询权限
     * */
    @GetMapping("/listPermission")
    public List<Permission> listPermission(@RequestParam Integer operator){
        return permissionService.listPermissiont(operator);
    }
}
