package com.icode.gmsystem.mappers;

import com.icode.gmsystem.model.Module;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/24
 * */
public interface ModuleMapper {
    /**
     * 查询模块
     * */
    List<Module> listModule(@Param("id")Integer id, @Param("name")String name,
                            @Param("level")Integer level, @Param("belong")Integer belong);
}
