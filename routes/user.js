const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//查询用户名是否重复
router.get('/sel',(req,res)=>{
	var utel=req.query.utel;
console.log(utel)
	pool.query("select * from user_list Where utel=?",[utel],(err,result)=>{
		console.log(result)
		if(err)throw err;
		if(result.length==0){
			res.send({code:200,msg:'用户名可用'})
		}else{
			res.send({code:400,msg:'用户名已被占用'})
			}
	})
	})
//注册 
router.post('/reg',function(req,res){
	//console.log(333);
	pool.query("INSERT INTO user_list SET ?",[req.body],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'reg suc'})
		}else{res.send({code:400,msg:'reg err'})}
	 })
});


//登陆 get login
router.get("/login",function(req,res){
   var utel=req.query.utel;
   var upwd=req.query.upwd;
   console.log(utel,upwd)
	pool.query('SELECT * FROM user_list WHERE utel=? AND upwd=?',[utel,upwd],function(err,result){
	//console.log(result)
	if(err) throw err;
	if(result.length==0){
		res.send({code:400,msg:"用户名或密码错误"})
	}else{
		res.send({code:200,msg:"登录成功"})
		}
	
	})

})
module.exports=router
