
import React, { Component } from 'react';


class Header extends Component {
  render () {
    return (
    <div>
      <h2>This is header</h2>
    </div>
    )
  }
}




class App extends Component {
  render(){
    return  <Header />;
  } 
}
export default App;
