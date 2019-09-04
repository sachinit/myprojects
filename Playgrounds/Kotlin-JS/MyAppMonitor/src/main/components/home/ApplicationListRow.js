import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {
    Panel,
    PageHeader,
    Button,
    Jumbotron,
    Label,
    Collapse,
    Well,
    Glyphicon,
      Grid,
  Row,
  Col,
  Clearfix
} from 'react-bootstrap';

import status from '../../constants/statusEnum';

let openState = false;

class ApplicationListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { open: false, concernAlertVisible: false};
    }

    render() {
        const {app} = this.props;
        
        let components = app.components.map(component => {
            if(component.healthStatus == status.CONCERNING) {
                this.state({concernAlertVisible: true});
            }
            return <div>{component.displayName} &emsp;<Label bsStyle={status[component.healthStatus]}>   </Label></div>;
        });

        let lblClassName = status[app.healthStatus];
        return (
            <Jumbotron>
                <Grid fluid>
                    <Row>
                        <Col xs={7} sm={7} md={7}>
                            <PageHeader>{app.displayName} <small>{app.environment} </small>     &nbsp; <Label bsStyle={lblClassName}>   </Label></PageHeader>
                            <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
                                Details 
                            </Button> 
                            <Collapse in={this.state.open}>
                                <Well>
                                {components}
                                </Well>
                            </Collapse>
                        </Col>
                        <Col xs={4} sm={4} md={4}>
                        </Col>
                        <Clearfix visibleSmBlock></Clearfix>
                    </Row>
                </Grid>
            </Jumbotron>
        );
    }
}

ApplicationListRow.propTypes = {
    app: PropTypes.object.isRequired
};


export default ApplicationListRow;