var invoke;
function grantParams(cb) {
	invoke = cb;
	setTimeout(function(){
		window.iParking.grantParmas(JSON.stringify({
			"id" : id,
			"origin" : "web"
		}));
	}, 150);
}

function grantParmasCallback(result) {
	invoke(JSON.parse(result))
}