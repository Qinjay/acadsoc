/**
 * Created by web on 2019/5/14.
 */





(function(){
	//轮播
	var moved=1920;
	var i=0;
	var ban=document.getElementById("carousel-f0");
	var space=ban.firstElementChild;
	var imgs=space.getElementsByTagName("img");
	function task(){
		i--;
		if(i<-(imgs.length-1)){i=0}
		space.style.left=(moved*i)+"px";
		show();
//console.log(i)
	}
	var timer=setInterval(task,2500);
	//鼠标移入暂停
	ban.onmouseover=function(){clearInterval(timer);}
	ban.onmouseout=function(){timer=setInterval(task,2000);}
	//轮播指示符
	var btns=space.nextElementSibling.children;
	console.log(btns)
	function show(){
		var index=Math.abs(i);
		for(var btn of btns){
			if(btn.className=="on"){
				btn.className="";
				break;
			}//先关掉其他li的变化			
		}
		btns[index].className="on";//改变自己
	}
	//点击 指示符图片出现
	for(var btn of btns){
		btn.onclick=function(){
			var btn=this;
			var num=btn.getAttribute("num");
			for(var btn of btns){
				if(btn.className=="on"){btn.className=""}
				this.className="on";
			}
			space.style.left=-(moved*num)+"px";
		}
	}
	//点击左右箭头
	var aleft=space.nextElementSibling.nextElementSibling;
	var aright=aleft.nextElementSibling;
	//console.log(aleft,aright);
	aleft.onclick=function(){
		task();
console.log(i)
	}
	aright.onclick=function(){
		
		i++;
		if(i>0){i=-(imgs.length-1)}
		console.log(i)
		space.style.left=(moved*i)+"px";
		show();
//console.log(i)
		}
	
	
		var n=10;
	    function getrmo(){
    	var tab=this;
            var id=tab.getAttribute("data-target");
            var div=document.getElementById(id);
            div.style.zIndex=n;
            div.style.visibility="visible";
            n++;
    }
	/*f4*/   
    var secF4a=document.getElementById("sec-f4-a");
    var tabs=secF4a.getElementsByClassName("sec-view-a");
    for(var tab of tabs){
        tab.onmouseover=function(){
            getrmo.call(this);
        }
    }
	
	var secF5=document.getElementById("sec-f5");
	var tablis=secF5.querySelectorAll("div.sec-f5-a>a");
	
	for(var tab of tablis)(
		tab.onmouseover=function(){
            getrmo.call(this);
        }
	)
	
//f5发展
	var sec5Rig=secF5.querySelector(".sec-f5-u1>li:last-child>a");
	var sec5RigSec=document.getElementById("sec-f5-right");
	 var d1=document.getElementById("sec-f5-left-1");
    var d2=document.getElementById("sec-f5-left-2");
    var da=sec5RigSec.previousElementSibling;
    var id=sec5Rig.getAttribute("data-target");
    var div=document.getElementById(id);
		//console.log(sec5Rig)
		sec5Rig.onclick=(function(){
            //console.log(div);
           
			div.style.visibility="visible";
			d1.style.display="none";
			d2.style.display="none";
			da.style.display="none";
			
			var secBg=sec5RigSec.nextElementSibling;
			var secLis=sec5RigSec.querySelectorAll("li.sec-f5-right-li")
			//console.dir(secLis);
			function bg(){
				return new Promise(function(open){	
					secBg.style.left="100%";
					secBg.style.transitionTimingFunction="ease-out";
					secBg.style.transitionDuration="3s";
					setTimeout(function(){open();},1000)
				})
			}

			function lis(){
				var i=0;
				var timer=setInterval(function(){					
					if(i>=secLis.length){
						//console.log(i);
						clearInterval(timer);
					}
					secLis[i].style.opacity=1;
					secLis[i].style.transitionDuration="1.5s";
					i++;
				},500)
			}
			bg().then(lis);
			
//f5荣誉			
			var hono=secF5.querySelector(".sec-f5-u1>li:first-child>a");
			hono.onclick=function(){
			div.style.visibility="hidden";
			secBg.style.left="0";
			secBg.style.transitionDuration="0s";
			d1.style.display="block";
			d2.style.display="block";
			da.style.display="block";
			
			}
		})

})();
