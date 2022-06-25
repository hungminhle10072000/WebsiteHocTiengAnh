import * as Types from '../constants/ActionTypes'
import CommentService from '../services/CommentService'
import adminAlertInfoAction from './admin-alert-infoAction'

// get by id
// get comment by lesson id
const actGetCommentByLessonIdRequest = (lessonId) => {
    return dispatch => {
        return (
            CommentService.getCommentByLessonId(lessonId).then((res) => {
                dispatch(actGetCommentByLessonId(res.data));
            })
        )
    }
}

const actGetCommentByLessonId = (comments) => {
    return {
        type:Types.FETCH_COMMENTS,
        comments
    }
}

// get by id
// get comment by topic id
const actGetCommentByTopicIdRequest = (lessonId) => {
    return dispatch => {
        return (
            CommentService.getCommentByTopicId(lessonId).then((res) => {
                dispatch(actGetCommentByTopicId(res.data));
            })
        )
    }
}

const actGetCommentByTopicId = (comments) => {
    return {
        type:Types.FETCH_COMMENTS,
        comments
    }
}
// get by id
// get comment by topic id
const actGetCommentByGrammarIdRequest = (grammarId) => {
    return dispatch => {
        return (
            CommentService.getCommentByGrammarId(grammarId).then((res) => {
                dispatch(actGetCommentByGrammarId(res.data));
            })
        )
    }
}

const actGetCommentByGrammarId = (comments) => {
    return {
        type:Types.FETCH_COMMENTS,
        comments
    }
}
// get all comments
const actFetchCommentRequest = () => {
    return (dispatch) => {
        return (
            CommentService.getComments().then((res) => {
                dispatch(actFetchComments(res.data))
            })
        )
    }
}

const actFetchComments = (comments) => {
    return {
        type: Types.FETCH_COMMENTS,
        comments
    }
}

// add comment

const actAddCommentRequest = (comment) => {
    return (dispatch) => {
        return(
            CommentService.addComment(comment).then((res)=> {
                dispatch(actAddComment(res.data))
            })
        )
    }
}

const actAddComment = (comment) => {
    return {
        type: Types.ADD_COMMENT,
        comment
    }
}
// get by id
// get comment by id
const actGetCommentRequest = (id) => {
    return dispatch => {
        return (
            CommentService.getCommentById(id).then((res) => {
                dispatch(actGetComment(res.data));
            })
        )
    }
}

const actGetComment = (comment) => {
    return {
        type:Types.EDIT_COMMENT,
        comment
    }
}

// get by id
// get comment by course id
const actGetCommentByCourseIdRequest = (courseId) => {
    return dispatch => {
        return (
            CommentService.getCommentByCourseId(courseId).then((res) => {
                dispatch(actGetCommentByCourseId(res.data));
            })
        )
    }
}

const actGetCommentByCourseId = (comments) => {
    return {
        type:Types.FETCH_COMMENTS,
        comments
    }
}
//update comment 
const actUpdateCommentRequest = (comment) => {
    return dispatch => {
        CommentService.updateComment(comment).then((res) => {
            dispatch(actUpdateComment(res.data))
        })
    }
}

const actUpdateComment = (comment) =>{
    return {
        type: Types.UPDATE_COMMENT,
        comment
    }
}

//delete comment by id

const actDeleteCommentRequest = (id) => {
    return dispatch => {
        return (
            CommentService.deleteComment(id).then((res) => {
                // dispatch(actDeleteComment(res.data))
                dispatch(adminAlertInfoAction.changeAdminAlertOn("Xóa thành công!!!","success"))
                dispatch(actFetchCommentRequest())
            })
            .catch(
                error => {
                    dispatch(adminAlertInfoAction.changeAdminAlertOn("Xóa thất bại!!!","danger"))
                }
            )
        )
    }
}

const actDeleteComment = (comment) => {
    return {
        type: Types.DELETE_COMMENT,
        comment
    }
}

export default {
    actFetchCommentRequest,
    actAddCommentRequest,
    actGetCommentRequest,
    actDeleteCommentRequest,
    actUpdateCommentRequest,
    actGetCommentByCourseIdRequest,
    actGetCommentByLessonIdRequest,
    actGetCommentByTopicIdRequest,
    actGetCommentByGrammarIdRequest
}