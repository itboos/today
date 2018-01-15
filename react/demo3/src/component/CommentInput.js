import React, { Component } from 'react'

class CommentInput extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }
  componentWillMount() {
    // 组件将要挂载
    console.log('组件将要挂载....');
    this._loadUserName()
  }
  componentDidMount() {
    console.log('组件已经挂载....');
    this.textarea.focus();
  }

   // _表示私有方法
   _saveUserName(value) {
    localStorage.setItem('username', value);
  }
  _loadUserName() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({
        username
      });
    }
  }

  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }

  handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date(), // 是 new Date().getTime()的黑科技写法
      })
    }

    this.setState({ content: '' })
  }
  handleUseNmaeBlur(e) {
    console.log('用户输入框失去焦点....', e);
    this._saveUserName( e.target.value);
  }

  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onBlur = {this.handleUseNmaeBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}  ref={(textarea) => {this.textarea = textarea}} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput