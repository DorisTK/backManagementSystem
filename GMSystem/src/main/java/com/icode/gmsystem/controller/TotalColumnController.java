package com.icode.gmsystem.controller;

import com.icode.gmsystem.model.TotalColumn;
import com.icode.gmsystem.service.TotalColumnService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/20
 * */
@RestController
public class TotalColumnController {
    @Resource
    TotalColumnService totalColumnService;

    /**
     * 查询所有一级栏目
     * */
    @GetMapping("/listFirstColumn")
    public List<TotalColumn> listFirstColumn(){
        return totalColumnService.listFirstColumn();
    }
    /**
     * 新增一级栏目
     * */
    @PostMapping("/addFirstColumn")
    public Integer addFirstColumn(@RequestParam String name){
        return totalColumnService.addFirstColumn(name);
    }

    /**
     * 修改一级目录
     * */
    @PostMapping("/changeFirstColumn")
    public Integer changeFirstColumn(@RequestParam Integer id, @RequestParam String name){
        return totalColumnService.changeFirstColumn(id,name);
    }

    /**
     * 删除一级目录
     * */
    @DeleteMapping("/deleteFirstColumn")
    public Integer deleteFirstColumn(@RequestParam Integer id){
        return totalColumnService.deleteFirstColumn(id);
    }
}
