// 官网三连线游戏
import React, { Component } from 'react'
// 判断是否有赢家， 三个连在一起，视为赢家. 三横三竖， 对角线
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// 正方形类
function Square(props) {
  return (
    <button className = "square" onClick = { props.onClick }>
      {props.value}
    </button>
  )
}
// 板块
class Boards extends Component {
  rederSquare(i) {
    return <Square 
      value = { this.props.squares[i] } 
      onClick = { () => this.props.onClick(i) }
    />;
  }
  render () {
    return (
      <div>
          <div className = "border-row">
            {this.rederSquare(0)}
            {this.rederSquare(1)}
            {this.rederSquare(2)}
          </div>
          <div className = "border-row">
            {this.rederSquare(3)}
            {this.rederSquare(4)}
            {this.rederSquare(5)}
          </div>
          <div className = "border-row">
            {this.rederSquare(6)}
            {this.rederSquare(7)}
            {this.rederSquare(8)}
          </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  handleClick(i) {
    console.log('clicked:', i)
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] =  this.state.xIsNext ? 'X': '0'
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key = { move }>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'The Winner is ' + winner
    } else {
      status = 'Next palyer:' + (this.state.xIsNext ? ' X': ' 0');
    }
    return (
      <div className = "game">
        <div className = "game-board">
          <Boards 
            squares = { current.squares }
            onClick = {(i) => {this.handleClick(i)} }
          />
        </div>
        <div className = "game-info">
          <div style = {{ marginLeft: '40px' }}> {status} </div>
          <ol>{ moves }</ol> 
        </div>
      </div>
    )
  }
}

export default Game