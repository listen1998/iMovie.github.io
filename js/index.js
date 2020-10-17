/* 导航条 */

var headerList=document.querySelectorAll('nav a');

headerList.forEach(function(item){
	item.onclick=function(){
		headerList.forEach(function(item2){
			item2.classList.remove('on0');
		})
		item.classList.add('on0');
	
	}
})







/* 轮播 */
var images=document.querySelectorAll("#pic>div");
var pic=document.querySelector("#pic")
var titles=document.querySelectorAll(".littleTitle")
var list=document.querySelectorAll('#pic ul li')
var btnLeft=document.querySelector('.left');
var btnRight=document.querySelector('.right');
var index =0;
var time =null;
		
function auto(){	
	time=setInterval(function(){
		index++;
		if(index>=5){
			index=0;
		}
		change(index);
	},3000)
}
auto();

function change(curIndex){
	images.forEach(function(item){
		item.classList.remove("on1");		
	})
	images[curIndex].classList.add("on1");
	titles.forEach(function(item){
		item.classList.remove('on2');
	})
	titles[curIndex].classList.add('on2');
	list.forEach(function(item){
		item.classList.remove('on');
	})
	list[curIndex].classList.add('on');
	index=curIndex;
}

list.forEach(function(item,index){
		item.id=index;
		item.onclick=function(){
			console.log(this.id)
			change(this.id);
		}
	})

btnRight.onclick=function(){
	if(index<4){
		change(index+1);
	}
	else{
		change(0);
	}
	
}
btnRight.onmouseover=function(){
	clearInterval(time);
}
btnRight.onmouseout=function(){
	auto();
}
btnLeft.onmouseover=function(){
	clearInterval(time);
}
btnLeft.onmouseout=function(){
	auto();
}

btnLeft.onclick=function(){
	if(index>0){
		change(index-1);
	}
		
	else{
		index=4;
		change(index);
	}

}



























/* Ajax请求 */
function GetAjax(htttpUrl,callbackFn){
	// 创建xhr对象
	var xhr=new XMLHttpRequest()
	// 设置请求方法和路径
	xhr.open("GET",htttpUrl)
	// 发送数据
	xhr.send()
	// 监听后台是否返回数据
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			callbackFn(xhr)
		}
	}
	
}

/* 热门 */
var card2=document.querySelector('.card2')

var httpUrl="https://douban.uieee.com/v2/movie/top250?start=150&count=14"
var httpUrl2="http://api.tianapi.com/txapi/dialogue/index?key=8b6531c69bf9b8ce415129425612bd44"
var httpUrl3="https://douban.uieee.com/v2/movie/subject/1306861/photos?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=20"
var httpUrl4="https://douban.uieee.com/v2/movie/subject/1292052/comments?start=0&count=5&apikey=0df993c66c0c636e29ecbb5344252a4a"
var fn=function(xhr){
	var data=JSON.parse(xhr.response)
	console.log(data)
	var movieList=data.subjects
	renderMovieList(movieList)
}
function renderMovieList(movieList){
	movieList.forEach(function(item,index){
			
			var card=document.createElement("div")
			card.className="card2-1"
			card2.appendChild(card)
			
			card.innerHTML=`
				<a href="detail.html?id=${item.id}"><img src=${item.images.small}></a>
				<a href="detail.html?id=${item.id}">${item.title}</a><br><br>
				<a href="#" style="color: orangered;">${item.rating.average}</a>
			`
			

	})
	
}
GetAjax(httpUrl,fn)

 /* 今日推荐 台词*/
var fn2=function(xhr){
	var data=JSON.parse(xhr.response)
	var linesList=data.newslist
	renderLinesList(linesList)
}

function renderLinesList(linesList){
	var card4one=document.querySelector('#card4one');
	var line=document.createElement('div')
	line.className="lines"
	card4one.appendChild(line)
	line.innerHTML=`
		<p>"${linesList[0].dialogue}"</p>

		<p style="color: orangered;text-shadow: #000000 1px 1px 1px;">"${linesList[0].source}"</p>
	`
}
function linesNumber(Number){
	for(var i=1;i<=Number;i++){
		GetAjax(httpUrl2,fn2)
	}
}

