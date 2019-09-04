import expect from 'expect';
import * as loadActions from '../main/actions/LoadActions';
import * as types from '../main/constants/actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import io from 'socket.io-client';
import io_server from 'socket.io';


describe('Load Actions', () => {
    describe('loadDataSuccess', () => {
        it('should create LOAD_DATA_SUCCESS action', () => {
            const apps = {};
            const expectedAction = {
                type: types.LOAD_DATA_SUCCESS,
                apps: apps
            };

            //act
            const action = loadActions.loadDataSuccess(apps);

            //assert
            expect(action).toEqual(expectedAction);
        });
    });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

//io_server.listen(3001);

describe('Load data action', () => {
    let socket;

    beforeEach(function(done) {
        // Setup
        socket = io.connect('http://localhost:3001', {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
            , transports: ['websocket']
        });

        socket.on('connect', () => {
            done();
        });

        socket.on('disconnect', () => {
        // console.log('disconnected...');
        });
        socket.on('loadmonitor', function (message) {
            socket.emit('returnloadMonitor', []);
        });
    });

    afterEach((done) => {
        nock.cleanAll();
        // Cleanup
        if(socket.connected) {
            socket.disconnect();
        }

        done();
    });
    it('should create LOAD_DATA_SUCCESS and BEGIN_AJAX_CALL when loading data', (done) => {
        // Example call to nock  (Mocking the actual service call and return our custom data )
        // nock('http://example.com')
        // .get('/get')
        // .reply(200, {body: {}});
        const expectedAction = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_DATA_SUCCESS, body: {apps: []}}
        ];

        const store = mockStore({apps: []}, expectedAction);
        store.dispatch(loadActions.loadData(socket)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_DATA_SUCCESS);
            done();
        });
    });
});