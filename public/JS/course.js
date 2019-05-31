(function(){
	$("div.f2-item").on("click","a",function(){
		//var div=$(this).attr("data-target");
		//如果有元素的class为active时  应县删除该属性的active
		$(this).parent().addClass("open").siblings().removeClass("open");
		$(`li[id=${$(this).attr("data-target")}]`).addClass("active").siblings().removeClass("active");		
	
	})
	/*$("div.f2-item>ul>li").hover(function(){
		$(this).toggleClass("open");
	})*/
})()
