import axios from "axios";
import {authHeader} from './auth-header';

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
}

const CHAPTER_API_BASE_URL = '/api/chapter'
class ChapterService {
    //Get all chapter
    getChapters() {
        return axios.get(CHAPTER_API_BASE_URL+'/getAll',{
            headers: {...headers, ...authHeader()},
        })
    }
    //
    getChapterByCourseId(courseId) {
        return axios.get(CHAPTER_API_BASE_URL+'/getChapterByCourseId/'+courseId,{
            headers: {...headers, ...authHeader()},
        })
    }

    addChapter(chapter) {
        let formData = new FormData()
        const jsonChapter = JSON.stringify(chapter)
        const blob = new Blob([jsonChapter], {
            type: 'application/json'
        });
        
        formData.append("chapterDto",blob)


        return axios.post(CHAPTER_API_BASE_URL+'/add',formData,{
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
                ...authHeader()
            }
        })
    }

    getChapterById(id) {
        return axios.get(CHAPTER_API_BASE_URL + '/getChapterById/' + id,{
            headers: {...headers, ...authHeader()},
        });
    }

    deleteChapter(id) {
        return axios.delete(CHAPTER_API_BASE_URL+'/delete/'+id,{
            headers: {...headers, ...authHeader()},
        });
    }

    updateChapter(chapter) {
        let formData = new FormData()
        const jsonChapter = JSON.stringify(chapter)
        const blob = new Blob([jsonChapter], {
            type: 'application/json'
        });
        
        formData.append("chapterDto",blob)
        return axios.put(CHAPTER_API_BASE_URL+'/update',formData,{
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
                ...authHeader()
            },
        })
    }

}

export default new ChapterService()