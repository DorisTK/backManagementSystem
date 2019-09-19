package com.icode.gmsystem.controller;

import com.icode.gmsystem.model.Interact;
import com.icode.gmsystem.service.InteractService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.awt.event.ContainerAdapter;
import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/19
 * */
@RestController
public class InteractController {
    @Resource
    InteractService interactService;

    /**
     * 查询留言（问题与答疑）
     * */
    @GetMapping("/listInteract")
    public List<Interact> listInteract(@RequestParam("question") String question, @RequestParam("spokesmanName") String spokesmanName,
                                       @RequestParam("className") String className){
        return interactService.listInteractService(question, spokesmanName, className);
    }

    /**
     * 删除留言
     * */
    @DeleteMapping("/deleteInteract")
    public Integer deleteInteract(Integer id){
        return interactService.deleteInteract(id);
    }

    /**
     * 回答问题
     * 修改留言信息
     * */
    @PostMapping("/updateInteract")
    public Integer updateInteract(@RequestParam("answer")String answer, @RequestParam("id")Integer id){
        return interactService.updateInteract(answer, id);
    }

    /**
     * 新增留言
     * */
    @PostMapping("/insertInteract")
    public Integer insertInteract(@RequestBody Interact interact){
        return interactService.insertInteract(interact);
    }
}
