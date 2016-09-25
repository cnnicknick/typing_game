function game(){
 this.clientw=document.documentElement.clientWidth;
 this.clienth=document.documentElement.clientHeight;
 this.letterArr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 this.letterLen=5;
 this.speed=3;
 this.spans=[];
 this.die=10;
 this.sore=0;
 this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
 this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
 this.step=10;//游戏关卡之间相差的得分
 this.aa=1;//游戏第几关
}
game.prototype={
   play:function(){
       //将字母显示到body里面
       this.getLetter(this.letterLen);
       this.move();
       this.key();
   },
    key:function(){
        var that=this;
      document.onkeydown=function(e){
          var ev=e||window.event;
          var code=String.fromCharCode(ev.keyCode);
          for(var i=0;i<that.spans.length;i++){
              if(that.spans[i].innerHTML==code){
                  document.body.removeChild(that.spans[i]);
                  that.spans.splice(i,1);
                  that.getLetter(1);
                  that.sore++;
                  that.soreEle.innerHTML=that.sore;
                  if(that.sore%that.step==0){
                      that.aa++;
					  if(that.aa>6){alert("游戏已通关，你太厉害了！");location.reload();}
					  else{
						alert("第"+that.aa+"关");
						document.getElementsByTagName("select")[0].value=that.aa;//更新关卡显示
						that.next();
					  } 
                  }
              }
          }
      }
    },
	//游戏进入下一关，速度加1，字母数加1
    next:function(){
      clearInterval(this.t);
      for(var i=0;i<this.spans.length;i++){
         document.body.removeChild(this.spans[i]);
      }
        this.spans=[];
        this.speed++;
        this.letterLen++;

        this.play();


    },
	//所有字母图片以速度为speed向下移动
    move:function(){
       var that=this;
       this.t=setInterval(function(){
         for(var i=0;i<that.spans.length;i++){
             var top=that.spans[i].offsetTop+that.speed;
             that.spans[i].style.top=top+"px";
             if(top>that.clienth){//判断是否在屏幕上可见
                 document.body.removeChild(that.spans[i]);
                 that.spans.splice(i,1);
                 that.getLetter(1);
                 that.die--;
                 that.dieEle.innerHTML=that.die;
                 if(that.die==0){//判断玩家生命值是否为0
                     alert("game over!");
                     location.reload();
                 }
             }
         }

       },60)
    },
	//生成五张包含不同字母的图片
    getLetter:function(num){
        //先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        var eleArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            span.innerHTML=arr[i];


            var x=(100+(this.clientw-200)*Math.random());
            var y=(100*Math.random());
            var width=30;
            while (this.check1(posArr,x,width)){
                x=(100+(this.clientw-200)*Math.random());
            }
            posArr.push({minx:x,maxx:x+width});
            span.style.cssText="position:absolute;left:"+x+"px;top:"+y+"px;color:#fff;font-size:30px;";
            document.body.appendChild(span);
           // eleArr.push(span);
            this.spans.push(span);
        }
       // return eleArr;
    },
	//防止新生成的字母覆盖已有字母
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
	//getRand(num)：生成需要显示在屏幕中的num个字母
    getRand:function(num){
       var arr=[];
       for(var i=0;i<num;i++) {
           var rand = Math.floor(this.letterArr.length * Math.random());
           while(this.check(arr,this.letterArr[rand])){
               rand = Math.floor(this.letterArr.length * Math.random());
           }
           arr.push(this.letterArr[rand]);
       }
        return arr;
    },
	//check(arr,val)：检查arr中是否存在val
    check:function(arr,val){
       for(var i=0;i<arr.length;i++){
           if(arr[i]==val){
               return true;
           }
       }
        return false;
    }
}