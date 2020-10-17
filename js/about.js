var gY=document.querySelector('#gy')

var exit=document.querySelector('.exit');
var show2=document.querySelector('.show2')
var myPic=document.querySelector('.myHeadpic')
var card5one=document.querySelector('.card5-1');
var card5two=document.querySelector('.card5-2')
gY.onclick=function(){
	show2.style.height=1000+'px';
	show2.style.background='#00000080';
	console.log(i,timer)
	typing();
}
exit.onclick=function(){
	show2.style.height=0;
	show2.style.background='#00000000';
	card5two.style.height=140+'px'

	hTitleone.innerText=" ";
	hTitletwo.innerText=" ";
	hTitletri.innerText=" ";
	return(i=length2+1);
	
}

myPic.onclick=function(){
	if(myPic.classList[1]!=null){
		
		card5two.style.height=60+'%'
		myPic.classList.remove('hide')
	}
	else{
		card5two.style.height=140+'px'
		myPic.classList.add('hide')
	}

}
/* 打字 */
	var i=0;
	var n=0;
	var k=0;
	var timer=0;
	var hTitleone=document.querySelector('.card5-1 h1')
	var hTitletwo=document.querySelector('.card5-1 #hTitletwo')
	var hTitletri=document.querySelector('.card5-1 #hTitletri')
	var str1='人生如戏';
	var str2='每个人的一生都是电影的合辑';
	var str3='希望你在做看客的同时，也讲好自己的故事';
	
	var length1=str1.length+str2.length;
	var length2=str1.length+str2.length+str3.length;
function typing(){
	


	var str1='人生如戏';
	var str2='每个人的一生都是电影的合辑';
	var str3='希望你在做看客的同时，也讲好自己的故事';
	
	var length1=str1.length+str2.length;
	var length2=str1.length+str2.length+str3.length;
	if(i<=str1.length){
		i++;
		hTitleone.innerText=str1.slice(0, i);
		timer = setTimeout(typing, 400);
	}
	else if(i>str1.length&&i<=length1){
		i++;
		n++;
		hTitletwo.innerText=str2.slice(0, n);
		timer = setTimeout(typing, 400);
	}
	else if(i>length1&&i<=length2){
		i++;
		k++
		hTitletri.innerText=str3.slice(0, k);
		timer = setTimeout(typing, 400);
	}
	else{
		clearTimeout(timer);
		return(i=0,n=0,k=9,timer=0)
		
	}
}
