$
//$(function(){
	$(window).on("load",function(){
	$(this).axios.get("cart",{uid:1}).then(result=>{
		console.log(result);
		var rows=result.data.data;

	})


    var $checkAll=$(".checkAll");
    var $checks=$(".check");
    //console.log($checkAll,$checks)
    $checkAll.click(function(){//全选
        $checks.prop("checked",this.checked)
        loadCar();
    });
    //一个未选中 全选就不选
    var $carC=$(".carC");
    //console.log($carC)
    $carC.on("click",".check",function(){
        loadCar();
    })
    //点击事件更改数量
    $carC.on("click","button",function(){
        if($(this).html()=="+"){
            var con=$(this).prev().html();
            con++;
            $(this).prev().html(con)
           // console.log($(this))
        }else{
            var con=$(this).next().html(); 
            if(con>1){
                con--;
                $(this).next().html(con);
            }
        }
        //小计
        var $sumprice=$(this).parent().next();
        var $price=$(this).parent().prev().html().slice(1);
         $sumprice.html(`￥${(con*$price).toFixed(2)}`);
        console.log($price)
        loadCar();
    })
//删除
    $carC.on("click",".remove",function(){
        var $del=$(this).parent();
        if(confirm("确认删除该商品？")){
            $del.remove();
        }
            loadCar();
        
    })

    //遍历checks
    function loadCar(){
        var isChecked=true;
        $checks.each(function(i,item){
           // console.log(item)
            if(!item.checked){
                isChecked=false;
            }
        })
        $checkAll.prop("checked",isChecked);//一个单选未选中 全选就不勾选
        var $checked=$(".check:checked")//被选中的商品影响总计总件数
        var totalprice=0;
        var totalcount=0;
        //遍历被选中的商品  得到小计 总计
        //$checked.each(function(i,item){
        for(var i=0;i<$checked.length;i++){
            var price=$($checked[i]).next().next().html().slice(1);
            var con=$($checked[i]).next().next().next().children("#con").html();
            //总计   
            totalprice+=price*con;
             totalcount+=parseInt(con);
             $(".total").html(`共计${totalcount}件商品，金额￥${totalprice.toFixed(2)}元`)
            //console.log(totalcount)
        }
   }
   
})