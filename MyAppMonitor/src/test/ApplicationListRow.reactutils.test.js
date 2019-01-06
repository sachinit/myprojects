import expect from 'expect';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ApplicationListRow from '../main/components/home/ApplicationListRow';
import { 
Panel,
PageHeader,
Button,
Jumbotron,
Label
} from 'react-bootstrap';

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

    let renderer = TestUtils.createRenderer();
    renderer.render(<ApplicationListRow {...props} />);
    let output = renderer.getRenderOutput();
    
    return {
        props,
        output,
        renderer
    };
}

describe('ApplicationListRow via React Test Utils', () => {
    it('renders jumbotron and h1', () => {
        const { output } = setup();
        expect(output.type).toBe(Jumbotron);
    });
});