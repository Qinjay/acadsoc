//$(function(){
$(window).on("load",function(){

    var $app=$("#app");
    var n;
    $app.on("click","button",function(){
        var btext=$(this).html();
        if(btext=="+"){
            var n=$(this).prev().html();
            n++;
            $(this).prev().html(n);
            }else{
                var n=$(this).next().html();
                n--;
                if(n>0){
            $(this).next().html(n);}
                }

         
    })

    $(".btn").click(function(){
       // console.log($(this))
        var count=$(this).parent().prev().children("#con").html();
        var pname=$(this).parent().parent().prev().prev().prev().html().slice(3);
    
        $.post("/user/add",{class_count:count,class_name:pname},function(result){
            alert(result.msg)
            
        })
    })
})