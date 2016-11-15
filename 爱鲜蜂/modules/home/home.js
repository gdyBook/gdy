define(['text!./home.html','css!./home.css','../cart/cart.js'],function(html){
	function render(){
		$('#page').html(html);
	
	}
	var arr=[];
	function getData(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
			async:true,
			success:function(req){
				var obj = JSON.parse(req);
				var strH="";
				var strA="";
				$.each(obj.data.slide, function(i,elem) {
					strH+="<img src="+elem.activity.img+">"
				});
				$(".banner div").html(strH);
				$.each(obj.data.menu,function(i,elem){
					strA += "<dl>"
					if(i==1){
						strA+="<dt><a href='#crazy'><img src='"+elem.activity.img+"'></a></dt>";
					}else{
						strA+="<dt><img src='"+elem.activity.img+"'></dt>";
					}
					strA += "<dd>"+elem.activity.name+"</dd></dl>"
				})	
				$("nav div").html(strA);
			}
		});
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apihomehot.php",
			async:true,
			success:function(req){
				var obj = JSON.parse(req);
				var strG="";
					
				$.each(obj.data, function(i,elem) {
					if(i>=0&&i<=2){
						strG+="<dl><dt><img src='"+elem.img+"'></dt>";
						strG+="<dd>"+elem.name+"</dd>";
						strG+="<dd><span>精选</span> <span>"+elem.pm_desc+"</span></dd>";
						strG+="<dd>"+elem.specifics+"</dd>";
						strG+="<dd><span>￥</span><span>"+elem.price+"</span> <span>￥"+elem.market_price+"</span></dd>";
						strG+="<dd class='addA'><img src='../images/addo.jpg'></dd></dl>";
					}
			
				});
				$(".header_f .goods").html(strG);
				
				$(".addA").click(function(){
				  var news={
				  	img:$(this).parent().children().eq(0).children().eq(0).attr("src"),
				  	h:$(this).parent().children().eq(1).html(),
				  	price:$(this).parent().children().eq(4).children().eq(1).html(),
				  	cnt:1,
				  	dates:(new Date()).toLocaleString()
				  }
				   $(".footer ul li:nth-of-type(4) span").show();
				  var a = parseInt($(".footer ul li:nth-of-type(4) span").html());
				 
				  a+=1;
				  $(".footer ul li:nth-of-type(4) span").html(a);
				  
				  $(".footer ul li:nth-of-type(4) span").animate({width:"0.6025rem",height:"0.6025rem"},50).delay(50).animate({width:"0.5625rem",height:"0.5625rem"},50);
				  localStorage.setItem(news.dates,JSON.stringify(news));
				})
	
			}
		});
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apihomehot.php",
			async:true,
			success:function(req){
				var obj = JSON.parse(req);
				var strG="";
					
				$.each(obj.data, function(i,elem) {
					if(i>=3&&i<=5){
						strG+="<dl><dt><img src='"+elem.img+"'></dt>";
						strG+="<dd>"+elem.name+"</dd>";
						strG+="<dd><span>精选</span> <span>"+elem.pm_desc+"</span></dd>";
						strG+="<dd>"+elem.specifics+"</dd>";
						strG+="<dd><span>￥"+elem.price+"</span> <span>￥"+elem.market_price+"</span></dd>";
						strG+="<dd><img src='../images/addo.jpg'></dd></dl>";
					}
			
				});
				$(".goods").eq(1).html(strG);
			
			}
		});
	}
	
	function carousal(){
		$(function(){
	/*轮播图部分*/
	var container=$(".banner");
	var list=$(".banner div");
	var buttons=$(".banner p span");
	var index=1;
	var timer;
	//console.log(innerWidth)
	function playCom(offset){
		//console.log($(list).css("margin-left"));
		var left = parseInt($(list).css("margin-left"))/innerWidth*100+offset;//用css获取left的值；
	    offset = "+=" + offset;
		$(list).animate({marginLeft:offset+"%"},1000,function(){
			if(left>-100){
				left=(-400);
			}
			if(left<-400){
				left=(-100);
			}
			$(list).css("margin-left",left+"%");
		})	
	}
	//按钮样式的设定；
	function showButtons(){
		buttons.eq(index-1).addClass("on").siblings().removeClass("on");
	}
	//图片向下移动
	function moveDown(){
		if($(list).is(":animated")){//放图片的框
			return;
		}
		playCom(-100);
		if(index==4){
			index=1;
		}else{
			index+=1;
		}
		showButtons();
	}
	//单击按钮的事件
	//定义一个鼠标离开的播放事件；
	function play(){
		timer=setTimeout(function(){
			moveDown();//模拟单击事件****************
			play();
		},3000)
	}
	function stop(){
		clearTimeout(timer);
	}
	$(container).hover(stop,play);//hover是复合事件；****************
	play();
	/*
		鼠标滑动事件不知道怎么清定时器和开定时器
	*/
	$(".banner").on("swipeLeft",function(){
		//clearTimeout(timer);
		if($(list).is(":animated")){//放图片的框
			return;
		}
		if(index==4){
			index=1;
		}else{
			index+=1;
		}
		showButtons();
		var lastLeft=parseInt($(list).css("margin-left"))/innerWidth*100;
		if(lastLeft<-300){
			lastLeft=0;
		}
		//console.log(lastLeft);
		$(list).animate({"margin-left":lastLeft-100+"%"},1000)

	})
	
	$(".banner").on("swipeRight",function(){
		//clearTimeout(timer);
		if($(list).is(":animated")){
			return;
		}
		if(index==1){
			index=4;
		}else{
			index-=1;
		}
		console.log(index);
		showButtons();
		var lastLeft=parseInt($(list).css("margin-left"))/innerWidth*100;
		if(lastLeft==0){
			lastLeft=-400;
		}
		$(list).animate({"margin-left":lastLeft+100+"%"},1000);
		//console.log(innerWidth);
	})

})
	}
	
	return {
		render:render,
		carousal:carousal,
		getData:getData,
	
	}
	
	
})