/*
1.注意，组件类的第一个字母必须大写，否则会报错，比如HelloMessage不能写成helloMessage。
另外，组件类只能包含一个顶层标签，否则也会报错。
2.组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 <HelloMessage name="John"> ，就是 HelloMessage 组件加入一个 name 属性，
值为 John。组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

添加组件属性，有一个地方需要注意，就是 class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。

我们一般在组件渲染完成时做一些异步的请求:

*/

componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
 }




demos：
获取真实的DOM结构:
==========================================================================
	http://www.ruanyifeng.com/blog/2015/03/react.html

	var MyInput= React.createClass({
		focus:function(){
			console.log('聚焦输入框...');
			console.log(this.props.title);
			console.log(this.refs);
			console.log( this.refs );
			this.refs.myInput.focus();
		},
		render: function(){
			return (
				<div>
					<input type="text" defaultValue="你得变得更强..."  ref="myInput"/><br/>
					<input type="button" onClick={this.focus}  value="聚焦"/>
				</div>
			)
		} 
	});
     ReactDOM.render(		
       <MyInput title='这是组件' />,
       document.getElementById('root')
      );
==========================================================================
2.0设置State 的状态
    var Input=React.createClass({
    	getInitialState: function(){
    		return {
    			liked: false,
    			msg: '这是测试的信息啊'
    		};
    	},
    	handClick: function(){
			this.setState({ liked: !this.state.liked });
    	},
    	render: function(){	
    		console.log(this.state);
    		const value= this.state.liked ? '喜欢': '不喜欢';
    		return (
	    		<div>
					<p onClick={this.handClick}>钟{value}美女</p>
				</div>
    		);
    	}
    });
    ReactDOM.render(
    	<Input /> ,
    	document.getElementById('root')
    );
    
    ===================================================

    4:获取表单输入的值:
        var Input=React.createClass({
        	getInitialState: function(){
        		return {
        			value: '这是默认的输入值啊',
        			msg: '这是测试的信息啊'
        		};
        	},
        	handClick: function(e){
    				this.setState({ value:  e.target.value});
        	},
        	render: function(){	
        		const value= this.state.value;
        		console.log(this.state);
        		return (
    	    		<div>
    					<input type="text" onChange={this.handClick} value={value} />
    				</div>
        		);
        	}
        });
        ReactDOM.render(
        	<Input /> ,
        	document.getElementById('root')
        );
 ===================================================
	5.组件的生命周期:
	    var Input=React.createClass({
	    	getInitialState: function(){
	    		return {
	    			value: '这是默认的输入值啊',
	    			opacity: 1
	    		};
	    	},
	    	componentWillMount: function(){
	    		console.log('组件将要渲染....');
	    	},
	    	componentDidMount: function(){
	    		console.log('组件已经渲染....');
	    		this.timer=setTimeout(function(){
					var opacity= this.state.opacity;
					opacity -= 0.05;
					if(opacity < 0.1 ){
						opacity=1;
					}
					this.setState({opacity: opacity});
	    		}.bind(this),3000);
	    	},
	    	componentWillUpdate(nextProps, nextState){
	    		console.log('组件将要更新....');
	    		console.log(nextProps);
	    		console.log(nextState);
	    		console.log('================');
	    	},
	    	componentDidUpdate(nextProps, nextState){
	    		console.log('组件已经更新....');
	    		console.log(nextProps);
	    		console.log(nextState);
	    		console.log('================');
	    	},
	    	//组件将要被移除时调用
	    	componentWillUnmount:function(){

	    	},
	    	handClick: function(e){
				this.setState({ value:  e.target.value});
	    	},
	    	render: function(){	
	    		const opacity= this.state.opacity;
	    		console.log('组件渲染中....');
	    		return (
		    		<div style={ {opacity: opacity} }>
						Hello {this.props.name}
					</div>
	    		);
	    	}
	    });
	    ReactDOM.render(
	    	<Input name="钟冬林"/> ,
	    	document.getElementById('root')
	    );


总结： 我们一般会把组件的 state 的初始化工作放在 constructor 里面去做；在 componentWillMount 进行组件的启动工作，例如 Ajax 数据拉取、定时器的启动；组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 componentWillUnmount 里面去做。

   说一下本节没有提到的 componentDidMount 。一般来说，有些组件的启动工作是依赖 DOM 的，例如动画的启动，而 componentWillMount 的时候组件还没挂载完成，所以没法进行这些启动工作，这时候就可以把这些操作放在 componentDidMount 当中。

 ===================================================
 关于Es6 的模块化:
 import 和export 
 import React, { Component } from 'react';
 // 这个意思是导出react模块的默认变量（这里是一个对象），命名为React, 后面是导入一个 Component 方法，
 这里使用了对象的解构语法.

 栗子: 
 // test.js
 var zdl ={
  name: 'ZDL',
  age: 23,
  sex: 'man'
};
var zdl2 ={
  name: 'ZDL2',
  age: 23,
  sex: 'man'
};
var zdl3 ={
  name: 'ZDL3',
  age: 23,
  sex: 'man'
};
// 输出一个默认值， zdl,赋值给变量default 👻
export default zdl;
// 输出方法
export function sayHi() {
  console.log('hi, React.....');
}

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
// 输出变量
export {
  zdl2,
  zdl3
}

// app.js
import ZDL, { sayHi } from './test';
console.log(ZDL);
sayHi();
// 这里ZDL 就是导出的那个default 对象，  sayHi 导出的是那个指定的方法



// 注意的坑:
1.为避免组件渲染时， 导致组件循环渲染的问题， HTML元素一律用小写字母。
当时定义了一个Button类， 里面的button 有是写的大写的Button， 导致页面渲染死循环了。
所以，HTML 元素一律用小写表示。
2. 引入组件时， 前后不能加入空格，否则，会导致路径错误，导致组件找不到。
栗子： import CommentList from './CommentList ';  这个文件后面多了一个空格， 导致报路径错误。

 /*
  获取评论的功能，传递一个方法给子组件，子组件数据发生变化时， 调用父组件传过来的方法， 同时将数据通过参数的形式传过来
  父组件再处理数据， 同时传递给其它子组件。也可以父组件自己用， 这里就相当于间接进行了子组件的通信
  父组件-> 子组件   props down
  子组件-> 父组件： props_function, 调用父组件传过来的方法，将数据通过参数的形式传过去
  子组件-> 子组件: 子组件-> 父组件 -> 子组件:  
 */