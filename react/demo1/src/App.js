
import React, { Component } from 'react';

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
  }
  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({date: new Date()});
    }, 1000);
  }
  componentWillUnmount () {
    clearInterval(this.timer);
    console.log('组件将要卸载.....');
  }
  render() {
    return (
      <div>
        <p>现在的时间是：</p>
        {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}
class Index extends Component {
  constructor() {
    super();
    this.state = {
      isShowClock: true
    }
  }
  handleShowOrHide () {
    this.setState({
      isShowClock: !this.state.isShowClock
    });
  }
  render() {
    return (
      <div>
        {this.state.isShowClock ? <Clock /> : null }
        <button onClick={this.handleShowOrHide.bind(this)}>显示或者隐藏时钟</button>
      </div>
    );
  }
}
class App extends Component {
  render() {
    return <Index />
  }
}
export default App;
