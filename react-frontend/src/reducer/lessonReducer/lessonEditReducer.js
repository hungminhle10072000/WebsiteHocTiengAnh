import { EDIT_LESSON} from '../../constants/ActionTypes'

const lesson = {
    id:-1,
    chapterId:-1,
    name: '',
    video:'',
    number:0,
    chapterName:'',
    courseName:''
}

const lessonEditReducer = (state=lesson, action) => {
    const {lesson} = action
    switch(action.type) {
        case EDIT_LESSON:
            return lesson
        default:
            return state
    }
}

export default lessonEditReducer;