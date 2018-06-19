var invoke;
function grantParams(cb) {
	invoke = cb;
	setTimeout(function(){
		window.iParking.grantParmas(JSON.stringify({
			"origin" : "web"
		}));
	}, 150);
}

function grantParmasCallback(result) {
	invoke(JSON.parse(result))
}