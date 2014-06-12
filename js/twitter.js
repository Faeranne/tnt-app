var getComments = function(id,cb){
	function reqListener () {
		var json = JSON.parse(this.responseText)
		cb(json);
	}
	var oReq = new XMLHttpRequest();
	oReq.onload = reqListener;
	oReq.open("get", "/comments/?panel="+id, true);
	oReq.send();
}

