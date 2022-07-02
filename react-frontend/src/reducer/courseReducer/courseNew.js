import * as Types from '../../constants/ActionTypes';

const courseNewInit = []

const courseNew = (state = courseNewInit, action) => {

    switch(action.type) {
        case Types.USER_FETCH_COURSE_TOPIC_NEW:
            state = action.courseNew
            return [...state]
        default:
            return state    
    }

}

export default courseNew;
