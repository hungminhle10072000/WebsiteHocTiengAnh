package com.hungnghia.springbootbackend.service;
import com.hungnghia.springbootbackend.converter.CourseConverter;
import com.hungnghia.springbootbackend.dto.ChapterDto;
import com.hungnghia.springbootbackend.dto.CourseDto;
import com.hungnghia.springbootbackend.dto.LessonDto;
import com.hungnghia.springbootbackend.entities.CourseEntity;
import com.hungnghia.springbootbackend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class CourseService  {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseConverter courseConverter;
    @Autowired
    private AmazonClient amazonClient;
    @Autowired
    private ResultService resultService;

    public CourseDto addCourse(CourseDto course, MultipartFile file) {
        CourseEntity courseEntity = courseConverter.toEntity(course);
        String imageUrl = amazonClient.uploadFile(file);
        courseEntity.setImage(imageUrl);
        CourseEntity courseResult = courseRepository.save(courseEntity);
        return courseConverter.toDto(courseResult);
    }

    public CourseDto updateCourse(CourseDto newCourse,MultipartFile file) {
        CourseEntity newCourseEntity = courseConverter.toEntity(newCourse);
        CourseEntity oldCourseEntity = courseRepository.getById(newCourse.getId());
        if (newCourseEntity.getName() == null) {
            newCourseEntity.setName(oldCourseEntity.getName());
        }
        if (newCourseEntity.getImage() ==null) {
            newCourseEntity.setImage(oldCourseEntity.getImage());
        }
        if (newCourseEntity.getIntroduce() == null) {
            newCourseEntity.setImage(oldCourseEntity.getIntroduce());
        }
        if (newCourseEntity.getChapterEntityList() ==null) {
            newCourseEntity.setChapterEntityList(oldCourseEntity.getChapterEntityList());
        }
        if (newCourseEntity.getUser_course_entityList() ==null) {
            newCourseEntity.setUser_course_entityList(oldCourseEntity.getUser_course_entityList());
        }
        if (file !=null && !file.isEmpty()) {
            String imageUrl = amazonClient.uploadFile(file);
            newCourseEntity.setImage(imageUrl);
        }
        CourseEntity courseResult = courseRepository.save(newCourseEntity);
        return courseConverter.toDto(courseResult);
    }


    public List<CourseDto> getAllCourse() {
        List<CourseEntity> lstCourseEntity = courseRepository.findAll();
        return courseConverter.toListDto(lstCourseEntity);
    }

    public CourseDto getCourseById(long id) {
        CourseEntity courseEntity = courseRepository.getById(id);
        return courseConverter.toDto(courseEntity);
    }
    public CourseDto getCourseByIdAndUserId(long id,Long userId) {
        CourseEntity courseEntity = courseRepository.getById(id);
        CourseDto courseDtos =  courseConverter.toDto(courseEntity);
        List<ChapterDto> chapterDtos = courseDtos.getChapters();
        if (chapterDtos != null && chapterDtos.size() > 0) {
            for (ChapterDto chapter: chapterDtos) {
                List<LessonDto> lessonDtos = chapter.getLessons();
                if (lessonDtos !=null && lessonDtos.size() > 0) {
                    for (LessonDto lessonDto : lessonDtos) {
                        if (lessonDto.getExerciseId() != null && lessonDto.getExerciseId() > 0) {
                            Long exerciseId = lessonDto.getExerciseId();
                            if (exerciseId !=null && exerciseId > 0) {
                                boolean isDoneExercise = resultService.isDoneExercise(userId,exerciseId);
                                lessonDto.setDoneExercise(isDoneExercise);
                            }

                        }
                    }
                }
            }
        }
        return courseDtos;
    }

    public CourseDto deleteCourse(long id) {
        CourseEntity courseEntity = courseRepository.getById(id);
        try {
            courseRepository.delete(courseEntity);
        } catch (Exception ex) {
            return null;
        }
        return courseEntity != null ? courseConverter.toDto(courseEntity): null ;
    }

}
