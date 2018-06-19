$(function() {
	$("#btnLogin").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		if(!username){
			plugin.Toast.show('info','请输入手机号');
			return;
		}
		if(!password){
			plugin.Toast.show('info','请输入验证码');
			return;
		}
		plugin.Loading.show('请稍候');
		$.ajax({
			type : 'post',
			url : contextPath + '/ali/login/login',
			data : {
				"username" : username,
				"password" : password,
				"sessionKey" : sessionKey,
				"aliAppId" : aliAppId,
				"aliUserId" : aliUserId
			},
			dataType : "json",
			success : function(result) {
				console.log(result);
				if (result.isOk) {
					if(redirect){
						location.href = redirect;
					}else{
						location.href = contextPath + "/ali/j/pc/goUserCenter?aliAppId=" + aliAppId + "&aliUserId=" + aliUserId;
					}
				} else {
					if(result.errorCode == 30004){
						plugin.Toast.show('info',result.error);
					}else if(result.errorCode == 30007){
						plugin.Toast.show('info',result.error);
					}else if(result.errorCode == 30016){
						plugin.Toast.show('info',result.error);
					}else if(result.errorCode == 10001){
						plugin.Toast.show('info',result.error);
					}else{
						plugin.Toast.show('info','网络异常');
					}
				}
			},
			error : function(result) {
				plugin.Toast.show('info','网络错误');
			},
			complete : function(){
				plugin.Loading.hide();
			}
		});
	});
})