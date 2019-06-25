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
			res.send({code:200,msg:'注册成功'})
		}else{res.send({code:400,msg:'注册失败'})}
	 })
});


//登陆 get login
router.post("/login",function(req,res){
   var utel=req.body.utel;
   var upwd=req.body.upwd;
   //console.log(utel,upwd)
	pool.query('SELECT uid FROM user_list WHERE utel=? AND upwd=?',[utel,upwd],function(err,result){
	console.log(result)
	if(err) throw err;
	if(result.length==0){
		res.send({code:400,msg:"用户名或密码错误"})
	}else{
		req.session.uid=result[0].uid
		res.send({code:200,msg:"登录成功"})
		}
	
	})

})

//购物车 查询
router.get("/cart",function(req,res){
	var uid=req.session.uid;
	pool.query('SELECT * FROM user_car WHERE uid= ? ',[uid],function(err,result){
		if(err) throw err;
		res.send({code:200,msg:result});
		//console.log(result)
	})
})

//购物车 删除商品
router.post('/del',function(req,res){
	var class_name=req.body.class_name;
	//console.log(class_name);
	pool.query("DELETE FROM `user_car` WHERE class_name= ? ",[class_name],function(err,result){
		if(err)throw err;
		//console.log(result);
		if(result.affectedRows>0){
			res.send({code:200,msg:'del suc'})
		}else{res.send({code:400,msg:'del err'})}
	 })
});

//商品列表  ?
router.get("/pro",function(req,res){
	pool.query('SELECT * FROM book_class',function(err,result){
		if(err) throw err;
		res.send({code:200,msg:result});
		//console.log(result)
	})
})


//添加产品
router.post('/add',function(req,res){
	var class_name=req.body.class_name;
	var class_count=req.body.class_count;
	var uid=req.session.uid;

	//console.log(result)
	pool.query(`SELECT class_id ,class_price FROM book_class WHERE class_name=?`,[class_name],(err,result1)=>{
			var class_id=result1[0].class_id;
			var class_price=result1[0].class_price;
			//console.log(class_id,class_price)
			pool.query(`SELECT * FROM user_car WHERE class_id=?`,[class_id],(err,result)=>{
				if(result.length==0){
					//console.log(class_id);
					pool.query("INSERT INTO user_car VALUE(null,?,? ,? ,? ,?)",[uid,class_id,class_name,class_count,class_price],function(err,result){
						if(err)throw err;
						if(result.affectedRows>0){
							res.send({code:200,msg:'该商品已加入购物车'});
						}else{
							res.send({code:400,msg:'add err'});
						}
					})
				}else{
					pool.query("UPDATE user_car SET class_count=class_count+? WHERE class_id= ?",[class_count,class_id],function(err,result){
						//console.log(222);
						if(err)throw err;
						if(result.affectedRows>0){
							res.send({code:200,msg:'该商品已加入购物车'});
						}else{
							res.send({code:400,msg:'add err'});
						}
			})

		}
	})
	})
	
});
module.exports=router
