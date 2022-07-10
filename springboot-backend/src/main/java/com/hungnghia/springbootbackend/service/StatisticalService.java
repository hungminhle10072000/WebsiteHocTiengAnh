package com.hungnghia.springbootbackend.service;

import com.hungnghia.springbootbackend.converter.StatisticalConverter;
import com.hungnghia.springbootbackend.dto.StatisticalDto;
import com.hungnghia.springbootbackend.dto.StatisticalMasterDto;
import com.hungnghia.springbootbackend.entities.StatisticalEntity;
import com.hungnghia.springbootbackend.entities.Use_Statistical_Key;
import com.hungnghia.springbootbackend.entities.UserEntity;
import com.hungnghia.springbootbackend.repository.StatisticalRepository;
import com.hungnghia.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.*;

class SortByTotalScoreOfWeek implements Comparator<StatisticalMasterDto> {

  @Override
  public int compare(StatisticalMasterDto o1, StatisticalMasterDto o2) {
    return o2.getTotalScoreOfWeek() - o1.getTotalScoreOfWeek();
  }
}

@Component
public class StatisticalService {
  @Autowired
  private StatisticalRepository statisticalRepository;
  @Autowired
  private StatisticalConverter statisticalConverter;
  @Autowired
  private UserRepository userRepository;
  int TARGET = 1000;

  public StatisticalMasterDto findStatisticalOfMonthByUserId(long userId, int month, int year) {

    Date dateNow;
    if (month == -1 && year == -1) {
      dateNow = new Date();
    } else {
      dateNow = new Date(year,month-1,1);
    }
    Date[] daysOfMonth = getDaysOfMonth(dateNow,1);
    StatisticalMasterDto statisticalMasterDto = new StatisticalMasterDto();
    List<StatisticalEntity> statisticalEntitiesOfMonth = new ArrayList<>();
    List<StatisticalEntity> statisticalEntities = statisticalRepository.findStatisticalEntitiesByUserEntity_Id(userId);
    UserEntity user = userRepository.getById(userId);
    if (statisticalEntities != null && statisticalEntities.size() > 0) {
      /*for (int i=0 ;i < statisticalEntities.size();i++) {
        if (statisticalEntities.get(i).getUse_statistical_key().getDateCreateId().getMonth() == new Date().getMonth() &&
                statisticalEntities.get(i).getUse_statistical_key().getDateCreateId().getYear() == new Date().getYear()) {
          statisticalEntitiesOfMonth.add(statisticalEntities.get(i));
        }
      }*/
      for (Date day : daysOfMonth) {
        if (day!= null) {
          boolean flag = true;
          for (int i=0 ;i < statisticalEntities.size();i++) {
            if (isSameDay(day,statisticalEntities.get(i).getUse_statistical_key().getDateCreateId())) {
              statisticalEntitiesOfMonth.add(statisticalEntities.get(i));
              flag = false;
            }
          }
          if (flag) {
            StatisticalEntity statisticalEntity = new StatisticalEntity();
            Use_Statistical_Key useStatisticalKey= new Use_Statistical_Key();
            useStatisticalKey.setUserId(userId);
            useStatisticalKey.setDateCreateId(day);
            statisticalEntity.setUse_statistical_key(useStatisticalKey);
            statisticalEntity.setScore(0);
            statisticalEntitiesOfMonth.add(statisticalEntity);
          }
        }
      }
    }
    List<StatisticalDto> statisticalDtos = new ArrayList<>();
    if (statisticalEntitiesOfMonth.size() > 0) {
      statisticalDtos = statisticalConverter.toListDtos(statisticalEntitiesOfMonth);
    }
    // Calculate Streak
    int indexCurr = -1;
    for (int i=0 ;i < statisticalEntities.size();i++) {
      if (isSameDay(statisticalEntities.get(i).getUse_statistical_key().getDateCreateId(),new Date())) {
        int currentScore = statisticalEntities.get(i).getScore();
        statisticalMasterDto.setCurrentScore(currentScore);
        statisticalMasterDto.setProcess((double) currentScore/TARGET);
        statisticalMasterDto.setMonthNow(statisticalEntities.get(i).getUse_statistical_key().getDateCreateId().getMonth()+1);
        statisticalMasterDto.setYearNow(statisticalEntities.get(i).getUse_statistical_key().getDateCreateId().getYear()+1900);
        indexCurr = i;
        break;
      }
    }
    if (indexCurr != -1) {
      for (int i = indexCurr; i >=0; i--) {
        if (statisticalEntities.get(i).getScore() >= TARGET) {
          statisticalMasterDto.setStreak(statisticalMasterDto.getStreak()+1);
        } else {
          break;
        }
      }
    }
    statisticalMasterDto.setStatisticalDtoList(statisticalDtos);
    if (user != null) {
      statisticalMasterDto.setEmail(user.getEmail());
      statisticalMasterDto.setFullname(user.getFullname());
      statisticalMasterDto.setAvatar(user.getAvartar());
    }
    if (month != -1) {
      statisticalMasterDto.setMonthNow(month);
    } else {
      statisticalMasterDto.setMonthNow(new Date().getMonth()+1);
    }

    if (year != -1 ){
      statisticalMasterDto.setYearNow(year +1900);
    } else {
      statisticalMasterDto.setYearNow(new Date().getYear() + 1900);
    }
    return statisticalMasterDto;
  }
  private boolean isSameDay(Date firstDay, Date secondDay) {
    if (getStartOfDay(firstDay).getTime() == getStartOfDay(secondDay).getTime()) {
      return true;
    }
    return false;
  }

