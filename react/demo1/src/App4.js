
import React, { Component } from 'react';

// 组件的生命周期
class Header extends Component {
  constructor() {
    super();
    console.log('调用构造函数.....');
  }
  componentWillMount() {
    console.log('组件将要挂载....');
  }
  componentDidMount() {
    console.log('组件已经挂载....');
  }
  componentWillUnmount() {
    console.log('component will unmount')
  }
  render() {
    console.log('render');
    return (
      <div>
        <h1 className="title">React</h1>
      </div>
    );
  }
}
class Index extends Component {
  constructor() {
    super();
    this.state = {
      isShowHeader: true
    }
  }
  handleShowOrHide () {
    this.setState({
      isShowHeader: !this.state.isShowHeader
    });
  }
  render() {
    return (
      <div>
        {this.state.isShowHeader ? <Header /> : null }
        <button onClick={this.handleShowOrHide.bind(this)}>显示或者隐藏标题</button>
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
