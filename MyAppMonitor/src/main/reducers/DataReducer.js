import * as types from '../constants/actionTypes';

export default function dataReducer(state = [], action) {
    switch(action.type) {
        case types.LOAD_DATA_SUCCESS:
            return action.apps;
        default:
            return state;
    }
}