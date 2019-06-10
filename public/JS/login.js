(function(){
	var login=document.getElementById("login");
	var logNum=login.querySelector(".user-login a[data-target=use-num]");
	var logTel=login.querySelector(".user-login a[data-target=use-tell]");
	var view=document.getElementById("view");
	//var phonelogin=document.getElementById("view")
	//console.log(phonelogin);
	function fun(){
		var log=this;
		var id=log.getAttribute("data-target");
        var div=document.getElementById(id);
        return div;
        
	}
		logNum.onclick=function(){
			//login.style.display="none";
			fun.call(this).className="";
			fun.call(logTel).className="inputnone";
	}
		logTel.onclick=function(){
			fun.call(this).className="";
			fun.call(logNum).className="inputnone";
	}
	
//ajax
	var utel=document.getElementsByName("utel")[0];
	var upwd=document.getElementsByName("upwd")[0];
	//console.log(utel.value,upwd.value)
	view.onclick=function(){
			var xhr=new XMLHttpRequest();
			//console.log(xhr)
			xhr.open("post","/user/login",true);
			var formdata="utel="+utel.value+"&upwd="+upwd.value;
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
			xhr.send(formdata);
			xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				//console.log(11)
			var result=xhr.responseText;
				result=JSON.parse(result);
				if(result.code==200){
					var ressuc=document.getElementById("ressuc");	
					var tim=document.getElementById("tim")
					ressuc.style.display="block"
						var i = 5;
						var t= setInterval(function() {
							if (i == 0) {
								window.location.href = "index.html";
								clearInterval(t);
							}
							tim.innerHTML = i;
							i--;
							}, 1000);
						}else{
							alert("用户名或密码错误！")
						}
			}
			}

		}


})()
