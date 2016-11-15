define(['text!./order.html','css!./order.css'],function(html){
	function render(){
		$('#page').html(html);
	}
	
	function getData(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apiyuding.php",
			async:true,
			success:function(req){
				var obj = JSON.parse(req);
				var strG="";
				$.each(obj.product, function(i,elem) {
					strG += "<dl><dt><img src='"+elem.img+"'></dt>";
					strG += "<dd>"+elem.name+"</dd>";
					strG += "<dd><span>￥</span><span>"+elem.price+"</span> <span>"+elem.market_price+"￥</span></dd>";
					strG += "<dd><img src='../images/page5_3.png'></dd></dl>";
				});
			$(".containt").html(strG);
				
			}
		});
		
		
	}
	
	return {
		render:render,
		getData:getData
	}
	
	
})