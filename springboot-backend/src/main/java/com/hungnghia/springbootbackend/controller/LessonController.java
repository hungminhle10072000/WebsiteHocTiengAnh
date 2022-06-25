package com.hungnghia.springbootbackend.controller;

import com.hungnghia.springbootbackend.converter.LessonConverter;
import com.hungnghia.springbootbackend.dto.LessonDto;
import com.hungnghia.springbootbackend.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/lesson")
public class LessonController {
    @Autowired
    private LessonService lessonService;

    @PostMapping("/add")
    public LessonDto addLesson(@RequestPart("lessonDto") LessonDto lessonDto,@RequestPart("video") MultipartFile video) {
        lessonService.updateNumOfPriority(lessonDto);
        LessonDto lesson = lessonService.addLesson(lessonDto,video);
        return lesson;
    }

    @PostMapping("/add2")
    public LessonDto addLesson(@RequestPart("lessonDto") LessonDto lessonDto) {
        lessonService.updateNumOfPriority(lessonDto);
        LessonDto lesson = lessonService.addLesson(lessonDto,null);
        return lesson;
    }

    @PutMapping("/update")
    public LessonDto updateLesson(@RequestPart("lessonDto") LessonDto lessonDto,@RequestPart("video") MultipartFile video) {
        LessonDto lesson = lessonService.updateLesson(lessonDto,video);
        return lesson;
    }

    @PutMapping("/update2")
    public LessonDto updateLesson(@RequestPart("lessonDto") LessonDto lessonDto) {
        LessonDto lesson = lessonService.updateLesson(lessonDto,null);
        return lesson;
    }

    @GetMapping("/getAll")
    public List<LessonDto> getAll() {
        return lessonService.getAllLesson();
    }

    @GetMapping("/getLessonByChapterId/{chapterId}")
    public List<LessonDto> getLessonByChapterId(@PathVariable long chapterId) {
        return lessonService.getLessonByChapterId(chapterId);
    }
    @GetMapping("/getLessonById/{id}")
    public LessonDto getLessonById(@PathVariable long id) {
        return lessonService.getLessonById(id);
    }

    @DeleteMapping("/delete/{id}")
    public LessonDto deleteLesson(@PathVariable long id) {
        return lessonService.deleteLesson(id);
    }

    @GetMapping("/getAllLessonDoneExerciseByUserId/{userId}")
    public List<LessonDto> getAllLessonDoneExerciseByUserId(@PathVariable Long userId) {
        return lessonService.getAllLessonDoneExerciseByUserId(userId);
    }
}
