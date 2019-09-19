package com.icode.gmsystem.service;

import com.icode.gmsystem.mappers.TotalColumnMapper;
import com.icode.gmsystem.model.TotalColumn;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 谭红霞
 * @date 2019/6/20
 * */
@Service
public class TotalColumnService {
    @Resource
    TotalColumnMapper totalColumnMapper;

    /**
     * 查询所有一级栏目
     * */
    public List<TotalColumn> listFirstColumn(){
        return totalColumnMapper.listFirstColumn();
    }

    /**
     * 新增一级栏目
     * */
    public Integer addFirstColumn(String name){
        return totalColumnMapper.addFirstColumn(name);
    }

    /**
     * 修改一级目录
     * */
    public Integer changeFirstColumn(Integer id, String name){
        return totalColumnMapper.changeFirstColumn(id, name);
    }
    /**
     * 删除一级目录
     * */
    public Integer deleteFirstColumn(Integer id){
        return totalColumnMapper.deleteFirstColumn(id);
    }
}
