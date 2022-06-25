import axios from "axios";
import {authHeader} from './auth-header';

const QUESTION_API_END_POINT = "/api/question";

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
}

class QuestionService {

    getQuestionByExerciseId(exerciseId) {
        return axios.get(QUESTION_API_END_POINT+'/findQuestionByExerciseId/'+exerciseId,{
            headers: {...headers, ...authHeader()},
        })    
    }

    // get all question of exercise by id
    getAllQuestionById(idExercise) {
        return axios.get(QUESTION_API_END_POINT + '/' + idExercise, {headers: {...headers, ...authHeader()}})
    }

    // delete question with id
    deleteQuestionWitdId(id) {
        return axios.delete(QUESTION_API_END_POINT + '/' + id,{headers: {...headers,...authHeader()}});
    }
    

    // add question read
    addQuestionRead(questionReadDto) {

        let formData = new FormData()

        const json = JSON.stringify(questionReadDto);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("QuestionReadAddDto",blob);

        return axios.post(QUESTION_API_END_POINT,formData,{
            headers:{...headers, ...authHeader(),'Content-Type': 'multipart/form-data'}
        })
    }

    // add question listen 1
    addQuestionListenType1(questionListenAdd, fileImage, fileAudio){
        let formData = new FormData()

        const json = JSON.stringify(questionListenAdd);
        const blob = new Blob([json], {
            type: 'application/json'
        });

        formData.append("QuestionListenAddDto",blob);
        formData.append("fileImage", fileImage);
        formData.append("fileAudio", fileAudio);


        return axios.post(QUESTION_API_END_POINT + '/addQuestionListen',formData,{
            headers:{...headers, ...authHeader(),'Content-Type': 'multipart/form-data'}
        })

    }
    
    // get question witd id
    getQuestionById(id) {
        return axios.get(QUESTION_API_END_POINT + '/getQuestion/' + id, {headers: {...headers, ...authHeader()}});
    }
    
    // update question service
    updateQuestion(id, questionReadUpdateDto){
        
        let formData = new FormData()
        const json = JSON.stringify(questionReadUpdateDto);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append("questionReadUpdateDto",blob);

        return axios.put(QUESTION_API_END_POINT + '/updateQuestion/' + id, formData,{
            headers:{...headers, ...authHeader(),'Content-Type': 'multipart/form-data'}
        })


    }
}

export default new QuestionService()