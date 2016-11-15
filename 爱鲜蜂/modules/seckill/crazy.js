define(['text!./crazy.html','css!./crazy.css'],function(html){
	function render(){
		$('#page').html(html);
		getData();
	}
	
	function getData(){
		$.ajax({
		type:"get",
		url:"http://www.vrserver.applinzi.com/aixianfeng/apimiaosha.php",
		async:true,
		success:function(req){
			var obj = JSON.parse(req);
			console.log(obj.product);
			var strH="";
			$.each(obj.product, function(i,elem) {
				strH += "<div><div class='left'><img src='"+elem.img+"'></div><div class='right'>";
				strH += "<ul><li>"+elem.name+"</li><li>"+elem.specifics+"</li>";
				strH += "<li><span>￥</span><span>"+elem.price+"</span> <span>/原价:"+elem.market_price+"</span></li>";
				strH += "<li>"+elem.btnText+"</li></ul></div></div>";
			});
			console.log(strH);
			$(".containt").html(strH);
		}
});
	}
	
	return {
		render:render
	}
	
	
})

