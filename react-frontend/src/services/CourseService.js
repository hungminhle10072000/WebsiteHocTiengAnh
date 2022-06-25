import axios from "axios";
import {authHeader} from './auth-header';

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
}

const COURSE_API_BASE_URL = '/api/course'


class CourseService {

    //Get all course
    getCourses() {
        return axios.get(COURSE_API_BASE_URL+'/getAll',{
            headers: {...headers, ...authHeader()},
        })
    }

    addCourse(course,image) {
        let formData = new FormData()
        const jsonCourse = JSON.stringify(course)
        const blob = new Blob([jsonCourse], {
            type: 'application/json'
        });
        
        formData.append("courseDto",blob)
        formData.append("file",image)

        return axios.post(COURSE_API_BASE_URL+'/add',formData,{
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
                ...authHeader()
            }
        })
    }

    getCourseById(id) {
        return axios.get(COURSE_API_BASE_URL + '/edit/' + id,{
            headers: {...headers, ...authHeader()},
        });
    }
    getCourseByIdAndUserId(id,userId) {
        return axios.get(COURSE_API_BASE_URL + '/getCourseByIdAndUserId/' + id+"/"+userId,{
            headers: {...headers, ...authHeader()},
        });
    }

    deleteCourse(id) {
        return axios.delete(COURSE_API_BASE_URL+'/delete/'+id,{
            headers: {...headers, ...authHeader()},
        });
    }

    updateCourse(course,image) {
        let formData = new FormData()
        const jsonCourse = JSON.stringify(course)
        const blob = new Blob([jsonCourse], {
            type: 'application/json'
        });
        formData.append("courseDto",blob)
        if (image==='') {     
            return axios.put(COURSE_API_BASE_URL+'/update2',formData,{
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                    ...authHeader()
                }
            })
        } else {
            formData.append("file",image)
            return axios.put(COURSE_API_BASE_URL+'/update',formData,{
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                    ...authHeader()
                }
            })
        }
        
    }   

}

export default new CourseService()