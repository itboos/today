
/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync, showData, detail, loginOut }) =>
      <div>
         <button onClick={onIncrementAsync}>
          Increment after 1 second
        </button>
        {' '}
        <button onClick={onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        <button onClick={showData}>
          showData
        </button>
        <button onClick={loginOut}>
          loginOut
        </button>
        <hr />
        <div>
          Clicked: {value} times
          <br/>
          {detail}
        </div>
      </div>

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired,
  showData: PropTypes.func.isRequired,
  loginOut: PropTypes.func.isRequired
}

export default Counter
