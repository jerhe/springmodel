$(function() {
	$("#button").click(function(){
		var fee = $("#charge").val()*100;
		if(!fee){
			plugin.Toast.show('info','请选择充值金额');
			return;
		}
		$.ajax({
			type : 'post',
			url : contextPath + '/ali/d/pay/getSignAccountRecharge',
			data : {fee : fee, aliAppId : aliAppId, aliUserId : aliUserId},
			dataType : "json",
			success : function(result) {
				if(result.isOk){
//					location.href = result.data.alipayStr;
					AlipayJSBridge.call('pushWindow', {
						  url: result.data.alipayStr
//						  url: result.data.alipayStr,
//						  param: {
//							    readTitle: true,
//							    defaultTitle: true,
//							    showToolBar: false,
//							    showProgress: true
//							    // ...
//							  },
//						  popToIndex : 0,
//						  transparent: true
					}, function (result) {
					     if (result.error) {
					       console.log(result.error);
					     }
					});
				}else{
					plugin.Toast.show('info','充值失败');
				}
			},
			error : function(result) {

			}
		});
		
	});
})


