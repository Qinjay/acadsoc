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
	//注册 register
	var Input=document.getElementsByName("utel")[0];
	var Inputupwd=document.getElementsByName("upwd")[0];
	var view=document.getElementById("view")
	Input.onblur=function(){
		//console.log(warn);
		var xhr=new XMLHttpRequest();
			//console.log(xhr)
			xhr.open("get",`/user/sel?utel=${Input.value}`,true);
			xhr.send(null);
			xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				//console.log(11)
			var result=xhr.responseText;
				//console.log(result);
				result=JSON.parse(result);
				if(result.code==200){
					var reg=/^1[34578]\d{9}$/;
					put(Input,reg);
				}else{
				var warn=Input.nextElementSibling;
				warn.innerHTML=`用户名被占用!`;
				}
			}
			}
	}	
	//console.log(view,Input,Inputupwd)
	view.onclick=function(){
		//console.log(Inputupwd.value);
		var xhr=new XMLHttpRequest();
		xhr.open("post","/user/reg",true);
		var formdata="utel="+Input.value+"&upwd="+Inputupwd.value;
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
		xhr.send(formdata);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				var result=xhr.responseText;
				result=JSON.parse(result);
				console.log(result);
				if(result.code==200){
				window.location.href="index.html";}

			}
		
		}
	}





})()