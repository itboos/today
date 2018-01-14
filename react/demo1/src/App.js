
import React, { Component } from 'react';


class Card extends Component {
  componentDidMount() {
    console.log('this.props.Children', this.props);
  }
  constructor() {
    super();
    this.state = {
      content: '<h4>react 小书呀....</h4>'
    };
  }
  render () {
    return (
      <div className='card'>
        <div className='card-content' style={{fontSize: '15px', color: 'blue'}}
          dangerouslySetInnerHTML= {{__html: this.state.content}}
        >
        </div>
      </div>
    )
  }
}

class App extends Component {
  render(){
    return <Card  content={
      <div>
        <h2>React.js 小书</h2>
        <p>抓紧时间学习吧</p>
      </div>
    } />
  } 
}
export default App;
