define(['text!./integral.html','css!./integral.css'],function(html){
	function render(){
		$('#page').html(html);
	}
	
	function getData(){
		
	}
	
	return {
		render:render
	}
	
	
})