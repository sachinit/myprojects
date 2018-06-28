import React from 'react';
import { 
  Button,
  ButtonGroup
} from 'react-bootstrap';


class Notifier extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
    this.onUnlike = this.onUnlike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

onUnlike() {
  let newLikesCount = this.state.likesCount - 1;
  this.setState({likesCount: newLikesCount});
}
  render() {
    return (

        <div>
        Likes : <span>{this.state.likesCount}</span>
        <div>
          <ButtonGroup bsSize="large">
          <Button bsStyle="primary" onClick={this.onLike}>Like Me</Button>
        <Button bsStyle="danger" onClick={this.onUnlike}>Unlike me</Button>
        </ButtonGroup>
        </div>
        </div>
    );
  }

}

export default Notifier;