const e = React.createElement;
const testFn = () => {
  console.log('箭头函数');
};
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [...arr1, 6, 7, 8];
// class LikeBtn extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       liked: false,
//     };
//   }
//   render() {
//     if (this.state.liked) {
//       return (
//         <button onClick={() => this.setState({ liked: !this.state.liked })} >
//           not Like
//         </button>
//       );
//     }
//     return e(
//       'button', {
//         onClick: () => {
//           this.setState({
//             liked: true,
//           });
//         },
//       },
//       'like'
//     );
//   }
// }

// const container = document.querySelector('.container');
// ReactDOM.render(e(LikeBtn), container);