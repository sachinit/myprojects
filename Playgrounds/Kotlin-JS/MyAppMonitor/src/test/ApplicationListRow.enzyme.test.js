import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import ApplicationListRow from '../main/components/home/ApplicationListRow';

function setup() {
    let props = {
        app: {
            environment: '',
            displayName: '',
            components: [{
                displayName: ''
            }]
        }
    };

    return shallow(<ApplicationListRow {...props} />);
}

describe('ApplicationListRow via Enzyme', () => {
    it('renders jumbotron and h1', () => {
        const wrapper = setup();
        expect(wrapper.find('Jumbotron').length).toBe(1);
    });
});