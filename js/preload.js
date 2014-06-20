
/*
 * Global
 */

var getJson = function(cb,json){
	function reqListener () {
		window.appData = JSON.parse(this.responseText)
		cb()
	}

	var oReq = new XMLHttpRequest();
	oReq.onload = reqListener;
	oReq.open("get", json, true);
	oReq.send();
}

speakerBuilt = false;
panelBuilt = false;

/*
 * templateGen
 */

var panelTemplate = function(){
	var id = location.hash.split('.')[1]
	var time = getDate(appData.panels[id].data.time)
	var tags = ""
	for(tag in appData.panels[id].data.tags){
		tags = tags + appData.panels[id].data.tags[tag]
		if(tag < appData.panels[id].data.tags.length - 1){
			tags = tags + ', ';
		}
	}
	var nameHTML = appData.panels[id].info.title
	var timeHTML = "Time: " + time
	var tagsHTML = "Tags: " + tags
	var websiteHTML = "<a href='"+appData.panels[id].info.website+"'>Website</a>"
	var calenderHTML = ""
	var calender = localStorage.getItem('calender')
	if(calender){
		calender=JSON.parse(calender);
		if(calender[id]){
			calenderHTML = "<a href='#panel."+id+"' onClick='removeCalender(\""+id+"\")'>Remove From Calender</a>"
		}else{
			calenderHTML = "<a href='#panel."+id+"' onClick='addCalender(\""+id+"\")'>Add To Calender</a>"
		}
	}else{
		calenderHTML = "<a href='#panel."+id+"' onClick='addCalender(\""+id+"\")'>Add To Calender</a>"
	}
	var descriptionHTML = appData.panels[id].info.description
	console.log(appData.panels[id].info.description)
	var commentHTML = "<a href='https://twitter.com/intent/tweet?screen_name=tokyointulsa&hashtags=panel"+id+"'>Leave A Comment</a>"
	var getCommentHTML = "<a href='https://twitter.com/search?f=realtime&q=%23panel"+id+"%20%40tokyointulsa'>View Comments for this Panel</a>"
	var speakersHTML = ""
	var speakers = appData.panels[id].speakers
	for(speaker in speakers){
		var id = speakers[speaker]
		var name = appData.speakers[id].title
		speakersHTML = speakersHTML + "<li><a href='#speaker."+id+"'><div>"+name+"</div></a></li>"
	}
	document.getElementById('fill-speakers').innerHTML = "Speakers:"
	document.getElementById('panel-name').innerHTML = nameHTML
	document.getElementById('time').innerHTML = timeHTML
	document.getElementById('tags').innerHTML = tagsHTML
	document.getElementById('website').innerHTML = websiteHTML
	document.getElementById('calender').innerHTML = calenderHTML
	document.querySelector('#panel-page #description').innerHTML = descriptionHTML
	document.getElementById('speakers').innerHTML = speakersHTML
	document.querySelector('#comment').innerHTML = commentHTML
	document.querySelector('#getcomment').innerHTML = getCommentHTML
}
	
var speakerTemplate = function(){
	var id = location.hash.split('.')[1]
	console.log(id)
	var nameHTML = appData.speakers[id].title
	var websiteHTML = "<a href='"+appData.speakers[id].website+"'>Website</a>"
	var descriptionHTML = appData.speakers[id].description
	var panelsHTML = ""
	var panels = appData.speakers[id].panels
	for(panel in panels){
		var id = panels[panel]
		var name = appData.panels[id].info.title
		panelsHTML = panelsHTML + "<li><a href='#panel."+id+"'><div>"+name+"</div></a></li>"
	}
	document.getElementById('fill-panels').innerHTML = "Panels:"
	document.getElementById('speaker-name').innerHTML = nameHTML
	document.getElementById('website').innerHTML = websiteHTML
	document.getElementById('description').innerHTML = descriptionHTML
	document.getElementById('panels').innerHTML = panelsHTML
}

var panelListTemplate = function(){
	if(!panelBuilt){
		list = window.appData['panels']
		html=''
		for(item in list){
			console.log(list[item])
			var title = list[item].info.title
			var time = getDate(list[item].data.time)
			html=html+"<li><a href='#panel."+item+"'><div>"+time+"</div><div>"+title+"</div></a></li>"
		}
		panelBuilt=true;
		document.getElementById('panel-list').innerHTML = html
	}
}

var speakerListTemplate = function(){
	if(!speakerBuilt){
		var keys = [];
		var list = window.appData['speakers']
		var html=''
		for(item in list){
			if (list.hasOwnProperty(item)){
				keys.push(item);
			}
		}
		keys.sort()

		len = keys.length;
		
		for(i = 0; i < len; i++){
			item = keys[i];
			var title = list[item].title
			var url = list[item].url
			html=html+"<li><a href='#speaker."+item+"'><div>"+title+"</div></a></li>"
		}
		speakerBuilt=true;
		document.getElementById('speaker-list').innerHTML = html
	}
}

