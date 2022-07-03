package com.hungnghia.springbootbackend.service;

import com.hungnghia.springbootbackend.converter.ResultConverter;
import com.hungnghia.springbootbackend.converter.ResultDetailConverter;
import com.hungnghia.springbootbackend.dto.ResultDetailDto;
import com.hungnghia.springbootbackend.dto.ResultDto;
import com.hungnghia.springbootbackend.dto.StatisticalDto;
import com.hungnghia.springbootbackend.entities.ResultDetailEntity;
import com.hungnghia.springbootbackend.entities.ResultEntity;
import com.hungnghia.springbootbackend.repository.ResultDetailRepository;
import com.hungnghia.springbootbackend.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultDetailService {
    @Autowired
    private ResultDetailConverter resultDetailConverter;
    @Autowired
    private ResultDetailRepository resultDetailRepository;
    @Autowired
    private ResultRepository resultRepository;
    @Autowired
    private StatisticalService statisticalService;
    @Autowired
    private ResultConverter resultConverter;

    public boolean addAnswers(List<ResultDetailDto> answers) {
        StatisticalDto statisticalDto = new StatisticalDto();
        int numCorrect = 0;
        int numWrong =0;
        Long userId = null;
        Long exerciseId = null;
        if (answers != null) {
            for (ResultDetailDto resultDetailDto : answers) {
                if (resultDetailDto != null) {

                    ResultDetailEntity resultDetailEntity = resultDetailConverter.toEntity(resultDetailDto);

                    if (resultDetailEntity.getUser_answer().equals(resultDetailEntity.getCorrect_answer())) {
                        numCorrect ++;
                    } else {
                        numWrong ++;
                    }

                    userId=resultDetailEntity.getUserEntity().getId();
                    exerciseId = resultDetailEntity.getQuestionEntity().getExerciseEntity().getId();
                    resultDetailRepository.save(resultDetailEntity);
                }
            }
            if (userId !=null && exerciseId !=null) {
                List<ResultEntity> results = resultRepository.findResultEntitiesByUserEntity_IdAndExerciseEntity_Id(userId,exerciseId);
                if (results != null && results.size() > 0 ) {
                    ResultEntity result = results.get(0);
                    if (result != null) {
                        result.setTotal_right(numCorrect);
                        result.setTotal_wrong(numWrong);
                        resultRepository.save(result);
                    }
                } else {
                    ResultDto resultDto = new ResultDto();
                    resultDto.setUserId(userId);
                    resultDto.setExerciseId(exerciseId);
                    resultDto.setTotalRight(numCorrect);
                    resultDto.setTotalWrong(numWrong);
                    ResultEntity result = resultConverter.toEntity(resultDto);
                    resultRepository.save(result);
                }
            }
            if (userId != null && userId > 1) {
                statisticalDto.setUserId(userId);
                statisticalDto.setScore(numCorrect*10);
                statisticalService.addScore(statisticalDto);
            }
        }
        return true;
    }
    public List<ResultDetailDto> findResultDetailEntitiesByUserEntity_IdAndQuestionEntity_ExerciseEntity_Id(Long userId, Long exerciseId) {
        List<ResultDetailEntity> resultDetailEntities = resultDetailRepository.findResultDetailEntitiesByUserEntity_IdAndQuestionEntity_ExerciseEntity_Id(userId,exerciseId);
        List<ResultDetailDto> resultDetailDtos = resultDetailConverter.toListDtos(resultDetailEntities);
        return  resultDetailDtos;
    }
}
