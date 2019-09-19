package com.icode.gmsystem.service;

import com.icode.gmsystem.mappers.PermissionMapper;
import com.icode.gmsystem.model.Permission;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/23
 * */
@Service
public class PermissionService {
    @Resource
    public PermissionMapper permissionMapper;

    /**
     * 为身份新增权限
     * */
    public Integer updatePermission(Permission permission){
        return permissionMapper.updatePermission(permission);
    }
    /**
     * 查询权限
     * */
    public List<Permission> listPermissiont(Integer operator){
        return permissionMapper.listPermission(operator);
    }
}
