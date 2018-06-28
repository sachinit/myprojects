import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadDataSuccess(apps) {
    return {type: types.LOAD_DATA_SUCCESS, apps};
}

export function loadDataError(apps) {
    return {type: types.LOAD_DATA_ERROR, apps};
}

export function loadData(socket) {
    return dispatch => {
        dispatch(beginAjaxCall());
        socket.emit('loadmonitor');
        socket.on('returnloadMonitor', function(data) {
            // Send notification if enabled
            data.map(app => {
                if(app.notification) {
                    if(app.flowdock) {
                        socket.emit("sendflowdock", {appName: app.appName, flowdock: app.flowdock, status: app.status, healthStatus: app.healthStatus, env: app.environment, displayName: app.displayName});
                    }
                    socket.emit("sendemail", {appName: app.appName, contactEmail: app.contactEmail, status: app.status, healthStatus: app.healthStatus, env: app.environment, displayName: app.displayName});
                }
            });
            dispatch(loadDataSuccess(data));
        });
        socket.on('returnloadMonitorErr', function(data) {
            dispatch(ajaxCallError());
            dispatch(loadDataError(data));
        });
    };
}