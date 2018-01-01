
import React, { Component } from 'react';

class Button extends Component {
  constructor() {
   super();
   this.state = {
     isLiked: false,
     name: 'a test',
   };
  }
  changeText() {
    console.log('改变状态.....');
    this.setState({
      isLiked: !this.state.isLiked,
    });
  }
  render() {
    console.log('this.State:', this.state);
    const text1 = this.props.likeText || '已赞';
    const text2 = this.props.unlikeText || '未赞';
    console.log('this.props', this.props);
    return (
      <button onClick={this.changeText.bind(this)}> {this.state.isLiked ? text1: text2} </button> 
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <Button likeText="喜欢" unlikeText="不喜欢" name="徐文华与母狗" />
      </div>
    );
  }
}

export default App;
