$(function(){
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
})