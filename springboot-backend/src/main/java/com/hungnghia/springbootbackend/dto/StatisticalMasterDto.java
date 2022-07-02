package com.hungnghia.springbootbackend.dto;

import java.util.List;

public class StatisticalMasterDto {
  private List<StatisticalDto> statisticalDtoList;
  private String fullname;
  private double process;
  private int streak;
  private int currentScore;
  private int monthNow;
  private int yearNow;
  private String email;
  private int totalScoreOfWeek;
  private String avatar;
  private long userId;

  public long getUserId() {
    return userId;
  }

  public void setUserId(long userId) {
    this.userId = userId;
  }

  public String getAvatar() {
    return avatar;
  }

  public void setAvatar(String avatar) {
    this.avatar = avatar;
  }

  public int getTotalScoreOfWeek() {
    return totalScoreOfWeek;
  }

  public void setTotalScoreOfWeek(int totalScoreOfWeek) {
    this.totalScoreOfWeek = totalScoreOfWeek;
  }

  public StatisticalMasterDto() {
    this.process = 0.0;
    this.streak = 0;
    this.currentScore = 0;
  }

  public List<StatisticalDto> getStatisticalDtoList() {
    return statisticalDtoList;
  }

  public void setStatisticalDtoList(List<StatisticalDto> statisticalDtoList) {
    this.statisticalDtoList = statisticalDtoList;
  }

  public String getFullname() {
    return fullname;
  }

  public void setFullname(String fullname) {
    this.fullname = fullname;
  }

  public double getProcess() {
    return process;
  }

  public void setProcess(double process) {
    if (process > 1) {
      this.process =1;
    } else {
      this.process = process;
    }

  }

  public int getStreak() {
    return streak;
  }

  public void setStreak(int streak) {
    this.streak = streak;
  }

  public int getCurrentScore() {
    return currentScore;
  }

  public void setCurrentScore(int currentScore) {
    this.currentScore = currentScore;
  }

  public int getMonthNow() {
    return monthNow;
  }

  public void setMonthNow(int monthNow) {
    this.monthNow = monthNow;
  }

  public int getYearNow() {
    return yearNow;
  }

  public void setYearNow(int yearNow) {
    this.yearNow = yearNow;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
