import * as Types from '../constants/ActionTypes'
import UserCourseService from '../services/UserCourseService'
import adminAlertInfoAction from './admin-alert-infoAction'

// get couse new
const actUserFetchCourseNewRequest = () => {
    return dispatch => {
        return (
            UserCourseService.useGetCourseNew().then(res => {
                dispatch(actUserFetchCourseNew(res.data))
            })
            .catch(
                error => {
                    dispatch(adminAlertInfoAction.changeAdminAlertOn("Tác vụ thất bại !!! Xin hãy thử lại", "danger"))           
                }
            )
        )
    }
}


const actUserFetchCourseNew = (courseNew) => {
    return {
        type: Types.USER_FETCH_COURSE_TOPIC_NEW,
        courseNew
    }
}



const actAddUserCourseRequest = (userCourse) => {
    return (dispatch) => {
        return(
            UserCourseService.addUserCourse(userCourse).then((res)=> {
                dispatch(actAddUserCourse(res.data))
            })
        )
    }
}

const actAddUserCourse = (userCourse) => {
    return {
        type: Types.ADD_USERCOURSE,
        userCourse
    }
}

export default {
    actAddUserCourseRequest,
    actUserFetchCourseNewRequest
}