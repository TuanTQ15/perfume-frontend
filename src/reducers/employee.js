import * as Types from './../constants/EmployeeTypes';

var initialState = []

const employees = (state = initialState, action) => {
    // var { lineProduct, MA_DSP } = action;

    if (action.type === Types.FETCH_EMPLOYEE) {
        return [...action.employee];
    }
    else if (action.type === Types.DELETE_EMPLOYEE) {
        let index = state.findIndex(x=> x.id === action.id);
        state.splice(index, 1);
        return [...state];
    }
    return [...state];
}



export default employees;