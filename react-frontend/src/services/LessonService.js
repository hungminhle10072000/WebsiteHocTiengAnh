import axios from "axios";
import {authHeader} from './auth-header';

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
}
const LESSON_API_BASE_URL = '/api/lesson'
class LessonService {
    //Get all lesson
    getLessons() {
        return axios.get(LESSON_API_BASE_URL+'/getAll',{
            headers: {...headers, ...authHeader()},
        })
    }
    //
    getLessonByCourseId(courseId) {
        return axios.get(LESSON_API_BASE_URL+'/getLessonByCourseId/'+courseId,{
            headers: {...headers, ...authHeader()},
        })
    }

    getLessonByChapterId(chapterId) {
        return axios.get(LESSON_API_BASE_URL+'/getLessonByChapterId/'+chapterId,{
            headers: {...headers, ...authHeader()},
        })
    }


    addLesson(lesson,video) {
        let formData = new FormData()
        const jsonLesson = JSON.stringify(lesson)
        const blob = new Blob([jsonLesson], {
            type: 'application/json'
        });
        formData.append("lessonDto",blob)
        formData.append("video",video)
        if (video !== null && video.size > 0) {
            return axios.post(LESSON_API_BASE_URL+'/add',formData,{
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                    ...authHeader()
                }
            })
        } else {
            return axios.post(LESSON_API_BASE_URL+'/add2',formData,{
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                    ...authHeader()
                }
            })
        }   
    }

    getLessonById(id) {
        return axios.get(LESSON_API_BASE_URL + '/getLessonById/' + id,{
            headers: {...headers, ...authHeader()},
        });
    }

    deleteLesson(id) {
        return axios.delete(LESSON_API_BASE_URL+'/delete/'+id,{
            headers: {...headers, ...authHeader()},
        });
    }

    updateLesson(lesson,video) {
        let formData = new FormData()
        const jsonLesson = JSON.stringify(lesson)
        const blob = new Blob([jsonLesson], {
            type: 'application/json'
        });
        if (video ==='') {
            formData.append("lessonDto",blob)
            formData.append("video",video)
            return axios.put(LESSON_API_BASE_URL+'/update2',formData,{
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                    ...authHeader()
                }
            })
        } else {
            formData.append("lessonDto",blob)
            formData.append("video",video)
    
            return axios.put(LESSON_API_BASE_URL+'/update',formData,{
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                    ...authHeader()
                }
            })
        }
    }

}

export default new LessonService()