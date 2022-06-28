import * as Types from './../constants/CategoryTypes';

var initialState = []

const category = (state = initialState, action) => {
    if (action.type === Types.FETCH_CATEGORY) {
        return [...action.category];
    }
    else if (action.type === Types.DELETE_CATEGORY) {
        let index = state.findIndex(x=> x.categoryId === action.categoryId)
        state.splice(index, 1);
        return [...state];
    }
    return [...state];
}


export default category;