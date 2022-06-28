import * as Types from './../constants/UserTypes';

var initialState = []

const users = (state = initialState, action) => {
    // var { lineProduct, MA_DSP } = action;

    if (action.type === Types.FETCH_USER) {
        return [...action.User];
    }
    else if (action.type === Types.DELETE_USER) {
        let index = state.findIndex(x=> x.id === action.id);
        state.splice(index, 1);
        return [...state];
    }
    return [...state];
}



export default users;