define(['text!./cart.html', 'css!./cart.css', '../home/home.js'], function(html, css, home) {
	function render() {
		$('#page').html(html);
	}

	function getData() {

	}

	function func() {
		$(function() {
			/*单选按钮*/
			var num = $(".goods_list dl").length;
			$(".goods_list dl dt").click(function() {
				if ($(this).children().attr("src") == "../images/btn_bg.png") {
					$(this).children().attr("src", "../images/shop_btn.png");
					num -= 1;
					$(this).parent().children().eq(2).children().eq(1).children().eq(2).html(0);
				} else {
					$(this).children().attr("src", "../images/btn_bg.png");
					num += 1;
					init();
				}
				//console.log(num);
				allCheck();
				refreshBg();
				init();
			});

			/*判断是否全选*/
			function allCheck() {
				if (num == $(".goods_list dl").length) {
					$(".goods_allC p:first-of-type span:first-of-type img").attr("src", "../images/btn_bg.png");
				} else {
					$(".goods_allC p:first-of-type span:first-of-type img").attr("src", "../images/shop_btn.png");
				}
			}

			/*全选按钮*/
			$(".goods_allC p:first-of-type").click(function() {

					if ($(".goods_allC p:first-of-type span:first-of-type img").attr("src") == "../images/btn_bg.png") {
						$(".goods_allC p:first-of-type span:first-of-type img").attr("src", "../images/shop_btn.png");
						num = 0;

					} else {
						$(".goods_allC p:first-of-type span:first-of-type img").attr("src", "../images/btn_bg.png");
						num = $(".goods_list dl").length;
					}
					var a = $(".goods_allC p:first-of-type span:first-of-type img").attr("src");

					$(".goods_list dl dt").children().attr("src", a);
					refreshBg();
					init();
				})
				/*重置选好的颜色*/
			function refreshBg() {
				if (num == 0) {
					$(".goods_allC p:last-of-type").html("满￥0起送");
					$(".goods_allC p:last-of-type").css("background-color", "#808080");
				} else {
					$(".goods_allC p:last-of-type").html("选好了");
					$(".goods_allC p:last-of-type").css("background-color", "#ffd600");
				}
			}

			function resetBtn() {
				if (num == 0) {
					$(".goods_allC p:first-of-type span:first-of-type img").attr("src", "../images/shop_btn.png");
				}
			}
			/*加减号的设置*/
			$(".goods_list dl dd:nth-of-type(3) span:first-of-type").click(function(e) {
				$(this).parent().children().eq(1).html(parseInt($(this).parent().children().eq(1).html()) - 1);
				if ($(this).parent().children().eq(1).html() < 1) {
					$(this).parent().parent().remove();
					//console.log(e.target.parentNode.parentNode.parentNode.index)
					console.log(e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].src)
					for (var key in localStorage) {
						var news = JSON.parse(localStorage.getItem(key));
						if (news.img == e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].src) {
							localStorage.removeItem(key);
						}

					}

					num -= 1;
					refreshBg();
					resetBtn();
				}
				var a = parseFloat($(this).parent().parent().children().eq(2).children().eq(1).children().eq(1).html());
				var b = parseFloat($(this).parent().parent().children().eq(3).children().eq(1).html());
				//console.log(b);
				var c = a * b;
				$(this).parent().parent().children().eq(2).children().eq(1).children().eq(2).html(c);
				if ($(this).parent().parent().children().eq(0).children().eq(0).attr("src") == "../images/btn_bg.png") {
					refreshMoney();
				}
				refreshSpan();

			})
			$(".goods_list dl dd:nth-of-type(3) span:last-of-type").click(function(e) {
					$(this).parent().children().eq(1).html(parseInt($(this).parent().children().eq(1).html()) + 1);
					$(this).parent().parent().children().eq(0).children().eq(0).attr("src", "../images/btn_bg.png");
					if ($(this).parent().children().eq(1).html() >= 13) {
						$(this).parent().children().eq(1).html(13);
						alert("库存不足");
						return;
					}
					for (var key in localStorage) {
						var news = JSON.parse(localStorage.getItem(key));
						if (news.img == e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].src) {
							//console.log(news.cnt);
						}
						localStorage.setItem(news.dates, JSON.stringify(news));
						console.log(news.cnt);

					}
					console.log(localStorage);
					var a = parseFloat($(this).parent().parent().children().eq(2).children().eq(1).children().eq(1).html());
					var b = parseFloat($(this).parent().parent().children().eq(3).children().eq(1).html());
					var c = a * b;
					$(this).parent().parent().children().eq(2).children().eq(1).children().eq(2).html(c);

					if ($(this).parent().parent().children().eq(0).children().eq(0).attr("src") == "../images/btn_bg.png") {
						refreshMoney();
					}
					refreshSpan();

				})
				/*更新钱*/
			function refreshMoney() {
				var sum = 0;
				var oZ = document.getElementsByClassName("zong");
				var checkimg = document.getElementsByClassName("checkimg");
				var s = $(".goods_list dl").length;

				for (var i = s - 1; i >= 0; i--) {

					if ($(".checkimg").eq(i).children().eq(0).attr("src") == "../images/btn_bg.png") {
						oZ[i].innerHTML = danjia[i].innerHTML * shuliang[i].innerHTML;
					} else {
						oZ[i].innerHTML = 0;
					}

					sum = sum + parseFloat(oZ[i].innerHTML);
				}
				$(".goods_allC p:nth-of-type(2) span:nth-of-type(2) b:nth-of-type(2)").html(sum);
			}
			/*初始化*/
			var danjia = document.getElementsByClassName("danjia");
			var shuliang = document.getElementsByClassName("shuliang");

			function init() {
				var oZ = document.getElementsByClassName("zong");
				var s = $(".goods_list dl").length;
				var sum = 0;
				for (var i = s - 1; i >= 0; i--) {
					if ($(".checkimg").eq(i).children().eq(0).attr("src") == "../images/btn_bg.png") {
						sum += danjia[i].innerHTML * shuliang[i].innerHTML;
					}
				}
				$(".goods_allC p:nth-of-type(2) span:nth-of-type(2) b:nth-of-type(2)").html(sum);
			}
			init();

			function refreshSpan() {
				var sum = 0;
				$.each($(".shuliang"), function(i, elem) {
					sum += parseInt($(elem).html());
				});
				$(".footer ul li:nth-of-type(4) span").html(sum);
				if ($(".footer ul li:nth-of-type(4) span").html() == 0) {
					$(".footer ul li:nth-of-type(4) span").hide();
				}
				$(".footer ul li:nth-of-type(4) span").animate({
					width: "0.6025rem",
					height: "0.6025rem"
				}, 50).delay(50).animate({
					width: "0.5625rem",
					height: "0.5625rem"
				}, 50);
			}
			refreshSpan();
		})
	}

	function addDl() {
		var arr = [];

		function creatDl(obj) {
			var dl = document.createElement("dl");
			var strH = "";
			strH += "<dt class='checkimg'><img src='../images/btn_bg.png'></dt>";
			strH += "<dd><img src='" + obj.img + "'</dd>";
			strH += "<dd><span>" + obj.h + "</span><span><b>￥</b><b class='danjia'>" + obj.price + "</b><b class='zong'></b></span>";
			strH += "</dd><dd><span><img src='../images/substract.png'></span>";
			strH += "<span class='shuliang'>" + obj.cnt + "</span><span><img src='../images/bgAdd.png'><span></dd>";
			dl.innerHTML = strH;
			dl.index = obj.dates;
			return dl;
		}

		function readLocalstorage() {

			for (var key in localStorage) {
				var news = JSON.parse(localStorage.getItem(key));
				arr.push(news);
				//$(creatDl(news)).appendTo($(".goods_list"));
			}

			for (var i = 0; i < arr.length; i++) {
				if (i != 0 && arr[i - 1].img == arr[i].img) {
					arr.splice(i, 1);
					arr[i - 1].cnt += 1;
					i--;
				}
			}

			for (var tempArr in arr) {
				$(creatDl(arr[tempArr])).appendTo($(".goods_list"));
			}
			//localStorage.clear();
		}

		readLocalstorage();
		del();
	}

	function del() { /*清除相同的产品*/
		for (var i = 0; i < $(".goods_list dl").length - 1; i++) {
			for (var j = i + 1; j < $(".goods_list dl").length; j++) {
				if ($(".checkimg").eq(i).parent().children().eq(1).children().eq(0).attr("src") == $(".checkimg").eq(j).parent().children().eq(1).children().eq(0).attr("src")) {
					//alert(1);
					$(".checkimg").eq(i).parent().children().eq(3).children().eq(1).html(parseInt($(".checkimg").eq(i).parent().children().eq(3).children().eq(1).html()) + parseInt($(".checkimg").eq(j).parent().children().eq(3).children().eq(1).html()));
					$(".checkimg").eq(j).parent().remove();
					$(".checkimg").eq(i).parent().children().eq(3).children().eq(1).html();
				}
			}

		}
	}

	return {
		render: render,
		func: func,
		addDl: addDl,
		del: del
	}

})