  public List<StatisticalMasterDto> findStatisticalOfWeekMaster(long userId, int weekAgo) {
    List<UserEntity> users = userRepository.findAll();
    List<StatisticalMasterDto> statisticalMasterDtos = new ArrayList<>();
    if (users != null && users.size() > 0) {
      for (int i =0 ; i< users.size(); i++) {
        StatisticalMasterDto statisticalMasterDto = findStatisticalOfWeekByUserIdAndDay(users.get(i).getId(),weekAgo);
        if (statisticalMasterDto.getStatisticalDtoList().size() > 0) {
          int totalScoreOfWeek = 0;
          for (int j = 0; j < statisticalMasterDto.getStatisticalDtoList().size(); j++) {
            totalScoreOfWeek += statisticalMasterDto.getStatisticalDtoList().get(j).getScore();
          }
          statisticalMasterDto.setTotalScoreOfWeek(totalScoreOfWeek);
          statisticalMasterDtos.add(statisticalMasterDto);
        }
      }
    }
    Collections.sort(statisticalMasterDtos, new SortByTotalScoreOfWeek());
    int NUM_OF_ELEMENT = 5;
    List<StatisticalMasterDto> subListStatisticalMasterDto =  statisticalMasterDtos.size() > NUM_OF_ELEMENT ? statisticalMasterDtos.subList(0,NUM_OF_ELEMENT) : statisticalMasterDtos;
    boolean flag = false;
    for (int i=0; i< subListStatisticalMasterDto.size(); i ++) {
      if (subListStatisticalMasterDto.get(i).getStatisticalDtoList().get(0).getUserId() == userId) {
        flag = true;
      }
    }
    if (!flag) {
      subListStatisticalMasterDto.set(4,findStatisticalOfWeekByUserIdAndDay(userId,weekAgo));
    }
    return subListStatisticalMasterDto;
  }

