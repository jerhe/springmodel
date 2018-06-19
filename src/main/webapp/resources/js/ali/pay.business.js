$(function() {
	// 选中"券支付"
	$("#useCoupon").live("change", function(){
		compute();
	});
	// "充值"按钮
	$("#recharge").live("click", function(){
		location.href = rechargeUrl;
	});
	// 手动输入车牌
	$("#carNum").live("change", _carNumChange);
	// 确认支付
	$("#btnPay").live("click", _pay);
	// 寻车
	$("#btn-find").live("click", _findCar);
	// 查询车辆费用
	queryPayFeeInfo(initVehicle);
	// 判断余额，透支的话弹出提示
	isOverdraw();
})
function getFirstCar(){
	$.ajax({
		type : 'post',
		url : contextPath + '/ali/d/pay/getVehiclesByAccountNo',
		data : {
			aliAppId : aliAppId,
			aliUserId : aliUserId
		},
		dataType : "json",
		success : function(result) {
			if (result.isOk) {
				$("#carNum").val(result.data.shift().plateno);
			} 
		}
	});
}
// 判断余额，透支的话弹出提示
function isOverdraw(){
	var balance = payInfo.account.balance / 100.0;
	var conten = "您的停车费自动代扣已启用信用透支，当前账户余额：" + balance + "元，请及时充值。\n如有疑问，可以点击个人中心查看消费明细，或联系客服4000799882。";
	var plugin2 = lib.util.init({
		toast:{
			duration:3000
		},
		dialog:{
			//title:"提示",
			closeBtn:false,
			content:'恭喜成功了',
			buttons:[{
				display:'取消',
				value:0,
				action:function(){
					this.hide();
				}
			},{
				display:"去充值",
				value:1,
				action:function(){
					this.hide();
				}
			}]
		}
	});
	if(balance < 0){
		plugin2.Dialog.confirm(conten, function(item){
			if(item.value === 1){
				$("#btn-pay").prop("disabled", false);
				$("#btn-pay").removeClass("disable");
				location.href = rechargeUrl;
			}else{
				findCar();
				$("#btn-pay").prop("disabled",true);
				$("#btn-pay").addClass("disable");
			}
			this.hide();
		});
	}else{
		findCar();
	}
}
var plugin1 = lib.util.init({
	toast:{
		duration:3000
	},
	dialog:{
		//title:"提示",
		closeBtn:false,
		content:'恭喜成功了',
		buttons:[{
			display:'取消',
			value:0,
			action:function(){
				this.hide();
			}
		},{
			display:"确定",
			value:1,
			action:function(){
				this.hide();
			}
		}]
	}
});
//
function findCar(){
	$.ajax({
		type : 'post',
		url : contextPath + '/ali/d/pay/getVehiclesByAccountNo',
		data : {
    		aliAppId : aliAppId,
			aliUserId : aliUserId
		},
		dataType : "json",
		success : function(result) {
			if(result.data.length == 0){
				plugin1.Toast.show('info','友情提示：您还未添加车辆信息，请输入车牌号或添加车辆');
			}
		}
	});
}
//手动输入车牌
function _carNumChange(){
	var $carNum = $(this).val();
	var $p = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;
	if($carNum.length == 7){
		if($p.test($carNum)){
			var vehicle = {};
			vehicle.plateno = $carNum.toUpperCase();
			vehicle.platecolor = "02";
			queryPayFeeInfo(vehicle);
		}else{
			plugin.Toast.show('提示','请输入正确的车牌号');
			$("#feeParking").html("暂无入场信息.");
			$("#feeEntryTime").html("暂无入场信息.");
			$("#feeShow").html("暂无入场信息.");
			$("#feeShow2").html("暂无入场信息.");
			$("#feeVoucherDiv").hide();
		}
	}else{
		plugin.Toast.show('提示','车牌号长度为7位');
		$("#feeParking").html("暂无入场信息.");
		$("#feeEntryTime").html("暂无入场信息.");
		$("#feeShow").html("暂无入场信息.");
		$("#feeShow2").html("暂无入场信息.");
		$("#feeVoucherDiv").hide();
	}
}
//确认支付
function _pay() {
	var receivableAmount = 0;
	var couponCode = "";
	var couponFee = 0;
	var usebalance = $("#usebalance").prop("checked");
	var useCoupon = $("#useCoupon").prop("checked");
	if (payInfo.feeInfo) { //有缴费信息
		receivableAmount = payInfo.feeInfo.receivableAmount;
		if(!receivableAmount){
			plugin.Toast.show('提示','该缴费信息无需支付');
			return;
		}
		// 车场折扣开启且金额大于0
		var isRate = payInfo.feeInfo.isRate;
		var discount = payInfo.feeInfo.discount || 100;
		if (!!isRate && !!receivableAmount && discount < 100 && discount > 0) {
			discountAmount = Math.floor(receivableAmount * (100 - discount) / 100.0);
			// 目前折扣与代金券互斥
			couponFee = discountAmount;
		}
		var isCoupon = payInfo.feeInfo.isCoupon;
		if (useCoupon && isCoupon) { //使用券支付并该笔缴费信息支持券支付
			var coupon = payInfo.coupon;
			if (coupon) {
				couponCode = coupon.couponNo;
				var couponAt = coupon.couponAt;
				if (couponAt) { //代金券
					couponFee = couponAt;
				} else { //免费券
					couponFee = receivableAmount;
				}
			}
		}
	} else {
		plugin.Toast.show('提示','没有缴费信息');
		return;
	}
	if (!payInfo.feeInfo.isOnlinePay) {
		plugin.Toast.show('提示','不支持在线支付');
		return;
	}
	if (!payInfo.account) {
		plugin.Toast.show('提示','没有账号信息');
		return;
	}
	receivableAmount = receivableAmount - couponFee;
	if(receivableAmount < 0 ){
		receivableAmount = 0;
	}
	// 支付宝支付
	var rechargeMethods = 32;
	if (usebalance || receivableAmount <= 0) {
		// 余额支付
		rechargeMethods = 34;
	}
	plugin.Loading.show('请稍候');
	$.ajax({
		type : 'post',
		url : contextPath + '/ali/d/pay/pay',
		data : {
    		aliAppId : aliAppId,
			aliUserId : aliUserId,
			parkNo : payInfo.feeInfo.parkno,
			orderNo : payInfo.feeInfo.orderNo,
			fee : receivableAmount,
			couponCode : couponCode,
			couponFee : couponFee,
			rechargeMethods : rechargeMethods
		},
		dataType : "json",
		success : function(result) {
			if (result.isOk) {
				var sn = result.data.inSerialsNumber
				if(rechargeMethods == 34){
					location.href = contextPath + "/ali/j/pay/paySuccess?aliUserId=" + aliUserId + '&aliAppId=' + aliAppId + "&sn=" + sn;
				}else{
//					location.href = result.data.alipayStr;
					AlipayJSBridge.call('pushWindow', {
						  url: result.data.alipayStr
					});
				}
			} else {
				plugin.Toast.show('提示', result.error);
			}
		},
		error : function(result) {
			plugin.Toast.show('提示','网络异常');
		},
		complete : function(){
			plugin.Loading.hide();
		}
	});
}
// 获取入场图片
function _getEntryingPic(){
	if (payInfo.feeInfo) {
		if (payInfo.feeInfo.isPassImg) {
			$.ajax({
				type : 'post',
				url : contextPath + '/ali/d/pay/pic',
				data : {
					fileName : payInfo.feeInfo.inPicFile,
					parkNo : payInfo.feeInfo.parkno,
	        		aliAppId : aliAppId,
					aliUserId : aliUserId
				},
				dataType : "json",
				success : function(result) {
					if (result.isOk) {
						var imgUrl = result.data.pic + "_632-357-cm.jpg";
						$("#inPicFile").attr("src", imgUrl);
					}
				},
				error : function() {
				},
				complete : function(){
				}
			});
		}
	}
}
// 寻车
function _findCar(){
	if (payInfo.feeInfo) {
		if (!payInfo.feeInfo.isVehicleQuery) {
			plugin.Toast.show('提示','不支持车场寻车');
			return;
		}
		plugin.Loading.show('正在查询车辆位置，请稍候');
		$.ajax({
			type : 'post',
			url : contextPath + '/ali/d/pay/findCar',
			data : {
				plateNo : payInfo.feeInfo.plateNo,
				plateColor : payInfo.feeInfo.plateColor,
				parkNo : payInfo.feeInfo.parkno,
        		aliAppId : aliAppId,
				aliUserId : aliUserId
			},
			dataType : "json",
			success : function(result) {
				if (result.isOk) {
					var placeInfo = result.data;
					var floor = placeInfo.floor;
					var spaceCode = placeInfo.spaceCode;
					var accountNo = placeInfo.accountNo;
					var buildid = placeInfo.buildid;
					var key = placeInfo.key;
					var openid = placeInfo.openid;
					location.href = seekingUrl +"?key=" + key + "&buildid=" + buildid + "&openid=" + openid + accountNo + "&floor=" + floor + "&endpoint_name=" + spaceCode;
				} else {
					plugin.Toast.show('提示','你的爱车停放位置查询失败，请稍后再试');
				}
			},
			error : function() {
				
			},
			complete : function(){
				plugin.Loading.hide();
			}
		});
	} else {
		plugin.Toast.show('提示','暂无入场信息.');
		return;
	}
}
// 使用"抵用券"
function voucherReq(code,params) {
	var voucherCode = null;
	var index = code.indexOf(",");
	if (index >= 0) {
		voucherCode = code.substr(index + 1);
	} else {
		voucherCode = code;
	}
	if(!voucherCode){
		plugin.Toast.show('提示','未得到抵用券码');
		return;
	}
	if(!payInfo.feeInfo){
		plugin.Toast.show('提示','请先获取缴费信息');
		return;
	}
	plugin.Loading.show('请稍候');
	$.ajax({
		type : 'post',
		url : contextPath + '/ali/d/pay/voucherReq',
		data : {
			plateNo : payInfo.feeInfo.plateNo,
			plateColor : payInfo.feeInfo.plateColor,
			voucherCode : voucherCode,
    		aliAppId : aliAppId,
			aliUserId : aliUserId,
			params:JSON.stringify(params)
		},
		dataType : "json",
		success : function(result) {
			if (result.isOk) {
				delete payInfo.coupon;
				$("#couponAtShow").text("");
				var feeInfo = result.data;
				$("#feeParking").html(feeInfo.parkName);
				$("#feeEntryTime").html((new Date(feeInfo.inTimestamp)).format("yyyy-MM-dd hh:mm:ss"));
				$("#feeShow").html(feeInfo.receivableAmount / 100.0 + "元");
				$("#feeShow2").html(feeInfo.receivableAmount / 100.0 + "元");
				if(feeInfo.voucherFee || feeInfo.voucherTime){
					if(feeInfo.voucherFee){
						$("#feeVoucherShow").html(feeInfo.voucherFee / 100.0 + "元");
					}
					if(feeInfo.voucherTime){
						$("#feeVoucherShow").html(computeTime(feeInfo.voucherTime));
					}
					$("#feeVoucherDiv").show();
				}else{
					$("#feeVoucherDiv").hide();
				}
				fee.payTheFee.renderCoupon({
		    		aliAppId : aliAppId,
		    		aliUserId : aliUserId,
		    		parkNo : feeInfo.parkno,
		    		fee : feeInfo.receivableAmount,
		    		useType : '1001'
		    	});
				payInfo.feeInfo = feeInfo;
				compute();
			} else {
				plugin.Toast.show('提示',result.error);
			}
		},
		error : function(result) {
			plugin.Toast.show('提示','网络异常');
		},
		complete : function(){
			plugin.Loading.hide();
		}
	});
}
// 查询车辆停车信息
function queryPayFeeInfo(vehicle, flag) {//flag标志是选择车辆处查询
	plugin.Loading.show('请稍候');
	$.ajax({
		type : 'post',
		url : contextPath + '/ali/d/pay/queryPayFeeInfo',
		data : {
			plateNo : vehicle.plateno,
			plateColor : vehicle.platecolor,
			parkNo : vehicle.parkNo,
			doorNumber : vehicle.doorNumber,
			wayNumber : vehicle.wayNumber,
			aliAppId : aliAppId,
			aliUserId : aliUserId
		},
		dataType : "json",
		success : function(result) {
			if (result.isOk) {
				payInfo.feeInfo = result.data[0];
			} else {
				delete payInfo.feeInfo;
			}
		},
		error : function(result) {
			plugin.Toast.show('提示','网络异常');
			delete payInfo.feeInfo;
		},
		complete : function(){
			plugin.Loading.hide();
			delete payInfo.coupon;
			feeInfo = payInfo.feeInfo;
			fee.payTheFee.renderPayDetail(feeInfo || {plateNo: vehicle.plateno});
			$("#carNum").val(vehicle.plateno);
			$("#inPicFile").attr("src", contextPath + "/resources/img/fee/detail-img.jpg");
			$(".btn-find").remove();
			if (feeInfo) {
				$("#carNum").val(feeInfo.plateNo);
				$("#feeParking").html(feeInfo.parkName);
				$("#feeEntryTime").html((new Date(feeInfo.inTimestamp)).format("yyyy-MM-dd hh:mm:ss"));
				$("#feeShow").html(feeInfo.receivableAmount / 100.0 + "元");
				$("#feeShow2").html(feeInfo.receivableAmount / 100.0 + "元");
				// 有使用抵用券
				if(feeInfo.voucherFee || feeInfo.voucherTime){
					// 抵用费用
					if(feeInfo.voucherFee){
						$("#feeVoucherShow").html(feeInfo.voucherFee / 100.0 + "元");
					}
					// 抵用时间
					if(feeInfo.voucherTime){
						$("#feeVoucherShow").html(computeTime(feeInfo.voucherTime));
					}
					$("#feeVoucherDiv").show();
				}else{
					$("#feeVoucherDiv").hide();
				}
				// 支持寻车
				if(feeInfo.isVehicleQuery){
					$("#btnWrap").append('<button type="button" id="btn-find" class="green btn-find">寻车</button>');
				}
				fee.payTheFee.renderCoupon({
					aliAppId : aliAppId,
		    		aliUserId : aliUserId,
		    		parkNo : feeInfo.parkno,
		    		fee : feeInfo.receivableAmount,
		    		useType : '1001'
		    	});
			} else {
				if(!flag){
					if(plateNo.length == 0){
						getFirstCar();
					}
				}
				$("#feeParking").html("暂无入场信息.");
				$("#feeEntryTime").html("暂无入场信息.");
				$("#feeShow").html("暂无入场信息.");
				$("#feeShow2").html("暂无入场信息.");
				$("#feeVoucherDiv").hide();
			}
			// 是否支持显示入场图片
			_getEntryingPic();
			compute();
		}
	});
}
// 计算金额
function compute() {
	var receivableAmount = 0;
	var couponFee = 0;
	if (payInfo.feeInfo) {
		var isOnlinePay = payInfo.feeInfo.isOnlinePay;
		receivableAmount = payInfo.feeInfo.receivableAmount;
		if(isOnlinePay){
			if (receivableAmount) {
				$("#btnPay").prop("disabled", false);
				$("#btnPay").removeClass("disable");
			} else { //金额0元不用支付
				$("#btnPay").prop("disabled", true);
				$("#btnPay").addClass("disable");
			}
		}else{
			$("#btnPay").prop("disabled", true);
			$("#btnPay").addClass("disable");
		}
		// 车场折扣开启且金额大于0
		fee.payTheFee.toggleCoupon(true);
		fee.payTheFee.showDiscount();
		var isRate = payInfo.feeInfo.isRate;
		var discount = payInfo.feeInfo.discount || 100;
		if (!!isRate && !!receivableAmount && discount < 100 && discount > 0) {
			discountAmount = Math.floor(receivableAmount * (100 - discount) / 100.0);
			receivableAmount = receivableAmount - discountAmount;
			fee.payTheFee.showDiscount((discountAmount / 100.0) + "元");
			fee.payTheFee.toggleCoupon(false);
		}
		var isCoupon = payInfo.feeInfo.isCoupon;
		var useCoupon = $("#useCoupon").prop("checked");
		if (isCoupon && useCoupon) { //使用券支付并该笔缴费信息支持券支付
			var coupon = payInfo.coupon;
			if (coupon) { //有选中券
				var couponAt = coupon.couponAt;
				if (couponAt) { //代金券
					couponFee = couponAt;
				} else { //免费券
					couponFee = receivableAmount;
				}
			}
		}
	} else {
		$("#btnPay").prop("disabled", true);
		$("#btnPay").addClass("disable");
	}
	receivableAmount = receivableAmount - couponFee;
	if(receivableAmount < 0 ){
		receivableAmount = 0;
	}
	$("#payFeeShow").text((receivableAmount / 100.0) + "元");

	if (payInfo.account) {
		$("#usebalance").prop("disabled", false);
		if (payInfo.account.balance < receivableAmount) {
			$("#usebalance").prop("checked", false);
			$("#usebalance").prop("disabled", true);
		}
	} else {
		$("#usebalance").prop("checked", false);
		$("#usebalance").prop("disabled", true);
	}
}

function computeTime(seconds) {
	if (!seconds) {
		seconds = 0;
	}
	if (seconds >= 3600) {
		return seconds/3600.0 + "小时";
	} else {
		return seconds/60 + "分";
	}
}