var calenderTemplate = function(){
	var calender = localStorage.getItem('calender')
	var day1HTML = "<li>Friday:</li>"
	var day2HTML = "<li>Saturday:</li>"
	var day3HTML = "<li>Sunday:</li>"
	var day1 = []
	var day2 = []
	var day3 = []
	console.log(calender)
	if(calender){
		calender = JSON.parse(calender)
		for(panel in calender){
			if(calender[panel]){
				entry = {}
				entry.id = panel
				entry.time=window.appData['panels'][panel].data.time
				entry.title=window.appData['panels'][panel].info.title
				if(entry.time<1405141200){
					day1.push(entry)
				}else if(entry.time<1405227600){
					day2.push(entry)
				}else{
					day3.push(entry)
				}
			}
		}
		day1.sort(function(a,b) { return parseInt(a.time) - parseInt(b.time) } );
		day2.sort(function(a,b) { return parseInt(a.time) - parseInt(b.time) } );
		day3.sort(function(a,b) { return parseInt(a.time) - parseInt(b.time) } );
		for(item in day1){
			var id = day1[item].id
			var time = getDate(day1[item].time)
			var title = day1[item].title
			day1HTML=day1HTML+"<li><a href='#panel."+id+"'><div>"+time+"</div><div>"+title+"</div></a></li>"
		}
		for(item in day2){
			var id = day2[item].id
			var time = getDate(day2[item].time)
			var title = day2[item].title
			day2HTML=day2HTML+"<li><a href='#panel."+id+"'><div>"+time+"</div><div>"+title+"</div></a></li>"
		}
		for(item in day3){
			var id = day3[item].id
			var time = getDate(day3[item].time)
			var title = day3[item].title
			day3HTML=day3HTML+"<li><a href='#panel."+id+"'><div>"+time+"</div><div>"+title+"</div></a></li>"
		}
		if(day1.length+day2.length+day3.length>0){
			if(day1.length){
				document.getElementById('day1-list').innerHTML = day1HTML
			}else{
				document.getElementById('day1-list').innerHTML = "" 
			}	
			if(day2.length){
				document.getElementById('day2-list').innerHTML = day2HTML
			}else{
				document.getElementById('day2-list').innerHTML = "" 
			}	
			if(day3.length){
				document.getElementById('day3-list').innerHTML = day3HTML
			}else{
				document.getElementById('day3-list').innerHTML = "" 
			}	
			document.getElementById('calender-message').innerHTML = ""
		}else{
			document.getElementById('day1-list').innerHTML = ""
			document.getElementById('day2-list').innerHTML = ""
			document.getElementById('day3-list').innerHTML = ""
			document.getElementById('calender-message').innerHTML = "No events found"
		}
	}else{
			document.getElementById('day1-list').innerHTML = ""
			document.getElementById('day2-list').innerHTML = ""
			document.getElementById('day3-list').innerHTML = ""
		document.getElementById('calender-message').innerHTML = "No events found"
	}
}

var aboutTemplate = function(){
}

var Days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
	]

var getDate = function(unix){
	var AM="AM";
	var date = new Date(unix*1000);
	var Year = date.getFullYear();
	var Month = date.getMonth();
	var Day = Days[date.getDay()];
	var Hour = date.getHours();
	var Minute = date.getMinutes();
	if(Hour>12){
		Hour = Hour - 12;
		AM="PM";
	}
	if(Minute<10){
		Minute = "0"+Minute.toString();
	}
	var formated = Day+" "+Hour+":"+Minute+" "+AM
	return formated;
}



var currentPage="";

var setPage = function(newPage){
	if(currentPage){
		var oldPageDom = document.getElementById(currentPage);
		oldPageDom.classList.remove('show-page')
	}
	var newPageDom = document.getElementById(newPage);
	newPageDom.classList.add('show-page')
	currentPage=newPage;
}

var setHash = function(hash){
	location.hash = hash;
}

var setIndex = function(){
	setPage('index-page');
}

var setSpeakers = function(){
	speakerListTemplate();
	setPage('speaker-list-page');
}

var setSpeaker = function(id){
	speakerTemplate()
	setPage('speaker-page');
}

var setPanels = function(){
	panelListTemplate();
	setPage('panel-list-page');
}

var setPanel = function(){
	panelTemplate();
	setPage('panel-page');
}

var setCalender = function(){
	calenderTemplate();
	setPage('calender-page');
}

var setAbout = function(){
	aboutTemplate();
	setPage('about-page');
}

var startLoad = function(){
	document.getElementById('loader').classList.add('visible');
}
var stopLoad = function(){
	document.getElementById('loader').classList.remove('visible');
}

var hashWatcher = function(){
	document.body.classList.remove('menu-active');
	startLoad();
	switch(location.hash.split('.')[0]){
		case "#index":
			console.log('index');
			setIndex();
			break;
		case "#speaker-list":
			console.log('speakers');
			setSpeakers();
			break;
		case "#speaker":
			console.log('speaker');
			setSpeaker();
			break;
		case "#panel-list":
			console.log('panels');
			setPanels();
			break;
		case "#panel":
			console.log('panel');
			setPanel();
			break;
		case "#calender":
			console.log('calender');
			setCalender();
			break;
		case "#about":
			console.log('about');
			setAbout();
			break;
		default:
			setIndex();
			break;
	};
	stopLoad();
}

window.onhashchange = hashWatcher;

var addCalender = function(id){
	startLoad();
	var calender = localStorage.getItem('calender')	
	if(calender){
		calender = JSON.parse(calender)
	}else{
		calender = {}
	}
	calender[id]=true //need to give it a value
	localStorage.setItem('calender',JSON.stringify(calender))
	var calenderHTML = "<a href='#panel."+id+"' onClick='removeCalender(\""+id+"\")'>Remove From Calender</a>"
	document.getElementById('calender').innerHTML = calenderHTML
	stopLoad();
}

var removeCalender = function(id){
	startLoad();
	var calender = localStorage.getItem('calender')	
	if(calender){
		calender = JSON.parse(calender)
	}else{
		calender = {}
	}
	calender[id]=false //close enough
	localStorage.setItem('calender',JSON.stringify(calender))
	var calenderHTML = "<a href='#panel."+id+"' onClick='addCalender(\""+id+"\")'>Add To Calender</a>"
	document.getElementById('calender').innerHTML = calenderHTML
	stopLoad();
}

var getComments = function(id){

}
