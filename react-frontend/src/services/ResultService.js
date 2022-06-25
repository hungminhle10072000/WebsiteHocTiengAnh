import axios from "axios";
import {authHeader} from './auth-header';

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
}

const RESULT_API_BASE_URL = '/api/result'
class ResultService {
    //Get all result
    getResults() {
        return axios.get(RESULT_API_BASE_URL+'/getAll',{
            headers: {...headers, ...authHeader()},
        })
    }
    //
    getResultByUserId(userId) {
        return axios.get(RESULT_API_BASE_URL+'/findResultsByUserId/'+userId,{
            headers: {...headers, ...authHeader()},
        })
    }

    getResultByUserIdAndExerciseId(userId, exerciseId) {
        return axios.get(RESULT_API_BASE_URL+'/findResultsByUserIdAndExerciseId/'+userId+"/"+exerciseId,{
            headers: {
                ...headers,
                ...authHeader()
            }
        })
    }

    addResult(result) {
        let formData = new FormData()
        const jsonResult = JSON.stringify(result)
        const blob = new Blob([jsonResult], {
            type: 'application/json'
        });
        
        formData.append("resultDto",blob)
        return axios.post(RESULT_API_BASE_URL+'/add',formData,{
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
                ...authHeader()
            }
        })
    }

}

export default new ResultService()