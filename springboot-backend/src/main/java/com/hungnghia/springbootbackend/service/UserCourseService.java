package com.hungnghia.springbootbackend.service;

import com.hungnghia.springbootbackend.converter.UserConverter;
import com.hungnghia.springbootbackend.converter.UserCourseConverter;
import com.hungnghia.springbootbackend.dto.CourseNewDto;
import com.hungnghia.springbootbackend.dto.UserCourseDto;
import com.hungnghia.springbootbackend.entities.CourseEntity;
import com.hungnghia.springbootbackend.entities.User_Course_Entity;
import com.hungnghia.springbootbackend.entities.VocabularyTopicEntity;
import com.hungnghia.springbootbackend.repository.UserCourseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserCourseService {
    @Autowired
    private UserCourseConverter userCourseConverter;
    @Autowired
    private UserCourseRepository userCourseRepository;

    public UserCourseDto addUserCourse(UserCourseDto userCourseDto) {
        User_Course_Entity userCourseEntity = userCourseConverter.toEntity(userCourseDto);
        User_Course_Entity usercourse = userCourseRepository.save(userCourseEntity);
        return userCourseConverter.toDto(usercourse);
    }

    @PersistenceContext
    private EntityManager entityManager;

    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    public List<CourseNewDto> getNewCourse() {
        ModelMapper modelMapper = new ModelMapper();
        List<CourseEntity> listTemp = entityManager.createQuery("select p from CourseEntity p order by p.id desc",
                CourseEntity.class).setMaxResults(10).getResultList();
        List<CourseNewDto> listCourseNewDto = new ArrayList<>();
        for (int i = 0; i < listTemp.size(); i++) {
            CourseNewDto courseTemp = modelMapper.map(listTemp.get(i), CourseNewDto.class);
            listCourseNewDto.add(courseTemp);
        }
        return listCourseNewDto;
    }
}
