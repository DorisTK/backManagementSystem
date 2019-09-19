package com.icode.gmsystem.controller;

import com.icode.gmsystem.model.Module;
import com.icode.gmsystem.service.ModuleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/24
 * */
@RestController
public class ModuleController {
    @Resource
    public ModuleService moduleService;

    /**
     * 查询模块
     * */
    @GetMapping("/listModule")
    public List<Module> listModule(@RequestParam Integer id, @RequestParam String name,
                                   @RequestParam Integer level, @RequestParam Integer belong){
        return moduleService.listModule(id, name, level, belong);
    }
}
