import {FETCH_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, UPDATE_COMMENT} from '../../constants/ActionTypes'

const initialState = [{id:0,
                    userDto:{},
                    content:'',
                    time:null,
                    lessonDto:{}}]

const commentReducer = (state=initialState, action) => {
    const {comments} = action
    switch(action.type) {
        case FETCH_COMMENTS:
            return comments;
        case ADD_COMMENT:
            return [...state,action.comment]
        case DELETE_COMMENT:
            for (var i = state.length - 1; i >= 0; i--) {
                if (state[i].id === action.comment.id) {
                    state.splice(i, 1);
                }
               }
            
            return [...state]
        case UPDATE_COMMENT:
            
            for (var i = state.length - 1; i >= 0; i--) {
                if (state[i].id === action.comment.id) {
                    state[i]=action.comment;
                }
            }
            return [...state]        
        default:
            return state
    }
}

export default commentReducer;