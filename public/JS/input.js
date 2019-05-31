(function(){
	function put(put,reg){
		var warn=put.nextElementSibling;
		if(!(reg.test(put.value))){
			warn.style.visibility="visible";
		}else{
			warn.innerHTML=`格式正确!`;
			warn.style.color="#1BBC9B";
		}
	}
	//登录 账号登陆
	var Input=document.getElementsByName("utel")[0];
	Input.onblur=function(){
		//console.log(warn);
		var reg=/^1[34578]\d{9}$/;
		put(Input,reg);
	}
	//登录 login 密码:6-12位数字或字母
	var upwd=document.getElementsByName("upwd")[0];
	upwd.onblur=function(){
		var reg=/^(\w){6,12}$/;
		put(upwd,reg);
	}
	
	var telPut=document.getElementsByName("utel")[1];
	telPut.onblur=function(){
		//console.log(warn);
		var reg=/^1[34578]\d{9}$/;
		put(telPut,reg);
	}
})()