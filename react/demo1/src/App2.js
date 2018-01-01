
import React, { Component } from 'react';

class Title extends Component {
  constructor() {
    super();
    this.state = {
      name: "ZDL",
      isLiked: false,
    };
  }
  handleClick(e) {
   console.log('点击title...');
   console.log('this.state:', this.state);
   this.setState({
     name: '徐文华',
   });
   console.log('this.state:', this.state);
  }
  render() {
    return (
      <h1 onClick={this.handleClick.bind(this)}> React 小书 </h1>
    );
  }
}
class Header extends Component {
  render() {
    return (
      <div>
        <Title />
        <h4>这是头部......</h4>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="gg">
         React 小书
         <Header/>
      </div>
    );
  }
}

export default App;
