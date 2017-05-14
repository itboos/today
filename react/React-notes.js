1.注意，组件类的第一个字母必须大写，否则会报错，比如HelloMessage不能写成helloMessage。
另外，组件类只能包含一个顶层标签，否则也会报错。
2.件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 <HelloMessage name="John"> ，就是 HelloMessage 组件加入一个 name 属性，
值为 John。组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

添加组件属性，有一个地方需要注意，就是 class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。

我们一般在组件渲染完成时做一些异步的请求:

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
					<p onClick={this.handClick}>钟冬林{value}美女</p>
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


 ===================================================
