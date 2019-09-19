package com.icode.gmsystem.service;

import com.icode.gmsystem.mappers.ModuleMapper;
import com.icode.gmsystem.model.Module;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/24
 * */
@Service
public class ModuleService {
    @Resource
    public ModuleMapper moduleMapper;
    /**
     * 查询模块
     * */
    public List<Module> listModule(Integer id, String name, Integer level, Integer belong){
        return moduleMapper.listModule(id, name, level, belong);
    }
}
