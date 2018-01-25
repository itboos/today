import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const  connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor () {
      super()
      this.state = { allProps: {} }
    }
    // TODO: 如何从 store 取数据？
    componentWillMount () {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }
    _updateProps () {
      const { store } = this.context
      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {} // 防止 mapStateToProps 没有传入
      let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {} // 防止 mapDispatchToProps 没有传入
      this.setState({
        allProps: { // 整合普通的 props 和从 state 生成的 props
          ...stateProps,
          ...this.props
        }
      })
    }
    render () {
      return <WrappedComponent {...this.state.allProps} />;
    }
  }

  return Connect;
}