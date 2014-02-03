
/*
 * Global
 */

var getJson = function(cb){
	function reqListener () {
		window.appData = JSON.parse(this.responseText)
		cb()
	}

	var oReq = new XMLHttpRequest();
	oReq.onload = reqListener;
	oReq.open("get", 'data.json', true);
	oReq.send();
}

/*
 * templateGen
 */

var panelTemplate = function(){
	id = window.location.hash.slice(1)
	time = getDate(appData.panels[id].data.time)
	tags = ""
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
	var calenderHTML = "<a href='calender.html#"+id+"'>Add To Calender</a>"
	var descriptionHTML = appData.panels[id].info.description
	var speakersHTML = ""
	var speakers = appData.panels[id].speakers
	for(speaker in speakers){
		var id = speakers[speaker]
		var name = appData.speakers[id].title
		speakersHTML = speakersHTML + "<li><a href='speaker.html#"+id+"'><div>"+name+"</div></a></li>"
	}
	document.getElementById('fill-speakers').innerHTML = "Speakers:"
	document.getElementById('name').innerHTML = nameHTML
	document.getElementById('time').innerHTML = timeHTML
	document.getElementById('tags').innerHTML = tagsHTML
	document.getElementById('website').innerHTML = websiteHTML
	document.getElementById('calender').innerHTML = calenderHTML
	document.getElementById('description').innerHTML = descriptionHTML
	document.getElementById('speakers').innerHTML = speakersHTML
}
	
var speakerTemplate = function(){
	id = window.location.hash.slice(1)
	var nameHTML = appData.speakers[id].title
	var websiteHTML = "<a href='"+appData.speakers[id].website+"'>Website</a>"
	var descriptionHTML = appData.speakers[id].description
	var panelsHTML = ""
	var panels = appData.speakers[id].panels
	for(panel in panels){
		var id = panels[panel]
		var name = appData.panels[id].info.title
		panelsHTML = panelsHTML + "<li><a href='panel.html#"+id+"'><div>"+name+"</div></a></li>"
	}
	document.getElementById('fill-panels').innerHTML = "Panels:"
	document.getElementById('name').innerHTML = nameHTML
	document.getElementById('website').innerHTML = websiteHTML
	document.getElementById('description').innerHTML = descriptionHTML
	document.getElementById('panels').innerHTML = panelsHTML
}

var panelListTemplate = function(){
	list = window.appData['panels']
	html=''
	for(item in list){
		console.log(list[item])
		var title = list[item].info.title
		var time = getDate(list[item].data.time)
		html=html+"<li><a href='panel.html#"+item+"'><div>"+time+" | "+title+"</div></a></li>"
	}
	document.getElementById('panel-list').innerHTML = html
}

var speakerListTemplate = function(){
	list = window.appData['speakers']
	html=''
	for(item in list){
		var title = list[item].title
		var url = list[item].url
		html=html+"<li><a href='speaker.html#"+item+"'><div>"+title+"</div></a></li>"
	}
	document.getElementById('speaker-list').innerHTML = html
}

var calenderTemplate = function(){
	var todayHTML = "<li>Today:</li>"
	var futureHTML = "<li>Tomorrow:</li>"
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
