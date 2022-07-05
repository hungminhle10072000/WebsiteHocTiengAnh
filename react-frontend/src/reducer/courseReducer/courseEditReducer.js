import { EDIT_COURSE, FETCH_COURSE_IS_DONE} from '../../constants/ActionTypes'

const course = {
    id: -1,
    name:'',
    introduce:'',
    chapters: []
}

const courseEditReducer = (state=course, action) => {
    const {course} = action
    switch(action.type) {
        case EDIT_COURSE:
            return course
        case FETCH_COURSE_IS_DONE:
            // console.log("Update lai khoa hoc" + course.chapters[0].lessons[0].doneExercise)
            return course
        default:
            return state
    }
}

export default courseEditReducer;