  public StatisticalMasterDto findStatisticalOfWeekByUserIdAndDay(long userId, int weekAgo) {
    Date dayAgo = new Date(new Date().getTime() - weekAgo * 7 * 24 * 60 * 60 * 1000);
    Date refDate = dayAgo;
    Date[] days = getDaysOfWeek(refDate, 2);

    List<StatisticalEntity> statisticalEntitiesOfWeek = new ArrayList<>();
    List<StatisticalEntity> statisticalEntities = statisticalRepository.findStatisticalEntitiesByUserEntity_Id(userId);
    UserEntity user = userRepository.findById(userId).get();

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

    StatisticalMasterDto statisticalMasterDto = new StatisticalMasterDto();
    statisticalMasterDto.setStatisticalDtoList(statisticalDtos);
    statisticalMasterDto.setFullname(user.getFullname());
    statisticalMasterDto.setAvatar(user.getAvartar());
    statisticalMasterDto.setUserId(user.getId());
    statisticalMasterDto.setEmail(user.getEmail());
    if (statisticalEntities != null && statisticalEntities.size() > 0) {
      int indexDayCurrent = statisticalEntities.size()-1;
      StatisticalEntity statisticalCurrent = statisticalEntities.get(indexDayCurrent);
      if (statisticalCurrent.getUse_statistical_key().getDateCreateId().getDate() == refDate.getDate() ) {

        statisticalMasterDto.setProcess((double)statisticalCurrent.getScore() / TARGET);
        statisticalMasterDto.setCurrentScore(statisticalCurrent.getScore());
        for (int i = indexDayCurrent; i >=0; i--) {
          if (statisticalEntities.get(i).getScore() >= TARGET) {
            statisticalMasterDto.setStreak(statisticalMasterDto.getStreak()+1);
          } else {
            if (indexDayCurrent != i) {
              break;
            }
          }
        }
      }
    }
    return statisticalMasterDto;
  }


  public StatisticalMasterDto findStatisticalOfWeekByUserId(long userId) {
    Date refDate = new Date();
    Date[] days = getDaysOfWeek(refDate, 2);

    List<StatisticalEntity> statisticalEntitiesOfWeek = new ArrayList<>();
    List<StatisticalEntity> statisticalEntities = statisticalRepository.findStatisticalEntitiesByUserEntity_Id(userId);
    UserEntity user = userRepository.findById(userId).get();


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

    StatisticalMasterDto statisticalMasterDto = new StatisticalMasterDto();
    statisticalMasterDto.setStatisticalDtoList(statisticalDtos);
    statisticalMasterDto.setFullname(user.getFullname());
    if (statisticalEntities != null && statisticalEntities.size() > 0) {
      int indexDayCurrent = statisticalEntities.size()-1;
      StatisticalEntity statisticalCurrent = statisticalEntities.get(indexDayCurrent);
      if (statisticalCurrent.getUse_statistical_key().getDateCreateId().getDate() == refDate.getDate() ) {

        statisticalMasterDto.setProcess((double)statisticalCurrent.getScore() / TARGET);
        statisticalMasterDto.setCurrentScore(statisticalCurrent.getScore());
        for (int i = indexDayCurrent; i >=0; i--) {
          if (statisticalEntities.get(i).getScore() >= TARGET) {
            statisticalMasterDto.setStreak(statisticalMasterDto.getStreak()+1);
          } else {
            break;
          }
        }
      }
    }


    return statisticalMasterDto;
  }


  public StatisticalDto addScore(StatisticalDto statisticalDto) {
    StatisticalEntity statisticalRes = null;
    Date curr = getStartOfDay(new Date());
    if (statisticalDto.getDateCreateDate() == null) {
      statisticalDto.setDateCreateDate(curr);
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
    calendar.setTime(date);
    int year = calendar.get(Calendar.YEAR);
    int month = calendar.get(Calendar.MONTH);
    int day = calendar.get(Calendar.DATE);
    calendar.set(year, month, day, 0, 0, 0);
    return new Date(calendar.getTime().getTime()/1000*1000);
  }

  private Date[] getDaysOfWeek(Date refDate, int firstDayOfWeek) {
    Date newRefDate = new Date(refDate.getTime());
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

  private Date[] getDaysOfMonth(Date refDate, int firstDayOfMonth) {
    Date newRefDate = new Date(refDate.getTime());
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(newRefDate);
    calendar.set(Calendar.DAY_OF_MONTH, firstDayOfMonth);
    Date[] daysOfMonth = new Date[31];
    for (int i = 0; i < 31; i++) {
      if (i > 10 && calendar.getTime().getMonth() != daysOfMonth[5].getMonth()) {
        continue;
      }
      daysOfMonth[i] = calendar.getTime();
      calendar.add(Calendar.DAY_OF_MONTH, 1);
    }
    return daysOfMonth;
  }

}
