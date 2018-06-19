$(function() {
	$("#button").click(function(){
		var fee = $("#charge").val()*100;
		if(!fee){
			plugin.Toast.show('info','请选择充值金额');
			return;
		}
		$.ajax({
			type : 'post',
			url : contextPath + '/wx/d/pay/getSignAccountRecharge',
			data : {fee : fee, openId : openId},
			dataType : "json",
			success : function(result) {
				if(result.isOk){
					var sn = result.data.inSerialsNumber
					var params = result.data;
					params.paySign = params.sign;
					WeixinJSBridge.invoke(
				       'getBrandWCPayRequest', params,
				       function(res){
				           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				        	   location.href = contextPath+"/wx/j/pc/goUserCenter?openId=" + openId;
				           }else{
				        	   $.ajax({
				        			type : 'post',
				        			url : contextPath + '/wx/d/pay/cancelOrder',
				        			data : {
				        				sn : sn,
				        				openId : openId,
				        				wxErrMsg : res.err_msg,
										authOpenId:""+window.authOpenId
				        			},
				        			dataType : "json",
				        			success : function(result) {
				        			},
				        			error : function(result) {
				        			}
				        		});
				           }
				       }
				   );
				}else{
					plugin.Toast.show('info','充值失败');
				}
			},
			error : function(result) {

			}
		});
		
	});
})


