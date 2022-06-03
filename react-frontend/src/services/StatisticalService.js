import axios from "axios";
import {authHeader} from './auth-header';

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
}

const STATISTICAL_API_BASE_URL = '/api/statistical'
class StatisticalService {
    //Get all result
    getAllStatistical() {
        return axios.get(STATISTICAL_API_BASE_URL+'/getAll',{
            headers: {...headers, ...authHeader()},
        })
    }

    getStatisticalByUserId(userId,monthNow,yearNow) {
        return axios.get(STATISTICAL_API_BASE_URL+'/getStatisticalByUserId/'+userId+"/"+monthNow+"/"+yearNow,{
            headers: {...headers, ...authHeader()},
        })
    }

    addStatistical(statistical) {
        return axios.post(STATISTICAL_API_BASE_URL+'/addScore',JSON.stringify(statistical),{
            headers: {
                ...headers,
                ...authHeader()
            }
        })
    }

}

export default new StatisticalService()