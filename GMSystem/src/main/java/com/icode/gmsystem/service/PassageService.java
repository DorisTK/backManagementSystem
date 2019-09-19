package com.icode.gmsystem.service;

import com.icode.gmsystem.mappers.PassageMapper;
import com.icode.gmsystem.model.Passage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author 张欣宇
 * @date 2019/6/17
 */

@Service
public class PassageService {
    @Resource
    private PassageMapper passageMapper;

    public List<Map<String,Object>>  selectPassage(){
        return passageMapper.selectPassage();
    }

    public List<Map<String,Object>>  selectPassageByColumn(String columnId){
        return passageMapper.selectPassageByColumn(columnId);
    }

    public List<Map<String,Object>> listPassage(String author, String columnName, String startTime, String endTime, Integer isChecked){
        return passageMapper.listPassage(author, columnName, startTime, endTime, isChecked);
    }

    public List<Map<String,Object>> selectPassageByUnclear (String title,String startingTime,String endingTime){
        return passageMapper.selectPassageByUnclear(title, startingTime, endingTime);
    };

    public Passage selectPassageById(int id){
        return passageMapper.selectPassageById(id);
    }

    public void insertPassage(Passage passage){
        passageMapper.insertPassage(passage);
    }

    public void updatePassage(Passage passage){
        passageMapper.updatePassage(passage);
    }

    public void deletePassage(int id){
        passageMapper.deletePassage(id);
    }

    public void updateIsChecked(Passage passage){
        passageMapper.updateIsChecked(passage);
    }

    public List<Map<String,Object>> selectPassageByAprove (){
        return passageMapper.selectPassageByAprove();
    }
}
