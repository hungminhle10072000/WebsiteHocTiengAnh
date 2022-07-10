import * as Types from '../constants/ActionTypes'
import UserService from '../services/UserService'
import adminAlertInfoAction from './admin-alert-infoAction'
import openFormSendMail from './openFormSendMail'
import userItemLoadingAction from './userItemLoadingAction'
import statusButtonLoadingAction from './statusButtonLoadingAction'

// get all users
const actFetchUsersRequest = () => {
    return(dispatch) => {
        return (
            UserService.getUsers().then((res) => {
                dispatch(actFetchUsers(res.data))
                dispatch(userItemLoadingAction.closeItemLoading())
            }).catch(
                error => {
                    dispatch(userItemLoadingAction.closeItemLoading())
                    dispatch(adminAlertInfoAction.changeAdminAlertOn("Tác vụ thất bại!!!","danger"))
                }
            )
        )
    }
}

const actFetchUsers = (users) => {
    return {
        type: Types.FETCH_USERS,
        users
    }
}

///register user
const actRegisterRequest = (userDto, file) => {
    return dispatch => {
        return (
            UserService.register(userDto,file).then(
                (res) => 
                {
                    dispatch(userItemLoadingAction.closeItemLoading())
                    dispatch(actRegisterSuccess())
                }
            ).catch(      
                error => {
                    dispatch(userItemLoadingAction.closeItemLoading())    
                    if(error.response.status === 409){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Tên đăng nhập đã tồn tại ! \n Yêu cầu đổi tên đăng nhập khác.", "danger"))           
                    }
                    if(error.response.status === 400){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Email đã có tài khoản đăng ký ! Yêu cầu sử dụng email khác", "danger"))           
                    }            
                }        
            )
        )
    }
     
}

const actRegisterSuccess = () => {
    return {
        type: Types.REGISTER_USER_SUCCESS
    }
}

// user update password request
const actUserUpdatePassWordRequest = (username, passwordOld, passwordNew) => {
    return(dispatch) => {
        return(
            UserService.userUpdatePassWord(username, passwordOld, passwordNew)
            .then(
                (res) => 
                {
                    dispatch(userItemLoadingAction.closeItemLoading())
                    dispatch(statusButtonLoadingAction.closeButtonLoading())
                    dispatch(adminAlertInfoAction.changeAdminAlertOn("Cập nhật mật khẩu thành công", "success"))    
                    dispatch(actUserUpdatePassword(res.data)) 
                }
            ).catch(       
                error => {
                    dispatch(statusButtonLoadingAction.closeButtonLoading())
                    dispatch(userItemLoadingAction.closeItemLoading())
                    if(error.response.status === 409){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Cập nhật mật khẩu thất bại", "danger"))           
                    }
                    if(error.response.status === 400){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Mật khẩu cũ không chính xác !!!!", "danger"))           
                    }            
                }        
            )
        )
    }
}

const actUserUpdatePassword = (passwordNew) => {
    return {
        type: Types.USER_UPDATE_PASSWORD,
        passwordNew
    }
}

// add user
const actAddUserRequest = (userDto,file) => {
    return(dispatch) => {
        return(
            UserService.createUser(userDto,file).then((res) => {
                dispatch(actAddUser(res.data))
                dispatch(adminAlertInfoAction.changeAdminAlertOn("Thêm thành công!!!", "success"))
                window.history.back();
                dispatch(statusButtonLoadingAction.closeButtonLoading())
            })
            .catch(
                error => {
                    dispatch(statusButtonLoadingAction.closeButtonLoading())
                    if(error.response.status === 409){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Tên đăng nhập đã tồn tại ! \n Yêu cầu đổi tên đăng nhập khác.", "danger"))           
                    }
                    if(error.response.status === 400){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Email đã có tài khoản đăng ký ! Yêu cầu sử dụng email khác", "danger"))           
                    }            
                }        
            )
        )
    }
}

const actAddUser = (user) => {
    return{
        type: Types.ADD_USER,
        user
    }
}

// delete user
const actDeleteUserRequest = (id) => {
    return(dispatch) => {
        return (
            UserService.deleteUser(id).then((res) => {
                dispatch(actDeleteUser(id))
            })
        )
    }
}

const actDeleteUser = (id) => {
    return{
        type: Types.DELETE_USER,
        id
    }
}

// remember account after login
const actRememberUserLoginRequest = (id) => {
    return dispatch => {
        return (
            UserService.getUserById(id).then((res) => {
                dispatch(actRememberUser(res.data));
            })
        )
    }
}

const actRememberUser = (user) => {
    return {
        type: Types.REMEMBER_USER_LOGIN,
        user
    }
}

// get user by id
const actGetUserRequest = (id) => {
    return dispatch => {
        return (
            UserService.getUserById(id).then((res) => {
                dispatch(actGetUser(res.data));
                dispatch(userItemLoadingAction.closeItemLoading())
            }).catch(
                error => {
                    dispatch(userItemLoadingAction.closeItemLoading())
                    dispatch(adminAlertInfoAction.changeAdminAlertOn("Tác vụ thất bại!!!","danger"))
                }
            )
        )
    }
}

