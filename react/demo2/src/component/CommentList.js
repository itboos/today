import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  static defaultProps = {
    comments: []
  }
  render() {
   return (
     <div className="one-comment">
       {
         this.props.comments.map((comment, index) => <Comment comment={comment} key={index} />)
       }
     </div>
   );
  }
}
 export default CommentList;