
//$(function(){
$(window).on("load",function(){
	$.get("/user/cart",{"uid":1},function(result){
        var msg=result.msg;
        //console.log(msg)
        var html="";
     for(var i=0;i<msg.length;i++){
        //console.log(msg[i]);
        //cId.push(msg[i].class_id);
        html+=
        `<ul>
            <li><input type="checkbox" class="check"></li>
            <li>${msg[i].class_name}</li>
            <li class="price">￥${(msg[i].class_price).toFixed(2)}</li>
            <li>
                <div>
                    <button>-</button>
                    <span id="con">${msg[i].class_count}</span>
                    <button>+</button>
                </div>
            </li>
            <li class="sumprice">￥${((msg[i].class_price)*(msg[i].class_count)).toFixed(2)}</li>
            <li class="remove"><a href="javascrpt:;">删除</a> </li>
        </ul>`
    }
    $(".carC").html(html);
   

    var $checkAll=$(".checkAll");
    var $checks=$(".check");
    var $carC=$(".carC");
    //console.log($checkAll,$checks)
    $checkAll.click(function(){//全选
        //console.log(this.checked);
        $checks.prop("checked",this.checked);
		loadCart();
    });
    //一个未选中 全选就不选
    $carC.on("click",".check",function(){
        loadCart();
    })
    //点击事件更改数量
    $carC.on("click","button",function(){
        if($(this).html()=="+"){
            var con=$(this).prev().html();
            con++;
            $(this).prev().html(con)
        }else{
            var con=$(this).next().html(); 
            if(con>1){
                con--;
                $(this).next().html(con);
            }
        }
        //小计
        var $sumprice=$(this).parent().parent().next();
        var $price=$(this).parent().parent().prev().html().slice(1);
         $sumprice.html(`￥${(con*$price).toFixed(2)}`);
        loadCart();
    })
//删除 商品名称
    $carC.on("click",".remove",function(){
        var $del=$(this).parent();
        var $class_name=$(this).parent().children("li:nth-child(2)").html();
        if(confirm("确认删除该商品？")){
            $.post("/user/del",{"class_name":$class_name},function(result){
                if(result.code==200){
                console.log("商品删除成功！")} ;
                $del.remove();
            })
        }
            loadCart();
    })
})
    //遍历checks
    function loadCart(){
        var $checkAll=$(".checkAll");
        var $checks=$(".check");
        var isChecked=true;
        $checks.each(function(i,item){
            if(!item.checked){
                isChecked=false;
            }
        })
        $checkAll.prop("checked",isChecked);//一个单选未选中 全选就不勾选
        var $checked=$(".check:checked")//被选中的商品影响总计总件数
        var totalprice=0;
        var totalcount=0;
        //遍历被选中的商品  得到小计 总计
        for(var i=0;i<$checked.length;i++){
           var price=$($checked[i]).parent().parent().children(".sumprice").html().slice(1);
           //console.log($checked[i]);
           var con=$($checked[i]).parent().parent().children("li:nth-child(4)").children().children("#con").html();
         //  console.log(price,con);
            //总计   
            totalprice+=price*con;
             totalcount+=parseInt(con);
            }
            $(".total").html(`共计${totalcount}件商品，金额￥${totalprice.toFixed(2)}元`)
   }
   
})