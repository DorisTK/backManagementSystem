package com.icode.gmsystem.controller;

import com.icode.gmsystem.model.Passage;
import com.icode.gmsystem.service.PassageService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author 张欣宇
 * @date 2019/6/17
 */

@RestController
@RequestMapping(value = "/passage")
public class PassageController {
    @Resource
    PassageService passageService;

    @RequestMapping(value = "/selectPassage")
    public List<Map<String,Object>>  selectPassage(){
        return passageService.selectPassage();
    }

    @RequestMapping(value = "/selectPassageByColumn")
    public List<Map<String,Object>>  selectPassageByColumn(String column){
        return passageService.selectPassageByColumn(column);
    }

    @GetMapping("/listPassage")
    public List<Map<String,Object>> listPassage(String author, String columnName, String startTime, String endTime, Integer isChecked){
        return passageService.listPassage(author, columnName, startTime, endTime, isChecked);
    }

    @RequestMapping(value = "/selectPassageByUnclear")
    public List<Map<String,Object>> selectPassageByUnclear (String title,String startingTime,String endingTime){
        return passageService.selectPassageByUnclear(title, startingTime, endingTime);
    }

    @RequestMapping(value = "/selectPassageById")
    public Passage selectPassageById(int id){
        return passageService.selectPassageById(id);
    }

    @RequestMapping(value = "/insertPassage")
    public void insertPassage(@RequestBody Passage passage){
        passageService.insertPassage(passage);
    }

    @RequestMapping(value = "/updatePassage")
    public void upDatePassage(@RequestBody Passage passage){
        passageService.updatePassage(passage);
    }

    @RequestMapping(value = "/deletePassage")
    public void deletePassage(int id){
        passageService.deletePassage(id);
    }

    @RequestMapping(value = "/updateIsChecked")
    public void updateIsChecked(@RequestBody Passage passage){
        passageService.updateIsChecked(passage);
    }

    @RequestMapping(value = "/selectPassageByAprove")
    List<Map<String,Object>> selectPassageByAprove (){
        return passageService.selectPassageByAprove();
    }
}
