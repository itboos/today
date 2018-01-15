import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }
  componentWillMount() {
    // 从本地缓存中加载评论
    this._getComments();
  }
  _getComments() {
    let comments = localStorage.getItem('comments');
    if( comments) {
      this.setState({
        comments: JSON.parse(comments)
      });
    }
  }

  _saveComments(comments) {
    console.log('_setComments', comments);
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')

    const comments = this.state.comments;
    comments.push(comment);
    this.setState({
      comments
    });
    this._saveComments(comments);
  }
  handleDeleteComment (index) {
    console.log(index);
    const comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({comments});
    this._saveComments(comments);
  }
  render() {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList 
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)}
        />
      </div>
    )
  }
}

export default CommentApp