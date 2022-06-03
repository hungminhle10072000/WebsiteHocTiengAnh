package com.hungnghia.springbootbackend.controller;

import com.hungnghia.springbootbackend.dto.StatisticalDto;
import com.hungnghia.springbootbackend.dto.StatisticalMasterDto;
import com.hungnghia.springbootbackend.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/statistical")
public class StatisticalController {
  @Autowired
  private StatisticalService statisticalService;

  @PostMapping("/add")
  public StatisticalDto addStatistical(@RequestBody StatisticalDto statisticalDto) {
    return statisticalService.addStatistical(statisticalDto);
  }

  @PostMapping("/addScore")
  public StatisticalDto addScore(@RequestBody StatisticalDto statisticalDto) {
    return statisticalService.addScore(statisticalDto);
  }


  @GetMapping("/getStatisticalByUserId/{userId}/{monthNow}/{yearNow}")
  public StatisticalMasterDto getStatisticalByUserId(@PathVariable Long userId,@PathVariable int monthNow,@PathVariable int yearNow) {
    yearNow -=1900;
    return statisticalService.findStatisticalOfMonthByUserId(userId,monthNow,yearNow);
  }
  @GetMapping("/getStatisticalOfWeekByUserId/{userId}")
  public StatisticalMasterDto getStatisticalOfWeekByUserId(@PathVariable Long userId) {
    return statisticalService.findStatisticalOfWeekByUserId(userId);
  }
}
