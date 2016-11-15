define(['text!./search2.html', 'css!./search2.css'], function(html) {
	function render() {
		$('#page').html(html);
		getData();
	}

	function getData() {
		$(function() {

			$(".search").click(function() {
				$(".history h4").show();
				var v = $(".searchValue").val();
				var historyA = $(".history");
				if (v == "") {
					return;
				}
				var news = {
					info: v,
					dates: (new Date()).toLocaleString()
				}
				localStorage.setItem(news.dates, JSON.stringify(news));

				$(crateSpan(news)).prependTo($(".history p"));

				console.log($(".history").html());
				$(".searchValue").val("");

			})

			function crateSpan(obj) {
				var str = "<span>" + obj.info + "</span>";
				return str;
			}

			function readLocalstorage() {
				for (var key in localStorage) {
					var news = JSON.parse(localStorage.getItem(key));
					if (news.info != null) {
						$(".history h4").show();
					}
					$(crateSpan(news)).prependTo($(".history p"));
				}
				localStorage.clear();
			}
			readLocalstorage();

			$(".empty").click(function() {
				localStorage.clear();
				$(".history").html("<h4>历史记录</h4><p></p>");
				$(".history h4").hide();
			})

			$(".hot_search p span").click(function() {
				//console.log($(this).html());
				$(".history h4").show();
				var v2 = $(this).html();
				var news = {
					info: v2,
					dates: (new Date()).toLocaleString()
				}
				localStorage.setItem(news.dates, JSON.stringify(news));
				$(crateSpan(news)).prependTo($(".history p"));
			})
		})
	}

	return {
		render: render
	}

})