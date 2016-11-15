define(['text!./orderForm.html','css!./orderForm.css'],function(html){
	function render(){
		$('#page').html(html);
		
	}
	
	function getData(){
		
	}
	
	return {
		render:render
	}
	
	
})

