window.onload=function () {
	$(function(){
		    $(".nav-li").mouseover(function(){
		        $(this).find(".sub-nav").stop(false,true).slideDown(500);
		    }).mouseout(function(){
		        $(this).find(".sub-nav").stop(false,true).slideUp(200);
		    })

	});
	var backTop=document.getElementById("back_top");
	backTop.onclick=function () {
		var scrolltop=window.scrollY||document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;
		let timer=setInterval(function () {
			window.scrollBy(0,-100);
			if (window.scrollY==0){
			    clearInterval(timer);
			}
		},30);
	};

    let bannerImg=document.querySelectorAll('.banner>ul>li');
    let dian=document.querySelectorAll('.dot>ul>li');
    let bannerBox=document.getElementsByClassName('banner')[0];
    let btnl=bannerBox.querySelector('.left');
    let btnr=bannerBox.querySelector('.right');
    let timer=setInterval(move,4000);

    let [now,next]=[0,0];
    let flag=true;
    for (let i=1;i<bannerImg.length;i++){
        bannerImg[i].style.left='1200px';
    }

    function move(type) {
        type=type||'right';
        if (type=='right'){
            next++;
            if (next==bannerImg.length){
                next=0;
            }
            bannerImg[now].style.left='0px';
            bannerImg[next].style.left='1200px';
            animate(bannerImg[now],{left:-1200},2500,function () {
                flag=true;
            });
            animate(bannerImg[next],{left:0},2500);
            dian[now].style.backgroundColor='#c1383e';
            dian[next].style.backgroundColor='#23527c';
            console.log(now,next);

        }else if (type=='left'){
            next--;
            if (next==-1){
                next=bannerImg.length-1;
            }
            bannerImg[now].style.left='0';
            bannerImg[next].style.left='-1200px';
            animate(bannerImg[now],{left:1200},2500);
            animate(bannerImg[next],{left:0},2500,function () {
                flag=true;
            });
            dian[now].style.backgroundColor='#c1383e';
            dian[next].style.backgroundColor='#23527c';
        }
        now=next;
    }
    for (let j=0;j<dian.length;j++){
        dian[j].ai=j;//通过设置当前元素的属性ai与j相对应  保存当前下标值
        dian[j].onmouseover=function () {
            clearInterval(timer);
            if (this.ai>now){
                next=this.ai-1;
                if (flag){
                    move('right');
                    flag=false;
                }
            }
            if (this.ai<now){
                next=this.ai+1;
                if (flag){
                    move('left');
                    flag=false;
                }
            }
        }
    }
    bannerBox.onmouseover=function () {
        clearInterval(timer);
    };
    bannerBox.onmouseout=function () {
        timer=setInterval(move,4000);
    };

    btnl.onclick=function () {
        clearInterval(timer);
        if (flag){
            move('left');
            flag=false;
        }

    };
    btnr.onclick=function () {
        clearInterval(timer);
        if (flag){
            move('right');
            flag=false;
        }
    };
};

