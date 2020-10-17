// 电影搜索渲染
var search=document.querySelector('.searchIcon')

var details=document.querySelector('.detailWrap')
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
function fn(xhr){
	var data=JSON.parse(xhr.response)
	var item=data.result

		console.log(item)
		var detail=document.createElement('div')
		detail.className='detail'
		details.appendChild(detail)
		detail.innerHTML=`		
			<div class="detail-title">
					<h2>${item.title}(${item.year})<span>${item.rating}</span></h2>
				</div>
				<div class="detail-content">
					<img src=${item.cover}>
					<ul>
						<li>导演:&nbsp;&nbsp;<a href="#">${item.dir}</a></li>
						<li>编剧:&nbsp;&nbsp;<a href="#">${item.dir}</a></li>
						<li>主演:&nbsp;&nbsp;<a href="">${item.act}</a></li>
						<li>类型:&nbsp;&nbsp;<a href="">${item.tag}</a></li>
						<li>国家/地区:&nbsp;&nbsp;<a href="">${item.area}</a></li>
						<li>语言:&nbsp;&nbsp;<a href="">${item.area}</a></li>
						<li>上映时间:&nbsp;&nbsp;<a href="">${item.year}</a></li>

					</ul>
				</div>
				<div class="introduce">
					<h3>剧情简介：</h3>
					<p>${item.desc}</p>
				</div>
			
			</div>
			
		`	
	// })
}
search.onclick=function(){
	
	var input=document.querySelector('#search')
	var value=input.value
	if(value!=""){
		details.innerHTML=" "
		var httpUrl="http://zhouxunwang.cn/data/?id=62&q="+value+"&key=UL6T+4huG4z+iJ2J+4I7RWrBOwTgsJeZ/px07w"
		
		GetAjax(httpUrl,fn)
	}
	input.value=""
}



var localLoc=window.location.href
var locationLength=localLoc.length
var id=localLoc.slice(locationLength-7,locationLength)
console.log(id)
var httpUrl2="https://douban.uieee.com/v2/movie/"+id+""
function fn2(xhr){
	var data=JSON.parse(xhr.response)
	// console.log(data.attrs)
	var detail=document.createElement('div')
	detail.className='detail'
	details.appendChild(detail)
	detail.innerHTML=`		
		<div class="detail-title">
				<h2>${data.title}(${data.attrs.year})<span>${data.rating.average}</span></h2>
			</div>
			<div class="detail-content">
				<img src=${data.image}>
				<ul>
					<li>导演:&nbsp;&nbsp;<a href="#">${data.attrs.director}</a></li>
					<li>编剧:&nbsp;&nbsp;<a href="#">${data.attrs.writer}</a></li>
					<li>主演:&nbsp;&nbsp;<a href="">${data.attrs.cast}</a></li>
					<li>类型:&nbsp;&nbsp;<a href="">${data.attrs.movie_type}</a></li>
					<li>国家/地区:&nbsp;&nbsp;<a href="">${data.attrs.country}</a></li>
					<li>语言:&nbsp;&nbsp;<a href="">${data.attrs.language}</a></li>
					<li>上映时间:&nbsp;&nbsp;<a href="">${data.attrs.year}</a></li>
					<li>片长:&nbsp;&nbsp;<a href="">${data.attrs.movie_duration}</a></li>
					<li>别名:&nbsp;&nbsp;<a href="">${data.alt_title}</a></li>
				</ul>
			</div>
			<div class="introduce">
				<h3>剧情简介：</h3>
				<p>${data.summary}</p>
			</div>
		
		</div>
		
	`	
}		
GetAjax(httpUrl2,fn2)