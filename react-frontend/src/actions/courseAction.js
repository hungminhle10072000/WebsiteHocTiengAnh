import * as Types from '../constants/ActionTypes'
import CourseService from '../services/CourseService'
import statusButtonLoadingAction from './statusButtonLoadingAction'
import adminAlertInfoAction from './admin-alert-infoAction'

// get all courses
const actFetchCourseRequest = () => {
    return (dispatch) => {
        return (
            CourseService.getCourses().then((res) => {
                dispatch(actFetchCourses(res.data))
            })
        )
    }
}

const actFetchCourses = (courses) => {
    return {
        type: Types.FETCH_COURSES,
        courses
    }
}

// add course

const actAddCourseRequest = (course,image) => {
    return (dispatch) => {
        return(
            CourseService.addCourse(course,image).then((res)=> {
                dispatch(actAddCourse(res.data))
                dispatch(statusButtonLoadingAction.closeButtonLoading())
                window.history.back();
                dispatch(adminAlertInfoAction.changeAdminAlertOn("Thêm thành công !","success"))
            }).catch(
                error => dispatch(adminAlertInfoAction.changeAdminAlertOn("Tác vụ thất bại!!!","danger"))
            )
        )
    }
}

const actAddCourse = (course) => {
    return {
        type: Types.ADD_COURSE,
        course
    }
}
// get by id
// get course by id
const actGetCourseRequest = (id) => {
    return dispatch => {
        return (
            CourseService.getCourseById(id).then((res) => {
                dispatch(actGetCourse(res.data));
            })
        )
    }
}

const actGetCourseIsDone = (course) => {
    return {
        type:Types.FETCH_COURSE_IS_DONE,
        course
    }
}

// get course by id and userId
const actGetCourseByIdAndUserIdRequest = (id,userId) => {
    return dispatch => {
        return (
            CourseService.getCourseByIdAndUserId(id,userId).then((res) => {
                dispatch(actGetCourseIsDone(res.data));
             
            })
        )
    }
}

const actGetCourse = (course) => {
    return {
        type:Types.EDIT_COURSE,
        course
    }
}
//update course 
const actUpdateCourseRequest = (course,image) => {
    return dispatch => {
        CourseService.updateCourse(course,image).then((res) => {
            dispatch(actUpdateCourse(res.data))
            dispatch(statusButtonLoadingAction.closeButtonLoading())
            window.history.back();
        }).catch(
            error => dispatch(adminAlertInfoAction.changeAdminAlertOn("Tác vụ thất bại!!!","danger"))
        )
    }
}

const actUpdateCourse = (course) =>{
    return {
        type: Types.UPDATE_COURSE,
        course
    }
}

//delete course by id

const actDeleteCourseRequest = (id) => {
    return dispatch => {
        return (
            CourseService.deleteCourse(id).then((res) => {
                dispatch(actDeleteCourse(res.data))
            })
        )
    }
}

const actDeleteCourse = (course) => {
    return {
        type: Types.DELETE_COURSE,
        course
    }
}

export default {
    actFetchCourseRequest,
    actAddCourseRequest,
    actGetCourseRequest,
    actDeleteCourseRequest,
    actUpdateCourseRequest,
    actGetCourseByIdAndUserIdRequest
}