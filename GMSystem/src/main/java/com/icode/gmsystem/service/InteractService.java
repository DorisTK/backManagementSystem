package com.icode.gmsystem.service;

import com.icode.gmsystem.mappers.InteractMapper;
import com.icode.gmsystem.model.Interact;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/19
 */
@Service
public class InteractService {
    @Resource
    InteractMapper interactMapper;

    /**
     * 查询留言信息（问题与答疑）
     * */
    public List<Interact> listInteractService(String question, String spokesmanName, String className){
        return interactMapper.listInteract(question, spokesmanName, className);
    }

    /**
     * 删除留言信息
     * */
    public Integer deleteInteract(Integer id){
        return interactMapper.deleteInteract(id);
    }

    /**
     * 回答问题
     * 修改留言信息
     * */
    public Integer updateInteract(String answer, Integer id){
        return interactMapper.updateInteract(answer, id);
    }

    /**
     * 新增留言信息
     * */
    public Integer insertInteract(Interact interact){
        return interactMapper.insertInteract(interact);
    }
}
