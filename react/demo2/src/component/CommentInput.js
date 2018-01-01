import React, { Component } from 'react';

class CommentInput extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      content: ''
    };
  }
  handleNameChange(e) {
    console.log('name-e:', e);
    this.setState({
      username: e.target.value
    });
  }
  handleContentChange(e) {
    console.log('text-area-e:', e);
    this.setState({
      content: e.target.value
    });
  }
  
  handleSubmit() {
    if(this.props.handleSubmit) {
      const {username, content} = this.state;
      this.props.handleSubmit({username, content});
      this.setState({content: ''});
    }
  }
  render() {
   return (
     <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input 
              value={this.state.username}
              onChange={this.handleNameChange.bind(this)}
            />
          </div>
        </div>

        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={this.state.content}
             onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>

        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit.bind(this)}
          >
            发布
          </button>
        </div>

     </div>
   );
  }
}
 export default CommentInput;