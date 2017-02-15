var DefaultBoxwidth=800;
var DefaultBoxheight=600;
var DefaultPhotowidth=400;
var DefaultPhotoheight=300;
var curIndex=0;
"use strict";
function Photoshow() {
    this.Boxwidth=DefaultBoxwidth;
    this.Boxheight=DefaultBoxheight;
    this.Photowidth=DefaultPhotowidth;
    this.Photoheight=DefaultPhotoheight;
    this.Photobox=[];
}
Photoshow.prototype.add = function (url) {
    if(typeof url !== 'string')
        throw new TypeError();
    if (this.Photobox.length ===0){
        this.Photobox[0]=url;
    }
    else {
        this.Photobox[this.Photobox.length]=url;
    }
};

Photoshow.prototype.remove = function (index){
    if (isNaN(index))
        throw new TypeError();
    if (index+1>this.Photobox.length)
        return alert("Out of index");
    delete this.Photobox[index];
    this.Photobox = this.Photobox.filter(function(x) { return typeof x == "undefined"});
};

Photoshow.prototype.switch = function (index1,index2) {
    if (isNaN(index1) || isNaN (index2)) 
        throw new TypeError();
    if (index1+1>this.Photobox.length || index2+1>this.Photobox.length)
        return alert("Out of index");
    var tem= this.photobox[index1];
    this.Photobox[index1]= this.Photobox[index2];
    this.Photobox[index2]=tem;
    delete tem;
};
Photoshow.prototype.SetPhotowh = function (w,h){
    if (w>this.Boxwidth || h>this.Boxheight)
        throw new RangeError();
    this.Photowidth=w;
    this.Photoheight=h;
};
Photoshow.prototype.SetBoxwh = function (w,h) {
    if (w<this.Photowidth || h<this.Photoheight)
        throw new RangeError();
    this.Boxwidth=w;
    this.Boxheight=h;
};
Photoshow.prototype.GetPhotoArry= function (){
    (function (){return this.Photobox;});
};
Photoshow.prototype.build = function () {
    var PhotoList='';
    for(var i=0;i<this.Photobox.length;i++){
        PhotoList=PhotoList+"<li class='Photo' style='display:inline-block; list-style: none; '><img src='"+this.Photobox[i]+"' width='"+this.Photowidth+"px' height='"+this.Photoheight+"px'></li>"
    }
    document.write("<div class='Photoshowbox'style='margin:0px; padding:0px;'><div class='Photobanner' style='overflow: hidden;position:relative;margin:0px; padding:0px;'><ul class='Photolist' style='position:relative; overflow: hidden;margin:0px; padding:0px;'>"+photolist+"</ul></div></div>");
    document.getElementsByClassName("Photoshowbox")[0].style.width= this.boxwidth+"px";
    document.getElementsByClassName("Photoshowbox")[0].style.height=this.boxheight+"px";
    document.getElementsByClassName("Photoshowbox")[0].style.backgroundColor=this.BackgroungColor;
    document.getElementsByClassName("Photobanner")[0].style.width=this.photowidth+"px";
    document.getElementsByClassName("Photobanner")[0].style.height=this.photoheight+"px";
    document.getElementsByClassName("Photobanner")[0].style.left=(this.boxwidth-this.photowidth)/2+"px";
    document.getElementsByClassName("Photobanner")[0].style.top=(this.boxheight-this.photoheight)/2+"px";
    document.getElementsByClassName("Photolist")[0].style.width=this.photowidth*this.photobox.length+"px";
    document.getElementsByClassName("Photolist")[0].style.height=this.photoheight+"px";
    
};
Photoshow.prototype.SetBackground = function(BackgroungColor){
    this.BackgroungColor=BackgroungColor;
}
function AutoChange (target) {
    var imgLen=target.Photobox.length;
    var photoLen=target.Photowidth;
    var autoChange = setInterval(function(){ 
    if(curIndex < imgLen -1){ 
      curIndex ++; 
    }else{ 
      curIndex = 0;
    }
    //调用变换处理函数
    changeTo(curIndex); 
  },2500);
 
  //清除定时器时候的重置定时器--封装
  function autoChangeAgain(){ 
      autoChange = setInterval(function(){ 
      if(curIndex < imgLen -1){ 
        curIndex ++;
      }else{ 
        curIndex = 0;
      }
    //调用变换处理函数
      changeTo(curIndex); 
    },2500);
    }
 
  //调用添加事件处理
  addEvent();
 

 function addEvent(){
     var indexArr=document.getElementsByClassName("Photolist")[0].getElementsByTagName("li");
     for(var i=0;i<imgLen;i++){ 
    //闭包防止作用域内活动对象item的影响
    (function(_i){ 
    //鼠标滑过则清除定时器，并作变换处理
    indexArr[_i].onmouseover = function(){ 
      clearTimeout(autoChange);

      curIndex = _i;
    };
    //鼠标滑出则重置定时器处理
    indexArr[_i].onmouseout = function(){ 
      autoChangeAgain();
    };
     })(i);
  }
 
}
 
  //左右切换处理函数
  function changeTo(num){ 
    //设置image
    var imgList = document.getElementsByClassName("Photolist")[0];
    goLeft(imgList,num*photoLen); //左移一定距离
  }
 
 
  //图片组相对原始左移dist px距离
  function goLeft(elem,dist){
      if(dist == photoLen){ //第一次时设置left为0px 或者直接使用内嵌法 style="left:0;"
      elem.style.left = "0px";
    }
    var toLeft; //判断图片移动方向是否为左
    dist = dist + parseInt(elem.style.left); //图片组相对当前移动距离
    if(dist<0){  
      toLeft = false;
      dist = Math.abs(dist);
    }else{ 
      toLeft = true;
    }
      console.log(dist);
    for(var i=0;i<= dist/20;i++){ //这里设定缓慢移动，10阶每阶40px
      (function(_i){ 
        var pos = parseInt(elem.style.left); //获取当前left
        if(toLeft==true){
          setTimeout(function(){ 
          pos += -(dist*Math.sin(Math.PI*_i*10/dist)) ; //根据toLeft值指定图片组位置改变
          elem.style.left = pos + "px";
        },_i * 25);
        }
        else{
          setTimeout(function(){ 
          pos += +(dist*Math.sin(Math.PI*_i*10/dist)) ; //根据toLeft值指定图片组位置改变
          elem.style.left = pos + "px";
        },_i * 15);  
        }
      })(i);
    }
  }
}
autochange().
                                 
