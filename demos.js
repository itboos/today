// 各种demo 2017-06-06 11:42:52
/* 进度条demo
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>进度条Demo</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no, email=no">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Expires" content="0">
	<style>
		.progressBar{
			width:200px;
			height:8px;
			border:1px solid #98AFB7;
			border-radius:5px;
			margin-top:10px;
		}
		#bar{
			width:0px;
			height:8px;
			border-radius:5px;
			background:#5EC4EA;
		}
		.percent{
			/*margin-top: 3px;*/
			margin: 3px 0 0 4px;
			color:#82615a;
		}
		.fl{
			float:left;
		}
		.clear{
			content:"";
			display: block;
			clear:both;
		}
	</style>
</head>
<body>
	<input type="button" value="开始" onclick="progressBar()" class="clear">
    <div class="progressBar fl">
    	<div id="bar" style="width: 0px;"></div>
    </div>
    <span class="percent fl"></span>
	<!-- <script src="http://www.daixiaorui.com/Public/js/jquery.min.js"></script> -->
	<script>
		var full=200, //总的目标值
			now=100, // 当前值
			progressBarWitdh=200; //进度条的总宽度
		var nowBarWitch=Math.ceil( (now/full)* progressBarWitdh );
		function progressBar(){
			//初始化js进度条
			var progressBar=document.querySelector('#bar');
			progressBar.style.width="0px";
			//$("#bar").css("width","0px");
			//进度条的速度，越小越快
			var speed = 10;
			
			bar = setInterval(function(){
				//nowWidth = parseInt($("#bar").width());
				nowWidth = parseInt(progressBar.clientWidth);
				//console.log(nowWidth);
				//宽度要不能大于进度条的总宽度
				if(nowWidth<= nowBarWitch){
					barWidth = (nowWidth + 1)+"px";
					//$("#bar").css("width",barWidth);
					progressBar.style.width=barWidth;
				}else{
					//进度条读满后，停止
					clearInterval(bar);
					document.querySelectorAll('.percent')[0].innerHTML=Math.ceil(now/full*100)+'%';
				}	
			},speed);
		}
	  progressBar()
	</script>
</body>
<script>
	// document.querySelector('#downApp').addEventListener('click',function(){
		
	// },false)
	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	
	function dataFormat(str){
		var date = new Date(str);
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() + ' ';
		h = date.getHours() + ':';
		m = date.getMinutes() + ':';
		s = date.getSeconds(); 
		return Y+M+D+h+m+s;
	}
	var res = dataFormat(1495209600000);
	console.log(res);
	// 输出结果：2014-04-23 18:55:49
	import receiveAndSendBand from './components/views/receiveAndSendBand'
	import diamondBeanSourceConsume from './components/views/diamondBeanSourceConsume'

</script>
</html>

*/