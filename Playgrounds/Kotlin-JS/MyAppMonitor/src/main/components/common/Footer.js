import React from 'react';

class Footer extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <footer className="footer">
        <div>
          <p className="text-muted">Developed by <a href="#"><abbr title="Enterprise Data Pipeline">EDP</abbr> Team</a> 
          <br /><span className="small">Supported in Chrome and Firefox</span></p>
      </div>
    </footer>
    );
  }

}

export default Footer;