import * as Types from '../constants/ActionTypes'
import ChapterService from '../services/ChapterService'
import statusButtonLoadingAction from './statusButtonLoadingAction'
import adminAlertInfoAction from './admin-alert-infoAction'
// get all chapters
const actFetchChapterRequest = () => {
    return (dispatch) => {
        return (
            ChapterService.getChapters().then((res) => {
                dispatch(actFetchChapters(res.data))
            })
        )
    }
}

const actFetchChapters = (chapters) => {
    return {
        type: Types.FETCH_CHAPTERS,
        chapters
    }
}

// add chapter

const actAddChapterRequest = (chapter) => {
    return (dispatch) => {
        return(
            ChapterService.addChapter(chapter).then((res)=> {
                dispatch(actAddChapter(res.data))
                dispatch(statusButtonLoadingAction.closeButtonLoading())
                window.history.back();
                dispatch(adminAlertInfoAction.changeAdminAlertOn("Thêm thành công !","success"))
            }).catch(
                error => dispatch(adminAlertInfoAction.changeAdminAlertOn("Tác vụ thất bại!!!","danger"))
            )
        )
    }
}

const actAddChapter = (chapter) => {
    return {
        type: Types.ADD_CHAPTER,
        chapter
    }
}
// get by id
// get chapter by id
const actGetChapterRequest = (id) => {
    return dispatch => {
        return (
            ChapterService.getChapterById(id).then((res) => {
                dispatch(actGetChapter(res.data));
            })
        )
    }
}

const actGetChapter = (chapter) => {
    return {
        type:Types.EDIT_CHAPTER,
        chapter
    }
}

// get by id
// get chapter by course id
const actGetChapterByCourseIdRequest = (courseId) => {
    return dispatch => {
        return (
            ChapterService.getChapterByCourseId(courseId).then((res) => {
                dispatch(actGetChapterByCourseId(res.data));
            })
        )
    }
}

const actGetChapterByCourseId = (chapters) => {
    return {
        type:Types.FETCH_CHAPTERS,
        chapters
    }
}
//update chapter 
const actUpdateChapterRequest = (chapter) => {
    return dispatch => {
        ChapterService.updateChapter(chapter).then((res) => {
            dispatch(actUpdateChapter(res.data))
            dispatch(statusButtonLoadingAction.closeButtonLoading())
                window.history.back();
                dispatch(adminAlertInfoAction.changeAdminAlertOn("Cập nhật thành công !","success"))
            }).catch(
                error => dispatch(adminAlertInfoAction.changeAdminAlertOn("Tác vụ thất bại!!!","danger"))
            )
    }
}

const actUpdateChapter = (chapter) =>{
    return {
        type: Types.UPDATE_CHAPTER,
        chapter
    }
}

//delete chapter by id

const actDeleteChapterRequest = (id) => {
    return dispatch => {
        return (
            ChapterService.deleteChapter(id).then((res) => {
                dispatch(actDeleteChapter(res.data))
            })
        )
    }
}

const actDeleteChapter = (chapter) => {
    return {
        type: Types.DELETE_CHAPTER,
        chapter
    }
}

export default {
    actFetchChapterRequest,
    actAddChapterRequest,
    actGetChapterRequest,
    actDeleteChapterRequest,
    actUpdateChapterRequest,
    actGetChapterByCourseIdRequest
}