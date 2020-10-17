var main=document.querySelector('.main')

main.style.opacity=1
/* 搜索 */
var searchIcon=document.querySelector('.searchIcon')
var search=document.querySelector('.search')
var input1=document.querySelector('input')
searchIcon.onclick=function(){
	search.style.width=500+'px'
	input1.style.opacity=1
	if(input1.value!=""){
		var inputvalue=input1.value
		
		window.location.href="detail.html?id="+inputvalue+""
		
	}
	input1.value=""
}














var httpUrl1="https://douban.uieee.com/v2/movie/top250?start=120&count=12"

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
			// console.log("sucess!")	
			// console.log(xhr)
			// console.log(xhr.status)
			// console.log(xhr.readyState)
			// 将数据显示在页面上
			callbackFn(xhr)
		}
	}
	
}
var fn1=function(xhr){
	var data=JSON.parse(xhr.response)
	var movieList=data.subjects

	rendermovieList(movieList)
	
}
// var contentsmain=document.querySelector('.onshow .contentsmain')
function rendermovieList(movieList){
	var contentsmain=document.querySelector('.onshow .contentsmain')
	movieList.forEach(function(item){
		var content=document.createElement('dic')
		content.className='content'
		contentsmain.appendChild(content)
		content.innerHTML=`
			<a href="detail.html?id=${item.id}"><img src=${item.images.large}></a>
			<a href="detail.html?id=${item.id}">${item.title}<span>&nbsp;${item.rating.average}</span></a>
		
		
		
		`	
	})
}
GetAjax(httpUrl1,fn1)

var liList=document.querySelectorAll('.tag li')
var contentsList=document.querySelectorAll('.contents')
liList.forEach(function(item,index){
	item.onclick=function(){
		liList.forEach(function(item1){
			item1.classList.remove('checked')
		})
		contentsList.forEach(function(item2){
			item2.classList.remove('onshow')
		})
		item.classList.add('checked')
		contentsList[index].classList.add('onshow')
		var contentsmain=document.querySelector('.onshow .contentsmain')
		contentsmain.innerHTML=" "
		GetAjax(httpUrl1,fn1)
	}
	
})

/* 加载更多 */
var count2=12
var contentsfooter=document.querySelector('.onshow .contentsfooter')
contentsfooter.onclick=function(){
	changenumber()
	var httpUrl3="https://douban.uieee.com/v2/movie/top250?start="+count2+"&count=12"
	GetAjax(httpUrl3,fn1)
}

/* 发布 */
var stories=document.querySelector('.stories')

var send=document.querySelector('#send')

var commentWrap=document.querySelector('.myComment-wrap')
stories.onclick=function(){
	var input2=document.querySelector('.stories textarea')
	stories.style.height=200+'px'
	input2.style.height=150+'px'
}


send.onclick=function(){
	var input2=document.querySelector('.stories textarea')
	var myComment=input2.value

	if(myComment!=""){

		var myComments=document.createElement('div')
		myComments.className='myComment'
		commentWrap.appendChild(myComments)
		myComments.innerHTML=`
			<div class="sendedComment">
				<span>“</span><p>${myComment}</p>
			</div>
			<div class="people">
				<img src="img/qq.jpg">
				<div class="people-P">
					<p>游客</p>
					<p>i Movie,i Story</p>
				</div>
			</div>	
		
		
		`
	}
	input2.value=""
	
}









/* aside 侧边评论*/
var count=5
var httpUrl2="https://douban.uieee.com/v2/movie/subject/1300992/comments?start=0&count="+count+"&apikey=0df993c66c0c636e29ecbb5344252a4a"

function fn2(xhr){
	var data=JSON.parse(xhr.response)
	var comments=data.comments
	console.log(comments)
	var asideBody=document.querySelector('.asideBody')
	
	comments.forEach(function(item){
		var sended=document.createElement('div')
		sended.className='sended'
		asideBody.appendChild(sended)
		sended.innerHTML=`
			<div class="sendedComment">
				<span>“</span><p>${item.content}</p>
			</div>
			<div class="people">
				<img src=${item.author.avatar}>
				<div class="people-P">
					<p>${item.author.name}</p>
					<p>${item.author.signature}</p>
				</div>
			</div>	

		`
		
		
	})
}
GetAjax(httpUrl2,fn2)
// 换个心情
var change=document.querySelector('#change')

function changenumber(){
		count=count+5
		count2=count2+12
		return(count,count2)
	}
change.onclick=function(){
	var sended=document.querySelectorAll('.sended')
	sended.forEach(function(item){
		item.parentNode.removeChild(item)
	})
	
	var httpUrl3="https://douban.uieee.com/v2/movie/subject/1300992/comments?start="+count+"&count=5&apikey=0df993c66c0c636e29ecbb5344252a4a"
	changenumber()
	console.log(count)
	GetAjax(httpUrl3,fn2)
}