linesNumber(8);





/* 今日推荐 */
var liList=document.querySelectorAll('.card4 nav li');
var card4List=document.querySelectorAll('.card4 .card4-1');
// console.log(liList);
// console.log(card4List);
/* Tab切换 */
liList.forEach(function(item1,index1){


	item1.onclick=function(){
		liList.forEach(function(item){
			item.classList.remove('onshow')
		})
		card4List.forEach(function(item2){
			item2.classList.remove('on3')
		})
		item1.classList.add('onshow')
		card4List[index1].classList.add('on3')
		
	}
})


/* 今日推荐 剧照 */
var card4two=document.querySelector('#card4two');
var fn3=function(xhr){
	var data=JSON.parse(xhr.response)
	var photoList=data.photos;
	photoList.forEach(function(item){
		var card4images=document.createElement('div')
		card4images.className='card4-1-images'
		card4two.appendChild(card4images);
		card4images.innerHTML=`
			<img src=${item.thumb}>
		`
	})
}
GetAjax(httpUrl3,fn3)

/* 今日推荐 影评 */
var card4tri=document.querySelector('#card4tri');
var fn4=function(xhr){
	var data=JSON.parse(xhr.response)
	var commentsList=data.comments;
	commentsList.forEach(function(item){
		var comment=document.createElement('div');
		comment.className='comments';
		card4tri.appendChild(comment);
		comment.innerHTML=`
			<div class="headpic">
				<img src=${item.author.avatar}>
			</div>
			<div class="comment">
				<a style="padding: 5px;">${item.content}</a>
			</div>
		`
	})
}
GetAjax(httpUrl4,fn4)


/* 刷新 换一批*/
var sx=document.querySelector('#refresh');

	var number1=5;
	var number2=5;
sx.onclick=function(){
	number1++;
	number2=number2+5;
	var httpUrl5="https://douban.uieee.com/v2/movie/subject/1306861/photos?apikey=0df993c66c0c636e29ecbb5344252a4a&start="+number1+"&count=20"
	var httpUrl6="https://douban.uieee.com/v2/movie/subject/1292052/comments?start="+number2+"&count=5&apikey=0df993c66c0c636e29ecbb5344252a4a"
	var card4one=document.querySelector('#card4one');
	var card4two=document.querySelector('#card4two');
	var card4tri=document.querySelector('#card4tri');
	card4one.innerHTML=" ";
	card4two.innerHTML=" ";
	card4tri.innerHTML=" ";
	
	if(card4tri.innerHTML=null){
		console.log("ok")
	}
	linesNumber(8);
	GetAjax(httpUrl5,fn3);
	GetAjax(httpUrl6,fn4);
	
	
}

/* 滚轮事件*/
function headerTab(number){
	headerList.forEach(function(item2){
		item2.classList.remove('on0');
	})
	headerList[number].classList.add('on0');
}
window.onscroll=function(){
	var header=document.querySelector('header');
	var card2=document.querySelector('.card2');
	var oneP=document.querySelector('#oneP')
	var part3=document.querySelector('.part3')
	var card4=document.querySelector('.card4')
	var threeP=document.querySelector('#threeP')
	var backpic=document.querySelector('.backpic')
	if(window.pageYOffset>=100){
		header.style.position='fixed';
		header.style.left=0;
		header.style.top=0;
	}
	if(window.pageYOffset>=0&&window.pageYOffset<800){
		headerTab(0);
		backpic.style.opacity=0
	}
	else if(window.pageYOffset>=800&&window.pageYOffset<1800){
		headerTab(1);
		card2.style.height=700+'px';
		oneP.style.opacity=1;
		backpic.style.opacity=1
	}
	else if(window.pageYOffset>=1800&&window.pageYOffset<2800){
		headerTab(2);
		part3.style.height=100+'%';
		backpic.style.opacity=1
	}
	else if(window.pageYOffset>=2800&&window.pageYOffset<4000){
		headerTab(3);
		card4.style.width=80+'%'
		threeP.style.height=140+'px'
		backpic.style.opacity=1
	
	}
}

/* 关于 退出 */
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
