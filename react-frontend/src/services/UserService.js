import axios from "axios";
import {authHeader} from './auth-header'
import {API_BASE} from './env';
const USER_API_END_POINT = "/api/users";
const USER_API_LOGIN = `${API_BASE}/authenticate`
const USER_API_ForgetPassWord = `${API_BASE}/api/users/check-username-email`;

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
}

class UserService {

    ///get all user
    getUsers() {
        return axios.get(USER_API_END_POINT, {
            headers: {...headers, ...authHeader()},
        })
    }

    // add user
    createUser(userDto, file){
        let formData = new FormData();

        const json = JSON.stringify(userDto);
        const blob = new Blob([json], {
            type: 'application/json'
        });

        formData.append("userDto",blob);
        formData.append("file",file);

        return axios.post(USER_API_END_POINT,formData,{
            headers:{...headers, ...authHeader(),'Content-Type': 'multipart/form-data'}
        })
    }

    // update user
    updateUser(userDto, userId, file, checkFile){

        if(checkFile === false){
            return axios.put(USER_API_END_POINT + '/edit2/' + userId, userDto, {
                headers: {
                    ...headers,...authHeader(),
                }
            })
        } else {
            let formData = new FormData();

            const json = JSON.stringify(userDto);
            const blob = new Blob([json], {
                type: 'application/json'
            });
            formData.append("userDto", blob);
            formData.append("file", file);
            return axios.put(USER_API_END_POINT + '/' + userId, formData,{
                headers:{...headers,...authHeader(),'Content-Type': 'multipart/form-data'}
            })
        }
    }
    
    // delete user
    deleteUser(userId){
        return axios.delete(USER_API_END_POINT + '/' + userId,{headers: {...headers,...authHeader()}});
    }

    //get user by id
    getUserById(userId){
        return axios.get(USER_API_END_POINT + '/' + userId,{headers: {...headers, ...authHeader()}});
    }

    // login
    login(username, password){
        let jwtrequest = {
            username: username,
            password: password
        }
        return axios.post(USER_API_LOGIN, jwtrequest);
    }

    ///register
    register(userDto, file) {
        let formData = new FormData();

        const json = JSON.stringify(userDto);
        const blob = new Blob([json], {
            type: 'application/json'
        });

        formData.append("userDto",blob);
        formData.append("file",file);

        return axios.post(`${API_BASE}/register`, formData,{
            headers:{'Content-Type': 'multipart/form-data'}
        })
    }
    
    ///reset password
    forgetPassWord(username, email){
        let missPassWordDto = {
            username: username,
            email: email
        }
        return axios.post(USER_API_ForgetPassWord, missPassWordDto);
    }

    //user update password
    userUpdatePassWord(username, passwordOld, passwordNew){
        let formData = new FormData();
        formData.append('username', username);
        formData.append('passwordOld', passwordOld);
        formData.append('passwordNew', passwordNew);
        return axios.put(USER_API_END_POINT + '/change-passWord', formData, {
            headers:{...headers,...authHeader()}
        })
    }

    // write score
    writeScoreService(totalCorrect, userId){
        return axios.put(`${API_BASE}/api/user-vocabulary/write-score/` + userId + '/' + totalCorrect, {headers: {...headers,...authHeader()}})
    }
    
}

export default new UserService()