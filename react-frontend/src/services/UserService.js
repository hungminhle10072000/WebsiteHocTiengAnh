import axios from "axios";
import {authHeader} from './auth-header'
const USER_API_END_POINT = "/api/users";
<<<<<<< HEAD
const USER_API_LOGIN = "http://backend-product:8080/authenticate";
const USER_API_ForgetPassWord = 'http://backend-product:8080/api/users/check-username-email';
=======
const USER_API_LOGIN = `/authenticate`
const USER_API_ForgetPassWord = `/api/users/check-username-email`;
>>>>>>> master

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

<<<<<<< HEAD
        return axios.post('http://backend-product:8080/register', formData,{
=======
        return axios.post(`/register`, formData,{
>>>>>>> master
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
    
}

export default new UserService()