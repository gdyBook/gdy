require.config({
	paths:{
		'jquery':'lib/jquery-v3.1',
		'backbone':'lib/backbone',
		'underscore':'lib/underscore',
		'text':'lib/text',
		'css':'lib/css'
	}
});
require(['jquery','backbone','./router.js'],function($,Backbone){
	Backbone.history.start();
})

