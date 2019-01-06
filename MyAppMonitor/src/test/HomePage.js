import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import { HomePage } from '../main/components/home/HomePage';


describe('Home page', () => {
    it('testing home page', () => {
        let props = {
            apps: []
        };
        const wrapper = mount(<HomePage {...props} />);
        
    });

});