const actGetUser = (user) => {
    return {
        type:Types.EDIT_USER,
        user
    }
}

// user login update info
const actUpdateUserInfoRequest = (userDto, file, checkFile) => {
    return dispatch => {
        return (
            UserService.updateUser(userDto, userDto.id, file, checkFile).then(
                (res) => 
                {
                    dispatch(actUpdateUser(res.data));
                    dispatch(actGetUserRequest(res.data.id));
                    dispatch(actLoginUser(res.data));
                    dispatch(userItemLoadingAction.closeItemLoading())
                    dispatch(statusButtonLoadingAction.closeButtonLoading())
                    dispatch(adminAlertInfoAction.changeAdminAlertOn("Cập nhật thành công","success")) 
                }
            ).catch(
                error => {
                    dispatch(userItemLoadingAction.closeItemLoading())
                    dispatch(statusButtonLoadingAction.closeButtonLoading())
                    if(error.response.status === 409){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Tên đăng nhập đã tồn tại ! \n Yêu cầu đổi tên đăng nhập khác.", "danger"))           
                    }
                    if(error.response.status === 400){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Email đã có tài khoản đăng ký ! Yêu cầu sử dụng email khác", "danger"))           
                    }            
                }        
            )
        )
    }
}


// update user
const actUpdateUserRequest = (userDto, file, checkFile) => {
    return dispatch => {
        return (
            // UserService.updateUser(userDto, userDto.id, file, checkFile).then( res => {
            //     dispatch(actUpdateUser(res.data));
            // })
            UserService.updateUser(userDto, userDto.id, file, checkFile).then(
                (res) => 
                {
                    dispatch(actUpdateUser(res.data));
                    dispatch(actGetUserRequest(res.data.id))
                    dispatch(statusButtonLoadingAction.closeButtonLoading())
                    dispatch(adminAlertInfoAction.changeAdminAlertOn("Cập nhật thành công","success")) 
                }
            ).catch(           
                error => {
                    dispatch(statusButtonLoadingAction.closeButtonLoading())
                    if(error.response.status === 409){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Tên đăng nhập đã tồn tại ! \n Yêu cầu đổi tên đăng nhập khác.", "danger"))           
                    }
                    if(error.response.status === 400){
                        dispatch(adminAlertInfoAction.changeAdminAlertOn("Email đã có tài khoản đăng ký ! Yêu cầu sử dụng email khác", "danger"))           
                    }            
                }        
            )
        )
    }
}

const actUpdateUser = (user) => {
    return {
        type: Types.UPDATE_USER,
        user
    }
}

//login
const actLoginUserRequest = (username, password) => {
    return dispatch => {
        return (
            UserService.login(username, password)
            .then(res => {
                    if(res.status === 200){
                        localStorage.setItem('token',res.data.token.token);
                        if(res.data.user.role === "Admin"){
                            localStorage.setItem('w2rt3','popqw');
                        }
                        if(res.data.user.role === "User"){
                            localStorage.setItem('w2rt3','uiasq');
                        }
                        dispatch(actLoginUser(res.data.user));
                        dispatch(userItemLoadingAction.closeItemLoading())
                    } 
                }
            ).catch(
                error => {
                    dispatch(userItemLoadingAction.closeItemLoading())
                    dispatch(adminAlertInfoAction.changeAdminAlertOn("Tên đăng nhập hoặc mật khẩu của bạn chưa đúng !","danger"));
                }
                
            )
        )
    }
}

const actLoginUser = (user) => {
    return {
        type: Types.LOGIN_USER,
        user
    }
}

///forget password
const actForgetPassWordRequest = (username, email) => {
    return dispatch => {
        return (
            UserService.forgetPassWord(username, email)
            .then(res => {
                dispatch(adminAlertInfoAction.changeAdminAlertOn("Gửi password thành công ! Yêu cầu bạn kiểm tra email !!!","success"));
                dispatch(openFormSendMail.changeFormSendMailOff())
                // dispatch(userItemLoadingAction.closeItemLoading())
                dispatch(adminAlertInfoAction.changeOffAlertSendMail())
            }).catch(
                error => {
                    // dispatch(userItemLoadingAction.closeItemLoading())
                    dispatch(adminAlertInfoAction.changeOffAlertSendMail())
                    dispatch(adminAlertInfoAction.changeAdminAlertOn("Tên đăng nhập hoặc email của bạn không chính xác !!!","danger"));
                }
            )
            
        )
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    actFetchUsersRequest,
    actAddUserRequest,
    actDeleteUserRequest,
    actUpdateUserRequest,
    actGetUserRequest, 
    actLoginUserRequest,
    actRegisterRequest,
    actForgetPassWordRequest,
    actRememberUserLoginRequest,
    actUserUpdatePassWordRequest,
    actUpdateUserInfoRequest
}