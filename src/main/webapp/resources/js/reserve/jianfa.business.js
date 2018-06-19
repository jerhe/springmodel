$(function() {
	// 手动输入车牌
	$("#plate-num").live("change", _carNumChange);
	// 确认预定
	$("#btn-pay").live("click", reserveParking);
	
	
})

//手动输入车牌
function _carNumChange(){
	var $carNum = $(this).val();
	var $p = /^[\u4E00-\u9FA5]{1}[a-zA-Z]{1}[\da-zA-Z]{5}$/;
	if($carNum.length == 7){
		if($p.test($carNum)){
			var vehicle = {};
			vehicle.plateno = $carNum.toUpperCase();
			vehicle.platecolor = "02";
			$("#plateColor").val("02");
			$("#btn-pay").prop("disabled", false);
			$("#btn-pay").removeClass("disable");
		}else{
			plugin.Toast.show('提示','车牌号格式错误');
			$("#btn-pay").prop("disabled", true);
			$("#btn-pay").addClass("disable");
		}
	}else{
		plugin.Toast.show('提示','车牌号长度为7位');
		$("#btn-pay").prop("disabled", true);
		$("#btn-pay").addClass("disable");
		
	}
}

//确认预定
function reserveParking() {
	var receivableAmount = 0;
	var couponCode = "";
	var couponFee = 0;
	var carNum = $("#plate-num").val();
	var plateno = carNum.toUpperCase()
	if(plateno.length == 7){
		plugin.Loading.show('请稍后……');
		$("#button").prop("disabled", true);
		$("#button").addClass("disable");
		var timeType = 1;//暂时用
		var preType = 300;//暂时用
		$.ajax({
			type : 'post',
			url : contextPath + '/wx/d/rc/responseReserve',
			data : {
				parkId : parkId,
				parkNo : parkNo, 
				preType : preType, 
				timeType : timeType,
				relinfoIds : relinfoIds,
				openId : openId
			},
			dataType : "json",
			success : function(result) {
				if(result.isOk){
					var lastUsedTimes = result.data.lastUsedTimes - 1;
					$.ajax({
						type : 'post',
						url : contextPath + '/wx/d/rc/reserveParking',
						data : {
							openId : openId,
							plateNo : plateno,
							plateColor : $("#plateColor").val(),
							parkId : parkId,
							spaceinfoId : result.data.preinfoId,
							parkNo : parkNo,
							fee : 0,
							couponType : 1,
							couponFee : couponFee,
							couponAt : 0,
							couponNo : "",
							relinfoIds : relinfoIds,
							orderMaxdt : ""
						},
						dataType : "json",
						success : function(result) {
							var content = "";
							if(result.isOk){
								content = "预定成功!系统将为您保留一小时车位，请在一小时内入场，您还有"+lastUsedTimes+"次预定特权";
							}
							var plugin1 = lib.util.init({
								toast:{
									duration:100000
								},
								dialog:{
									//title:"提示",
									closeBtn:false,
									content:'恭喜成功了',
									buttons:[{
										display:"确定",
										value:1,
										action:function(){
											this.hide();
										}
									}]
								}
							});
							if(result.isOk){
								plugin1.Dialog.confirm(content,function(item){
									if(item.value === 1){
										location.href = contextPath + "/wx/d/rc/goOrder?openId="+openId;
									}
									this.hide();
								});
							}else if(result.errorCode == 30202){
								plugin1.Toast.show('info','不可重复预定');
							}else if(result.errorCode == 30203){
								plugin1.Toast.show('info','车位不足');
							}
						}
					});
				}else{
					if(result.errorCode == 30201){
						plugin.Toast.show('info', result.error);
					}else{
						plugin.Toast.show('提示','网络异常');
					}
				}
			},
			error : function(result) {
				plugin.Toast.show('提示','网络错误');
			},
			complete : function(){
				plugin.Loading.hide();
			}
		});
	}else{
		plugin.Toast.show('提示','请选择车牌号');
	}

}
//手动输入车牌
function _carNumChange(){
	var $carNum = $(this).val();
	var $p = /^[\u4E00-\u9FA5]{1}[a-zA-Z]{1}[\da-zA-Z]{5}$/;
	if($carNum.length == 7){
		if($p.test($carNum)){
			$("#plateColor").val("02");
			$("#btn-pay").prop("disabled", false);
			$("#btn-pay").removeClass("disable");
		}else{
			plugin.Toast.show('提示','车牌号格式错误');
			$("#btn-pay").prop("disabled", true);
			$("#btn-pay").addClass("disable");
		}
	}else{
		plugin.Toast.show('提示','车牌号长度为7位');
		$("#btn-pay").prop("disabled", true);
		$("#btn-pay").addClass("disable");
		
	}
}