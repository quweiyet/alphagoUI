
var chessModule = {};

(function(chessModule, window, undefined){

	//定义一个二维数组来记录棋盘某一个交叉点是否有棋子
	var checkBoard = [];
	var me = true;	//判断该谁落子

	//初始化checkBoard
	for(var i = 0; i < 15; i++){
		checkBoard[i] = [];
		for(var j = 0; j < 15; j++){
			checkBoard[i][j] = 0;
		}
	}


	var canvas = document.getElementById('canvas');
	var cxt = canvas.getContext('2d');
	cxt.strokeStyle = '#BFBFBF';

	//绘制棋盘线
	var drawChessBoard = function() {
		
		for(var i = 0; i < 15; i++){
			//画横线
			cxt.moveTo(20 + 40 * i, 20);
			cxt.lineTo(20 + 40 *i, 580);
			cxt.stroke();

			//画纵线
			cxt.moveTo(20, 20 + 40 * i);
			cxt.lineTo(580, 20 + 40 *i);
			cxt.stroke();
		}		
	}

	//绘制水印
	var drawWaterMark = function(){
		var bgImg = new Image();
		bgImg.src = 'images/logo.png';

		//图片加载完成再开始画图，否则会因为图片加载需要耗时，导致图片不能被画在画布上
		bgImg.onload = function(){
			cxt.drawImage(bgImg,0,0,630,560);

			//图片绘制完成再绘制棋盘线，否则棋盘线出现在水印下边，被遮盖
			drawChessBoard();
		}
	}

	/**
	*绘制棋子
	* @param i == x
	* @param j == y
	* @param me == 是否玩家下棋
	*/
	var drawChess = function(i, j, me){
		cxt.beginPath();
		cxt.arc(20 + 40 * i, 20 + 40 * j, 18, 0, 2 * Math.PI);
		cxt.closePath();
		
		//绘制渐变色的棋子，六个参数分别为开始圆心、半径，结束的圆心、半径。
		var gradient = cxt.createRadialGradient(20+40*i+2, 20+40*j-2, 18, 20+40*i + 2, 20+40*j - 2, 0);
		if(me){
			gradient.addColorStop(0,'#0A0A0A');	//第一个圆的颜色(渐变开始色)
			gradient.addColorStop(1,'#636766');	//第二个圆的颜色(渐变结束色)
		}else{
			gradient.addColorStop(0,'#d1d1d1');	//第一个圆的颜色(渐变开始色)
			gradient.addColorStop(1,'#f9f9f9');	//第二个圆的颜色(渐变结束色)
		}
		cxt.fillStyle = gradient;
		cxt.fill();
	}

	var bindEvent = function(){
		canvas.onclick = function(e){
			var x = e.offsetX;
			var y = e.offsetY;

			var i = Math.floor(x / 40);
			var j = Math.floor(y / 40);

			if (checkBoard[i][j] === 0) {
				drawChess(i, j, me);
				checkBoard[i][j] = 1; //checkBoard不为0表示当前地点有子
			}

			me = !me;
			

		}
	}

	chessModule.drawWaterMark = drawWaterMark,
	chessModule.bindEvent = bindEvent


})(chessModule, window);


document.addEventListener('DOMContentLoaded', function() {
	chessModule.drawWaterMark();
	chessModule.bindEvent();
}, false);