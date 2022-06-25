package com.hungnghia.springbootbackend.service;

import com.hungnghia.springbootbackend.converter.LessonConverter;
import com.hungnghia.springbootbackend.dto.ChapterDto;
import com.hungnghia.springbootbackend.dto.LessonDto;
import com.hungnghia.springbootbackend.entities.ChapterEntity;
import com.hungnghia.springbootbackend.entities.LessonEntity;
import com.hungnghia.springbootbackend.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class LessonService {
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private LessonConverter lessonConverter;
    @Autowired
    private AmazonClient amazonClient;
    @Autowired
    private ResultService resultService;

    public void updateNumOfPriority(LessonDto lessonCurrent) {
        List<LessonEntity> lessonEntities = lessonRepository.getLessonEntitiesByNumPriorityGreaterThanEqualAndChapterEntity_Id(lessonCurrent.getNumPriority(),lessonCurrent.getChapterId());
        for (LessonEntity item : lessonEntities) {
            item.setNumPriority(item.getNumPriority()+1);
            lessonRepository.save(item);
        }
    }
    public void updateNumOfPriority(int indexX, int indexY, Long chapterId) {
        if (indexX - indexY < 0) {
            // Update Down
            List<LessonEntity> lessonEntities = lessonRepository.getLessonEntitiesByNumPriorityBetweenAndChapterEntity_Id(indexX,indexY-1,chapterId);
            for (LessonEntity item : lessonEntities) {
                item.setNumPriority(item.getNumPriority()+1);
                lessonRepository.save(item);
            }
        } else {
            List<LessonEntity> lessonEntities = lessonRepository.getLessonEntitiesByNumPriorityBetweenAndChapterEntity_Id(indexY+1,indexX,chapterId);
            for (LessonEntity item : lessonEntities) {
                item.setNumPriority(item.getNumPriority() - 1);
                lessonRepository.save(item);
            }
        }
    }

    public LessonDto addLesson(LessonDto lessonDto, MultipartFile video) {
        String videoUrl;
        LessonEntity lessonEntity = lessonConverter.toEntity(lessonDto);
        if (video != null) {
            videoUrl  = amazonClient.uploadFile(video); //
        } else {
            videoUrl = lessonDto.getVideo();
        }
        lessonEntity.setVideo(videoUrl);
        LessonEntity lessonResult = lessonRepository.save(lessonEntity);
        return lessonConverter.toDto(lessonResult);
    }
    public LessonDto updateLesson(LessonDto lessonDto,MultipartFile video) {
        LessonEntity newLessonEntity = lessonConverter.toEntity(lessonDto);
        LessonEntity oldLessonEntity = lessonRepository.getById(lessonDto.getId());

        if (newLessonEntity.getName() == null) {
            newLessonEntity.setName(oldLessonEntity.getName());
        }

        if (newLessonEntity.getNumPriority() != oldLessonEntity.getNumPriority()) {
            updateNumOfPriority(newLessonEntity.getNumPriority(), oldLessonEntity.getNumPriority(), lessonDto.getChapterId());
        }
        if (newLessonEntity.getChapterEntity()==null) {
            newLessonEntity.setChapterEntity(oldLessonEntity.getChapterEntity());
        }
        if (newLessonEntity.getCommentEntityList() ==null) {
            newLessonEntity.setCommentEntityList(oldLessonEntity.getCommentEntityList());
        }
        if (newLessonEntity.getQuestionEntityList() == null) {
            newLessonEntity.setQuestionEntityList(oldLessonEntity.getQuestionEntityList());
        }
        if (newLessonEntity.getVideo().isEmpty()) {
            newLessonEntity.setVideo(oldLessonEntity.getVideo());
        }
        if (video!=null&&!video.isEmpty()) {
            String videoUrl = amazonClient.uploadFile(video); //
            newLessonEntity.setVideo(videoUrl);
        }
//        if (newLessonEntity.getGrammarEntity() != null &&  oldLessonEntity.getGrammarEntity() != null
//        && newLessonEntity.getGrammarEntity().getId() != oldLessonEntity.getGrammarEntity().getId()) {
//            newLessonEntity.setGrammarEntity(oldLessonEntity.getGrammarEntity());
//        }
//
//        if (newLessonEntity.getExerciseEntity() != null &&  oldLessonEntity.getExerciseEntity() != null
//                && newLessonEntity.getExerciseEntity().getId() != oldLessonEntity.getExerciseEntity().getId()) {
//            newLessonEntity.setExerciseEntity(oldLessonEntity.getExerciseEntity());
//        }
//
//        if (newLessonEntity.getVocabularyTopicEntity() != null &&  oldLessonEntity.getVocabularyTopicEntity() != null
//                && newLessonEntity.getVocabularyTopicEntity().getId() != oldLessonEntity.getVocabularyTopicEntity().getId()) {
//            newLessonEntity.setVocabularyTopicEntity(oldLessonEntity.getVocabularyTopicEntity());
//        }
        LessonEntity lesson =lessonRepository.save(newLessonEntity);
        return lessonConverter.toDto(lesson);
    }

    public List<LessonDto> getAllLesson() {
        List<LessonEntity> lessonEntities = lessonRepository.findAll();
        return lessonConverter.toListDtos(lessonEntities);
    }
    public List<LessonDto> getLessonByChapterId(long chapterId) {
        List<LessonEntity> lessonEntities = lessonRepository.getLessonEntitiesByChapterEntity_Id(chapterId);
        return lessonConverter.toListDtos(lessonEntities);
    }

    public LessonDto getLessonById(long id) {
        LessonEntity lessonEntity = lessonRepository.getById(id);
        return lessonConverter.toDto(lessonEntity);
    }

    public LessonDto deleteLesson(long id) {
        try {
            LessonEntity lesson = lessonRepository.getById(id);
            lessonRepository.deleteById(id);
            return lessonConverter.toDto(lesson);
        } catch (Exception ex) {
            return null;
        }
    }
    public List<LessonDto> getAllLessonDoneExerciseByUserId(Long userId) {
        List<LessonDto> lessonDtosDoneExercise = new ArrayList<>();
        List<LessonDto> lessonDtos = getAllLesson();
        if (lessonDtos != null && lessonDtos.size() > 0) {
            for (int i=0; i < lessonDtos.size(); i++) {
                Long exerciseId = lessonDtos.get(i).getExerciseId();
                if ( exerciseId!= null && exerciseId > 0) {
                    if (resultService.isDoneExercise(userId, exerciseId)) {
                        lessonDtosDoneExercise.add(lessonDtos.get(i));
                    }
                }
            }
        }
        return lessonDtosDoneExercise;
    }
}
