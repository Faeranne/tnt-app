var getJson = function(id,element){
	function reqListener () {
		var json = JSON.parse(this.responseText)
	}

	var oReq = new XMLHttpRequest();
	oReq.onload = reqListener;
	oReq.open("get", "tnt.engine.projectmakeit.com/comments/?panel="+id, true);
	oReq.send();
}
