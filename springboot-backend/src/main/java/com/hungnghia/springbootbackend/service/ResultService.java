package com.hungnghia.springbootbackend.service;

import com.hungnghia.springbootbackend.converter.ResultConverter;
import com.hungnghia.springbootbackend.dto.ResultDto;
import com.hungnghia.springbootbackend.entities.ResultEntity;
import com.hungnghia.springbootbackend.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.xml.transform.Result;
import java.util.List;

@Component
public class ResultService {
    @Autowired
    private ResultRepository resultRepository;
    @Autowired
    private ResultConverter resultConverter;
    public ResultDto addResult(ResultDto resultDto) {
        ResultEntity resultEntity = resultConverter.toEntity(resultDto);
        List<ResultEntity> lstResultOld = resultRepository.findResultEntitiesByUserEntity_IdAndExerciseEntity_Id(resultDto.getUserId(),resultDto.getExerciseId());
        if (lstResultOld !=null) {
            if (lstResultOld.size() > 0) {
                ResultEntity resultOld = lstResultOld.get(0);
                if (resultOld != null) {
                    resultEntity.setId(resultOld.getId());
                }
            }
        }
        ResultEntity result = resultRepository.save(resultEntity);
        return resultConverter.toDto(result);
    }
    public List<ResultDto> findResultsByUserId(Long userId) {
        List<ResultEntity> resultEntities = resultRepository.findResultEntitiesByUserEntity_Id(userId);
        return resultConverter.toListDtos(resultEntities);
    }
    public List<ResultDto> findResultsByUserIdAndExerciseId(Long userId,Long exerciseId) {
        List<ResultEntity> resultEntities = resultRepository.findResultEntitiesByUserEntity_IdAndExerciseEntity_Id(userId, exerciseId);
        return resultConverter.toListDtos(resultEntities);
    }
    public boolean isDoneExercise(Long userId, Long exerciseId) {
        List<ResultDto> resultDtos = findResultsByUserIdAndExerciseId(userId,exerciseId);
        if (resultDtos == null) {
            return  false;
        }
        if (resultDtos.size() < 1) {
            return false;
        } else {
            for(ResultDto item : resultDtos) {
                if (item.getTotalRight() > item.getTotalWrong()) {
                    return  true;
                }
            }
        }
        return false;
    }
}
