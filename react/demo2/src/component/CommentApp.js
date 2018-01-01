import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends Component {
 constructor() {
   super();
   this.state = {
     comments: [],
   };
 }
 /*
  获取评论的功能，传递一个方法给子组件，子组件数据发生变化时， 调用父组件传过来的方法， 同时将数据通过参数的形式传过来
  父组件再处理数据， 同时传递给其它子组件。也可以父组件自己用， 这里就相当于间接进行了子组件的通信
  父组件-> 子组件   props down
  子组件-> 父组件： props_function, 调用父组件传过来的方法，将数据通过参数的形式传过去
  子组件-> 子组件: 子组件-> 父组件 -> 子组件:  
 */
 getComment(comment) {
   console.log(comment);
   if (!comment) return;
   if (!comment.username) return alert('请输入用户名')
   if (!comment.content) return alert('请输入评论内容')
   this.state.comments.push(comment);
   this.setState({
     comments: this.state.comments,
   });
 }
 render() {
   return (
     <div className="wrapper">
       <CommentInput 
        handleSubmit = {this.getComment.bind(this)}
       />
       <CommentList comments={this.state.comments} />
     </div>
   );
 }
}

export default CommentApp;