package com.hungnghia.springbootbackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class CourseNewDto {
    private long id;
    private String name;
    private String image;
    private String introduce;
}
