import {FETCH_COURSES, ADD_COURSE, EDIT_COURSE, DELETE_COURSE, UPDATE_COURSE} from '../../constants/ActionTypes'

// const initialState = { courses: [] }
const initialState = []

const courseReducer = (state=initialState, action) => {
    const {courses} = action
    switch(action.type) {
        case FETCH_COURSES:
            return [...courses]
        case ADD_COURSE:
            return [...state,action.course]
        case EDIT_COURSE:
            for (var i = state.length - 1; i >= 0; i--) {
                if (state[i].id === action.course.id) {
                    state[i]=action.course;
                }
               }
            return [...state] 
        case DELETE_COURSE:
            for (var i = state.length - 1; i >= 0; i--) {
                if (state[i].id === action.course.id) {
                    state.splice(i, 1);
                }
               }
            
            return [...state]
        case UPDATE_COURSE:
            for (var i = state.length - 1; i >= 0; i--) {
                if (state[i].id === action.course.id) {
                    state[i]=action.course;
                }
            }
            return [...state]        
        default:
            return state
    }
}

export default courseReducer;