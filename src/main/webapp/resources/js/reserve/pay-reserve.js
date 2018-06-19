$(function() {
	
	// "充值"按钮
	$("#recharge").live("click", function(){
		location.href = rechargeUrl;
	});
	// 手动输入车牌
	$("#carNum").live("change", _carNumChange);
	// 确认预定
	$("#btn-pay").live("click", reserveParking);
	// 查询车辆
	queryCar(initVehicle);
	
	var carNum = $("#carNum").val();
	if(carNum == ''){
		$("#btn-pay").prop("disabled", true);
		$("#btn-pay").addClass("disable");
	}else{
		$("#btn-pay").prop("disabled", false);
		$("#btn-pay").removeClass("disable");
	}
	
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
	var receivableAmount = $("#feeShow").attr("value");
	var couponCode = "";
	var couponFee = 0;
	var couponAt = 0;
	var couponType = 0;
	var couponNo = 0;
	var usebalance = $("#usebalance").prop("checked");
	var useCoupon = $("#useCoupon").prop("checked");
	var carNum = $("#carNum").val();
	var plateno = carNum.toUpperCase();
	var coupon = payInfo.coupon;
	if(useCoupon){
		if (coupon) {
			couponCode = coupon.couponNo;
			couponAt = coupon.couponAt;
			couponType = coupon.couponType;
			couponNo = coupon.couponNo;
			if (couponAt) { //代金券
				couponFee = couponAt;
			} else { //免费券
				couponFee = receivableAmount;
			}
		}
		receivableAmount = receivableAmount - couponFee;
		if(receivableAmount < 0 ){
			receivableAmount = 0;
		}
	}
	$.ajax({
		type : 'post',
		url : contextPath + '/wx/d/rc/reserveParking',
		data : {
			openId : openId,
			plateNo : plateno,
			plateColor : $("#plateColor").val(),
			parkId : parkId,
			spaceinfoId : preinfoId,
			parkNo : parkNo,
			fee : receivableAmount,
			couponType : couponType,
			couponFee : couponFee,
			couponAt : couponAt,
			couponNo : couponNo,
			relinfoIds : relinfoIds,
			orderMaxdt : ""
		},
		dataType : "json",
		success : function(result) {
			var content = "";
			if(result.isOk){
				content = "已为您分配"+result.data.parkingNo+"号车位，系统将为您保留一小时车位，请在一小时内入场";
			}
			var plugin = lib.util.init({
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
				
				plugin.Dialog.confirm(content, function(item){
					if(item.value === 1){
						location.href = contextPath + "/wx/d/rc/goOrder?openId="+openId;
					}
					this.hide();
				});
			}else{
				plugin.Toast.show('info','车位不足');
			}
		}
	});
}

//填充车牌号
function queryCar(vehicle) {
	$("#carNum").val(vehicle.plateno);
	$("#plateColor").val(vehicle.platecolor);
	var carNum = $("#carNum").val();
	$("#btn-pay").prop("disabled", false);
	$("#btn-pay").removeClass("disable");
}


