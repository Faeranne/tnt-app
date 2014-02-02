
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
	time = appData.panels[id].time
	tags = appData.panels[id].tags
	var nameHTML = appData.panels[id].title
	var infoHTML = time + "|" + tags
	var websiteHTML = "<a href='"+appData.panels[id].website+"'>Website</a>"
	var calenderHTML = "<a href='calender.html#"+id+"'>Add To Calender</a>"
	var descriptionHTML = appData.panels[id].description
	var speakersHTML = ""
	var speakers = appData.panels[id].speakers
	for(speaker in speakers){
		var id = speakers[speaker]
		var name = appData.speakers[id].title
		speakersHTML = speakersHTML + "<li><a href='speaker.html#"+id+"'><div>"+name+"</div></a></li>"
	}
	document.getElementById('fill-speakers').innerHTML = "Speakers:"
	document.getElementById('name').innerHTML = nameHTML
	document.getElementById('info').innerHTML = infoHTML
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
		var name = appData.panels[id].title
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
		var title = list[item].title
		var time = list[item].time
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
