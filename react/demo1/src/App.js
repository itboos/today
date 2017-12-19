
import React, { Component } from 'react';

class App extends Component {
  render() {
    const w = 'new day';
    return (
      <div className={w}>
         <h3>React {(function() {return 'function';})()}</h3>
      </div>
    );
  }
}

export default App;
