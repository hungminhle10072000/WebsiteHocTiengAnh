import * as Types from '../constants/ActionTypes'
import CommentService from '../services/CommentService'

// get by id
// get comment by lesson id
const actGetCommentByLessonIdRequest = (lessonId) => {
    return dispatch => {
        return (
            CommentService.getCommentByLessonId(lessonId).then((res) => {
                console.log("ResData",res.data)
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
    console.log('Comment2: ',comment)
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
               
                dispatch(actDeleteComment(res.data))
            })
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
    actGetCommentByLessonIdRequest
}