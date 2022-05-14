package com.hungnghia.springbootbackend.service;

import com.hungnghia.springbootbackend.converter.StatisticalConverter;
import com.hungnghia.springbootbackend.dto.StatisticalDto;
import com.hungnghia.springbootbackend.entities.StatisticalEntity;
import com.hungnghia.springbootbackend.entities.Use_Statistical_Key;
import com.hungnghia.springbootbackend.repository.StatisticalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class StatisticalService {
  @Autowired
  private StatisticalRepository statisticalRepository;
  @Autowired
  private StatisticalConverter statisticalConverter;

  public List<StatisticalDto> findStatisticalOfMonthByUserId(long userId) {
    List<StatisticalEntity> statisticalEntitiesOfMonth = new ArrayList<>();
    List<StatisticalEntity> statisticalEntities = statisticalRepository.findStatisticalEntitiesByUserEntity_Id(userId);
    if (statisticalEntities != null && statisticalEntities.size() > 0) {
      for (int i=0 ;i < statisticalEntities.size();i++) {
        if (statisticalEntities.get(i).getUse_statistical_key().getDateCreateId().getMonth() == new Date().getMonth() &&
                statisticalEntities.get(i).getUse_statistical_key().getDateCreateId().getYear() == new Date().getYear()) {
          statisticalEntitiesOfMonth.add(statisticalEntities.get(i));
        }
      }
    }
    List<StatisticalDto> statisticalDtos = new ArrayList<>();
    if (statisticalEntitiesOfMonth.size() > 0) {
      statisticalDtos = statisticalConverter.toListDtos(statisticalEntitiesOfMonth);
    }
    return statisticalDtos;
  }

  public List<StatisticalDto> findStatisticalOfWeekByUserId(long userId) {
    Date refDate = new Date();
    Date[] days = getDaysOfWeek(refDate, Calendar.getInstance().getFirstDayOfWeek());

    List<StatisticalEntity> statisticalEntitiesOfWeek = new ArrayList<>();
    List<StatisticalEntity> statisticalEntities = statisticalRepository.findStatisticalEntitiesByUserEntity_Id(userId);



    if (statisticalEntities != null && statisticalEntities.size() > 0) {
      for (Date day : days) {
        System.out.println(day);
        boolean flag =false;
        int tmpDay = day.getDate();
        int tmpMonth = day.getMonth();
        int tmpYear = day.getYear();
        System.out.println(tmpDay+"-"+tmpMonth+"-"+tmpYear);
        for (int i=0 ;i < statisticalEntities.size();i++) {
          Date dbDate =statisticalEntities.get(i).getUse_statistical_key().getDateCreateId();
          if (dbDate.getDate() == tmpDay &&
              dbDate.getMonth() == tmpMonth &&
              dbDate.getYear() == tmpYear) {
            statisticalEntitiesOfWeek.add(statisticalEntities.get(i));
            flag = true;
          }
        }
        if (flag == false) {
          StatisticalEntity statisticalEntity = new StatisticalEntity();
          Use_Statistical_Key useStatisticalKey= new Use_Statistical_Key();
          useStatisticalKey.setUserId(userId);
          useStatisticalKey.setDateCreateId(day);
          statisticalEntity.setUse_statistical_key(useStatisticalKey);
          statisticalEntity.setScore(0);
          statisticalEntitiesOfWeek.add(statisticalEntity);
        }
      }
    }
    List<StatisticalDto> statisticalDtos = new ArrayList<>();
    if (statisticalEntitiesOfWeek.size() > 0) {
      statisticalDtos = statisticalConverter.toListDtos(statisticalEntitiesOfWeek);
    }
    return statisticalDtos;
  }


  public StatisticalDto addScore(StatisticalDto statisticalDto) {
    StatisticalEntity statisticalRes = null;
    if (statisticalDto.getDateCreateDate() == null) {
      statisticalDto.setDateCreateDate(new Date(System.currentTimeMillis()/(24*60*60*1000)*(24*60*60*1000)));
    }
    StatisticalEntity statisticalEntity = statisticalConverter.toEntity(statisticalDto);
    if (statisticalEntity != null) {
      Use_Statistical_Key statisticalKey = statisticalEntity.getUse_statistical_key();
      Optional<StatisticalEntity> existStatisticalOptional = statisticalRepository.findById(statisticalKey);

      if (existStatisticalOptional.isPresent()) {
        StatisticalEntity existStatistical = existStatisticalOptional.get();
        existStatistical.setScore(existStatistical.getScore()+statisticalDto.getScore());
        statisticalRes = statisticalRepository.save(existStatistical);
      } else {
        statisticalRes = statisticalRepository.save(statisticalEntity);
      }
    }
    return statisticalConverter.toDto(statisticalRes);
  }
  public StatisticalDto addStatistical(StatisticalDto statisticalDto) {
    if (statisticalDto.getDateCreateDate() == null) {
        statisticalDto.setDateCreateDate(new Date(System.currentTimeMillis()/(24*60*60*1000)*(24*60*60*1000)));
    }
    StatisticalEntity statisticalEntity = statisticalConverter.toEntity(statisticalDto);
    StatisticalEntity statisticalRes = statisticalRepository.save(statisticalEntity);
    return statisticalConverter.toDto(statisticalRes);
  }
  private Date getStartOfDay(Date date) {
    Calendar calendar = Calendar.getInstance();
    int year = calendar.get(Calendar.YEAR);
    int month = calendar.get(Calendar.MONTH);
    int day = calendar.get(Calendar.DATE);
    calendar.set(year, month, day, 0, 0, 0);
    return calendar.getTime();
  }
  private Date[] getDaysOfWeek(Date refDate, int firstDayOfWeek) {
    Date newRefDate = new Date(refDate.getTime()-24*60*60*1000);
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(newRefDate);
    calendar.set(Calendar.DAY_OF_WEEK, firstDayOfWeek);
    Date[] daysOfWeek = new Date[7];
    for (int i = 0; i < 7; i++) {
      daysOfWeek[i] = calendar.getTime();
      calendar.add(Calendar.DAY_OF_MONTH, 1);
    }
    return daysOfWeek;
  }

}
