import {combineReducers} from 'redux';
import apps from './DataReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    apps,
    ajaxCallsInProgress
});

export default rootReducer;