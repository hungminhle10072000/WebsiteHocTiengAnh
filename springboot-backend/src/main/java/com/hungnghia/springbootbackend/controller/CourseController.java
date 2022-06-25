package com.hungnghia.springbootbackend.controller;

import com.hungnghia.springbootbackend.dto.CourseDto;
import com.hungnghia.springbootbackend.entities.CourseEntity;
import com.hungnghia.springbootbackend.service.AmazonClient;
import com.hungnghia.springbootbackend.service.CourseService;
import com.hungnghia.springbootbackend.service.ResultService;
import com.sun.istack.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/course")
public class CourseController {
    @Autowired
    private CourseService courseService;


    @PostMapping("/add")
    public CourseDto addCourse(@RequestPart("courseDto") CourseDto courseDto, @RequestPart("file") MultipartFile file) {
        CourseDto course = courseService.addCourse(courseDto,file);
        return course;
    }

    @PutMapping("/update")
    public CourseDto updateCourse(@RequestPart("courseDto") CourseDto courseDto, @RequestPart("file") @Nullable MultipartFile file) {
        CourseDto course = courseService.updateCourse(courseDto,file);
        return course;
    }
    @PutMapping("/update2")
    public CourseDto updateCourse(@RequestPart("courseDto") CourseDto courseDto) {

        CourseDto course = courseService.updateCourse(courseDto,null);
        return course;
    }

    @GetMapping("/getAll")
    public List<CourseDto> getAllCourses() {
        return courseService.getAllCourse();
    }

    @GetMapping("/edit/{id}")
    public CourseDto getCourseById(@PathVariable long id) {
        CourseDto course = courseService.getCourseById(id);
        return course;
    }
    @GetMapping("/getCourseByIdAndUserId/{id}/{userId}")
    public CourseDto getCourseByIdAndUserId(@PathVariable long id, @PathVariable Long userId) {
        CourseDto course = courseService.getCourseByIdAndUserId(id,userId);
        return course;
    }
    @DeleteMapping("/delete/{id}")
    public CourseDto deleteCourse(@PathVariable long id) {
        CourseDto courseDto = courseService.deleteCourse(id);
        return courseDto;
    }
}
