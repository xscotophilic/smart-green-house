import React, { Component } from 'react';

import './Warning.css';

class WarningCard extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div className="row" style={{margin: '50px 200px 30px 200px'}}>
          <div className="grid-example col s12"><span className="flow-text">I am a Warning for moisture sensor 3!</span></div>
        </div>
      </div>
    );
  }
}

export default (WarningCard);