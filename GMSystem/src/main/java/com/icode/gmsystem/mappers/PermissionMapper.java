package com.icode.gmsystem.mappers;

import com.icode.gmsystem.model.Permission;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/23
 * */
public interface PermissionMapper {
    /**
     * 为身份修改模块权限
     * */
    Integer updatePermission(@Param("permission")Permission permission);
    /**
     * 查询权限
     * */
    List<Permission> listPermission(@Param("operator")Integer operator);
}
