$(function() {
	$("#btn-pay").prop("disabled",true);
	$("#btn-pay").addClass("disable");
	$("#txtMonth").prop("disabled",true);
	$("#txtDate").prop("disabled",true);
	$("#paytype1").prop("disabled",true);
	$("#paytype2").prop("disabled",true);
	// 选中"券支付"
	$("#useCoupon").live("change", function(){
		compute();
	});
	
	// "充值"按钮
	$("#recharge").live("click", function(){
		location.href = rechargeUrl;
	});
	
	// 确认支付
	$("#btnPay").live("click", _pay);
	
	$("#txtDate").live("click",function(){
		var plateNo1 = $("#plateNo1").val();
		var parkNo1 = $("#parkNo1").val();
		if(plateNo1.length == 0){
			plugin.Toast.show('提示','请选择车辆');
			return false;
		}else if(parkNo1.length == 0){
			plugin.Toast.show('提示','请选择停车场');
			return false;
		}
	});
	$("#txtMonth").live("click",function(){
		var plateNo1 = $("#plateNo1").val();
		var parkNo1 = $("#parkNo1").val();
		if(plateNo1.length == 0){
			plugin.Toast.show('提示','请选择车辆');
			return false;
		}else if(parkNo1.length == 0){
			plugin.Toast.show('提示','请选择停车场');
			return false;
		}
	});

	// 判断余额，透支的话弹出提示
	isOverdraw();
	//判断是否有缴费记录，有则自动填充
	getLastmonlog();
});

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
		url : contextPath + '/wx/d/pay/getVehiclesByAccountNo',
		data : {
			openId : openId
		},
		dataType : "json",
		success : function(result) {
			if(result.data.length == 0){
				plugin1.Toast.show('info','友情提示：您还未添加车辆信息，请输入车牌号或添加车辆');
			}
		}
	});
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
	if (!payInfo.feeInfo.isMonth) {
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
	// 微信支付
	var rechargeMethods = 33;
	if (usebalance || receivableAmount <= 0) {
		// 余额支付
		rechargeMethods = 34;
	}
	plugin.Loading.show('请稍候');
	$.ajax({
		type : 'post',
		url : contextPath + '/wx/d/pay/getSignMonthFee',
		data : {
			openId : openId,
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
					location.href = contextPath + "/wx/j/pay/payMonthSuccess?openId=" + openId + "&sn=" + sn;
				}else{
					var params = result.data;
					params.paySign = params.sign;
					WeixinJSBridge.invoke(
				       'getBrandWCPayRequest', params,
				       function(res){
				           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				        	   location.href = contextPath + "/wx/j/pay/payMonthSuccess?openId=" + openId + "&sn=" + sn + "&isPay=1";
				           }else{
				        	   $.ajax({
				        			type : 'post',
				        			url : contextPath + '/wx/d/pay/cancelOrder',
				        			data : {
				        				sn : sn,
				        				openId : openId,
				        				wxErrMsg : res.err_msg,
										authOpenId: ""+window.authOpenId
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

//计算金额
function compute() {
	var receivableAmount = 0;
	var couponFee = 0;
	if (payInfo.feeInfo) {
		var isMonth = payInfo.feeInfo.isMonth;
		receivableAmount = payInfo.feeInfo.receivableAmount;
		if(isMonth){
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

//查询月缴金额
function queryMonthFee(){
	var months = $("#forMonth").val();
	var days = $("#forDay").val();
	if(!months){
		months = 0;
	}
	if(!days){
		days = 0;
	}else{
		var a = new Date(days);
		var validay = $("#validay").val();
		var b = new Date(validay);
		var a1 = a.getTime();
		var b1 = b.getTime();
		days = (a1 - b1)/(1000*60*60*24); 
		if(days <= 0){
			plugin.Toast.show('提示',"所选的时间必须大于当前有效期");
			$("#txtDate").val("");
			$("#forDay").val("");
			$("#forMonth").val("");
			$("#btn-pay").prop("disabled",true);
			$("#btn-pay").addClass("disable");
			return false;
		}
	}
	$.ajax({
		type : 'post',
		url : contextPath + '/wx/d/pay/queryMonthFee',
		data : {
			openId : openId,
			months : months,
			days : days,
			parkNo : $("#parkNo1").val(),
			plateNo : $("#plateNo1").val(),
			plateColor : $("#plateColor1").val()
		},
		dataType : "json",
		success : function(result) {
			if(result.isOk){
				if(result.data.isMonth == 1){//是否支持线上月租支付，0不支持1支持
					var dateString = result.data.endDate;
					var pattern = /(\d{4})(\d{2})(\d{2})/;
					var formatedDate = dateString.replace(pattern, '$1-$2-$3');
					$("#btn-pay").prop("disabled",false);
					var validay = $("#validay").val();
					if(validay.length == 0){
						$("#validity").text(formatedDate);
						$("#validay").val(formatedDate);
					}
					if(days != 0 || months != 0){
						$("#btn-pay").prop("disabled",false);
						$("#btn-pay").removeClass("disable");
						$("#feeShow2").text((result.data.receivableAmount/100.0) + "元");
						if(result.data.timeFlag == 0) {
							$("#parkFee").val('0');
							plugin.Toast.show('提示','该车辆不支持线上续费!');
						} else {
							$("#parkFee").val(result.data.receivableAmount);
						}
						payInfo.feeInfo = result.data;
					}else{
						var a = parseInt( result.data.timeFlag,10);
						var timeDay = 1;
						var timeMonth = 1 << 4;
						$("#paytype1").prop("checked",false);
						$("#paytype2").prop("checked",false);
						$("#txtMonth").prop("disabled",true);
						$("#txtDate").prop("disabled",true);
						if(a & timeDay){
							$("#txtDate").prop("disabled",false);
							$("#paytype2").prop("checked",true);
						}
						if(a & timeMonth){
							$("#txtMonth").prop("disabled",false);
							$("#paytype1").prop("checked",true);
						}
						if(a & timeDay & timeMonth){
							$("#txtMonth").prop("disabled",false);
							$("#txtDate").prop("disabled",false);
							$("#paytype2").prop("checked",true);
						}
					}
				}else{
					plugin.Toast.show('提示',"该车场暂不支持按月缴费");
					$("#btn-pay").prop("disabled",true);
					$("#btn-pay").addClass("disable");
					delete payInfo.feeInfo;
				}
			}else{
				plugin.Toast.show('提示',result.error);
				/*if(result.errorCode == '80013'){
					plugin.Toast.show('提示',result.error);
				}else if(result.errorCode == '80010'){
					plugin.Toast.show('提示',result.error);
				}else if(result.errorCode == '80008'){
					plugin.Toast.show('提示',result.error);
				}else if(result.errorCode == '80006'){
					plugin.Toast.show('提示',result.error);
				}else if(result.errorCode == '80007'){
					plugin.Toast.show('提示',result.error);
				}else if(result.errorCode == '80066'){
					plugin.Toast.show('提示',result.error);
				}else if(result.errorCode == '30010'){
					plugin.Toast.show('提示',result.error);
				}else{
					plugin.Toast.show('提示',"请求错误");
				} */
				$("#parkFee").val('0');
				$("#btn-pay").prop("disabled",true);
				$("#btn-pay").addClass("disable");
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
			var plateNo = $("#plateNo1").val();
			var parkNo = $("#parkNo1").val();
			var receivableAmount = $("#parkFee").val();
			fee.monthFee.renderPayDetail({plateNo : plateNo, parkNo : parkNo, receivableAmount : receivableAmount});
			if(feeInfo){
				fee.monthFee.renderCoupon({
		    		openId : openId,
		    		parkNo : $("#parkNo1").val(),
		    		parkId : $("#parkId1").val(),
		    		fee : feeInfo.receivableAmount,
		    		useType : '1005'
		    	});
			}
			var m = $("#txtMonth").val();
			var d = $("#txtDate").val();
			if((m || d) && receivableAmount !=0 ){
				$("#btn-pay").prop("disabled",false);
				$("#btn-pay").removeClass("disable");
			}else{
				$("#btn-pay").prop("disabled",true);
				$("#btn-pay").addClass("disable");
			}
		}
	});
}

function getLastmonlog(){
	$.ajax({
		type : 'post',
		url : contextPath + '/wx/d/pay/getLastMonthFeeLog',
		data : {
			openId : openId
		},
		dataType : "json",
		success : function(result) {
			if(result.isOk){
                //以下判断只为了软二3月1日涨价的需求加的
                if(result.amCarmonBallog&&result.amCarmonBallog.parkno=='3502030100006'){
                    $('#pay-tip').show();
                }else{
                    $('#pay-tip').hide();
                }
				$("#carNum").text(result.amCarmonBallog.plateno);
				$("#plateNo1").val(result.amCarmonBallog.plateno);
				$("#plateColor1").val(result.amCarmonBallog.platecolor);
				$("#feeParking").text(result.amCarmonBallog.parkName);
				$("#parkNo1").val(result.amCarmonBallog.parkno);
				$("#parkId1").val(result.amCarmonBallog.parkId);
				queryMonthFee();
			}
		}
	});
}

