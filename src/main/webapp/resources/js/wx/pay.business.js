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
	//没有车辆入场信息默认取第一辆
})
var currentVehicle;
var firstRealFee;
function getFirstCar(){
	$.ajax({
		type : 'post',
		url : contextPath + '/wx/d/pay/getVehiclesByAccountNo',
		data : {
			openId : openId
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
	if (!payInfo.feeInfo) {
		plugin.Toast.show('提示', '没有缴费信息');
		return;
	}
	if (!payInfo.feeInfo.isOnlinePay) {
		plugin.Toast.show('提示', '不支持在线支付');
		return;
	}
	if (!payInfo.feeInfo.receivableAmount) {
		plugin.Toast.show('提示', '该缴费信息无需支付');
		return;
	}
	if (!payInfo.account) {
		plugin.Toast.show('提示', '没有账号信息');
		return;
	}
	/** 车场折扣与优惠券互斥 */
	var receivableAmount = payInfo.feeInfo.receivableAmount;
	var discountFee = 0;
	var couponCode = "";
	var couponFee = 0;
	var pointType = "";
	var pointsFee = 0;
	var totalPoints = 0;
	var totalPointsFee = 0;
	var source = feeInfo.source;
    //减去会员首免积分
    if(firstRealFee){
        receivableAmount = receivableAmount - firstRealFee;
    }
	// 车场折扣
	discountFee = compute4Discount(receivableAmount);
	if (discountFee) {
		couponFee = discountFee;
	} else {
		// 优惠券
		couponFee = compute4Coupon(receivableAmount);
		if (couponFee) {
			couponCode = payInfo.coupon.couponNo;
		}
	}
	receivableAmount = receivableAmount - couponFee;
	// 积分
	pointsFee = compute4Points(receivableAmount);
	if (pointsFee) {
		pointType = payInfo.pointsInfo.pointType;
		totalPoints = payInfo.pointsInfo.totalPoints;
		totalPointsFee = payInfo.pointsInfo.pointsFee;
	}
	receivableAmount = receivableAmount - pointsFee;
	// 微信支付
	var rechargeMethods = 33;
	var usebalance = $("#usebalance").prop("checked");
	if (usebalance || receivableAmount <= 0) {
		// 余额支付
		rechargeMethods = 34;
	}
	plugin.Loading.show('请稍候');
	$.ajax({
		type : 'post',
		url : contextPath + '/wx/d/pay/pay',
		data : {
			openId : openId,
			parkNo : payInfo.feeInfo.parkno,
			orderNo : payInfo.feeInfo.orderNo,
			fee : receivableAmount,
			couponCode : couponCode,
			couponFee : couponFee,
			pointType : pointType,
			pointsFee : pointsFee,
			totalPoints : totalPoints,
			totalPointsFee : totalPointsFee,
			rechargeMethods : rechargeMethods,
			source : source,
			inTime : window.inTime,
			authOpenId : window.authOpenId,
            firstFee : window.firstFee,//首免金额
            firstRealFee:window.firstRealFee//实际抵用的首免金额
		},
		dataType : "json",
		success : function(result) {
			if (result.isOk) {
				var sn = result.data.inSerialsNumber
				if(rechargeMethods == 34){
					location.href = contextPath + "/wx/j/pay/paySuccess?openId=" + openId + "&sn=" + sn +"&skin="+skin;
				}else{
					var params = result.data;
					params.paySign = params.sign;
					WeixinJSBridge.invoke(
				       'getBrandWCPayRequest', params,
				       function(res){
                           $.ajax({
                               type : 'post',
                               url : contextPath + '/wx/d/pay/payResult',
                               data : {
                                   sn : sn,
                                   openId : openId,
                                   resMsg : res.err_msg,
								   authOpenId: ""+window.authOpenId
                               },
                               dataType : "json",
                               success : function(result) {
                               },
                               error : function(result) {
                               }
                           });
				           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				        	   location.href = contextPath + "/wx/j/pay/paySuccess?openId=" + openId + "&sn=" + sn+"&skin="+skin;
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
// 获取入场图片
function _getEntryingPic(){
	if (payInfo.feeInfo) {
		if (payInfo.feeInfo.isPassImg) {
			$.ajax({
				type : 'post',
				url : contextPath + '/wx/d/pay/pic',
				data : {
					fileName : payInfo.feeInfo.inPicFile,
					parkNo : payInfo.feeInfo.parkno,
					openId : openId
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
			url : contextPath + '/wx/d/pay/findCar',
			data : {
				plateNo : payInfo.feeInfo.plateNo,
				plateColor : payInfo.feeInfo.plateColor,
				parkNo : payInfo.feeInfo.parkno,
				openId : openId
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
//					location.href = seekingUrl + accountNo + "&floor=" + floor + "&endpoint_name=" + spaceCode;
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
function voucherReq(code, params) {
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
		url : contextPath + '/wx/d/pay/voucherReq',
		data : {
			plateNo : payInfo.feeInfo.plateNo,
			plateColor : payInfo.feeInfo.plateColor,
			voucherCode : voucherCode,
			openId : openId,
			params:JSON.stringify(params)
		},
		dataType : "json",
		success : function(result) {
			if (result.isOk) {

				delete payInfo.coupon;
				$("#couponAtShow").text("");
				delete payInfo.pointsInfo;

				fee.payTheFee.renderPoint(false);
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
						$("#feeVoucherShow").html(prettySecond(feeInfo.voucherTime));
					}
					$("#feeVoucherDiv").show();
				}else{
					$("#feeVoucherDiv").hide();
				}
				fee.payTheFee.renderCoupon({
		    		openId : openId,
		    		parkNo : feeInfo.parkno,
		    		fee : feeInfo.receivableAmount,
		    		useType : '1001'
		    	});
				payInfo.feeInfo = feeInfo;
				compute();
				//如果使用SM积分 ，则重新调用积分
				if(pointType=='xmsmjf'){
                    pointsInfo(pointType,authOpenId);
				}
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
// 获取积分信息
function pointsInfo(pointType,authOpenId){
	delete payInfo.pointsInfo;
	fee.payTheFee.renderPoint(false);
	if(!pointType){
		compute();
		return;
	}
	plugin.Loading.show('请稍候');
	$.ajax({
		type : 'post',
		url : contextPath + '/wx/d/points/pointsInfo',
		data : {
			pointType : pointType,
			openId : openId,
			authOpenId:authOpenId,
			plateNo:currentVehicle.plateno,
			plateColor:currentVehicle.platecolor,
            inTimestamp:inTime
        },
		dataType : "json",
		success : function(result) {
			if (result.isOk) {
				var pointsInfo = result.data;
                pointsInfo.totalPoints = pointsInfo.totalPoints||0;
                pointsInfo.pointsFee = pointsInfo.pointsFee||0;
                pointsInfo.freeFee = pointsInfo.freeFee || 0;
                firstRealFee = pointsInfo.freeFee;
				payInfo.pointsInfo = pointsInfo;
				payInfo.pointsInfo.pointType = pointType;
				fee.payTheFee.renderPoint(true, pointsInfo.totalPoints, pointsInfo.pointsFee / 100.0,pointsInfo.freeFee/100.0);
               	window.authOpenId=pointsInfo.authOpenId;
			} else {
                firstRealFee = 0;
				if (result.errorCode == 81001) {
					plugin.Toast.show("提示", result.error);
				} else {
					plugin.Toast.show("提示", "积分信息获取失败");
				}
			}
		},
		error : function(result) {
			plugin.Toast.show('提示','网络异常');
		},
		complete : function(){
			plugin.Loading.hide();
			compute();
		}
	});
}

function showAlert(feeInfo) {
    var vehicleStatus = feeInfo.vehicleStatus - 0;
    var verifyUrl=contextPath+"/wx/j/pc/goVerifycar?id="+feeInfo.vehicleId+"&plateno="+feeInfo.plateNo+"&openId="+openId;
    var payOtherUrl = contextPath+"/wx/j/pay/toAddCarJudge?plateColor="+feeInfo.plateColor+"&plateNo="+feeInfo.plateNo+"&openId="+openId+"&skin="+skin;
    var flag = true;
    switch(vehicleStatus){
        case 0://未认证
            plugin.Toast.show('','您的爱车'+feeInfo.plateNo+'尚未验证，为保护您的隐私，请<a href="'+verifyUrl+'">前往验证</a>');
            break;
        case 1://已认证，车主是认证用户
            break;
        case 2://已认证，车主不是认证用户
            var plugin2 = lib.util.init({
                dialog:{
                    title:'提示',
                    content:'恭喜成功了',
                    buttons:[{
                        display:"取消",
                        action:function(){
                            // $("#feeParking").html('');
                            // $("#feeEntryTime").html('');
                            // $("#btn-pay").prop("disabled",true);
                            // $("#btn-pay").addClass("disable");
                            // $("#feeShow2").html('');
                            this.hide();
                        }
                    },{
                        display:'去代缴',
                        action:function(){
                        	location.href = payOtherUrl;
                            this.hide();
                        }
                    }]
                }
            });
            plugin2.Dialog.show('车辆'+feeInfo.plateNo+'已被他人验证，暂不能缴费，若您要为该车辆缴费，请使用车辆代缴功能。');
        	flag = false;
            break;
		case 3://已认证，且为多人认证，车主是认证用户
            plugin.Toast.show('','您的爱车'+feeInfo.plateNo+'已被多人验证，如果您是车主，请<a href="'+verifyUrl+'">重新验证</a>')
			break;
    }
    return flag;
}
// 查询车辆停车信息
function queryPayFeeInfo(vehicle,flag) {//flag标志是选择车辆处查询
	currentVehicle = vehicle;
	var sourceValue;
	if(!flag){
        sourceValue = source;
	}
	plugin.Loading.show('请稍候');
	$.ajax({
		type : 'post',
		url : contextPath + '/wx/d/pay/queryPayFeeInfo',
		data : {
			plateNo : vehicle.plateno,
			plateColor : vehicle.platecolor,
			parkNo : vehicle.parkNo,
			doorNumber : vehicle.doorNumber,
			wayNumber : vehicle.wayNumber,
			openId : openId,
			source:sourceValue
		},
		dataType : "json",
		success : function(result) {
			if (result.isOk) {
                window.inTime = result.data[0].inTimestamp;
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
			delete payInfo.pointsInfo;
			feeInfo = payInfo.feeInfo;
			var canIFee = true;
			fee.payTheFee.renderPayDetail(feeInfo || {plateNo: vehicle.plateno});
			if(feeInfo){
                currentVehicle.platecolor = feeInfo.plateColor;
                currentVehicle.plateno = feeInfo.plateNo;
			}
			//判断是否本场是否有积分选项，如果有积分并且有SM的积分，则主动查询积分
			if(feeInfo&&feeInfo.points&&feeInfo.points.length>0){
				for(var i=0;i<feeInfo.points.length;i++){
					var pointItem = feeInfo.points[i];
					if(pointItem.pointType == 'xmsmjf'){
                        pointType = pointItem.pointType;
                        pointsInfo(pointItem.pointType,authOpenId);
						break;
					}
				}
			}
            //var vehicleStatus = feeInfo.vehicleStatus - 0;
            //自已未验证，别人验证了
            // if(vehicleStatus == 2){
            //     $("#feeParking").html('');
            //     $("#feeEntryTime").html('');
            //     $("#btn-pay").prop("disabled",true);
            //     $("#btn-pay").addClass("disable");
            //     $("#feeShow2").html('');
            // }
			//$("#carNum").val(vehicle.plateno);
			$("#inPicFile").attr("src", contextPath + "/resources/img/fee/detail-img.jpg");
			$(".btn-find").remove();
			if (feeInfo) {
				//$("#carNum").val(feeInfo.plateNo);
				//source为1的时候，则是代缴费
				if(feeInfo.source == 1){
                    $("#feeParking").html('车主已隐藏停车场');
                    $("#feeEntryTime").html((new Date(feeInfo.inTimestamp)).format("yyyy-MM-dd"));
				}else{
                    $("#feeParking").html(feeInfo.parkName);
                    $("#feeEntryTime").html((new Date(feeInfo.inTimestamp)).format("yyyy-MM-dd hh:mm:ss"));
                    canIFee = showAlert(feeInfo);
				}
				if(canIFee){
                    $("#btn-pay").prop("disabled",false);
                    $("#btn-pay").removeClass("disable");
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
                            $("#feeVoucherShow").html(prettySecond(feeInfo.voucherTime));
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
                        openId : openId,
                        parkNo : feeInfo.parkno,
                        fee : feeInfo.receivableAmount,
                        useType : '1001'
                    });
                }else{
                    // $("#btn-pay").prop("disabled",true);
                    // $("#btn-pay").addClass("disable");
                    // $("#feeParking").html("暂无入场信息.");
                    // $("#feeEntryTime").html("暂无入场信息.");
                    // $("#feeShow").html("暂无入场信息.");
                    // $("#feeShow2").html("暂无入场信息.");

                    $("#feeParking").html('');
                    $("#feeEntryTime").html('');
                    $("#btn-pay").prop("disabled",true);
                    $("#btn-pay").addClass("disable");
                    $("#feeShow2").html('');
				}
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
// 计算金额，进行界面控制
function compute() {
	var receivableAmount = 0;
	// 禁用支付按钮
	paymentFun(false);
	if (payInfo.feeInfo) {
		receivableAmount = payInfo.feeInfo.receivableAmount;
		if (payInfo.feeInfo.isOnlinePay && receivableAmount) {
			// 启用支付按钮
			paymentFun(true);
		}
		// 折扣
		var discountFee = compute4Discount(receivableAmount);
		receivableAmount = receivableAmount - discountFee;
		// 优惠券
		var couponFee = compute4Coupon(receivableAmount);
		receivableAmount = receivableAmount - couponFee;
        //免费金额计算
        if(payInfo.pointsInfo&&payInfo.pointsInfo.freeFee && payInfo.pointsInfo.freeFee>0){
            var resultFee=receivableAmount-payInfo.pointsInfo.freeFee;
            window.firstFee = payInfo.pointsInfo.freeFee;
            if(resultFee<=0){
                window.firstRealFee=receivableAmount;
                receivableAmount=0;
            }else{
                //window.receivableFreeFee=payInfo.pointsInfo.freeFee;
                window.firstRealFee=payInfo.pointsInfo.freeFee;
                receivableAmount = resultFee;
            }
        }
		// 积分
		var pointsFee = compute4Points(receivableAmount);
		receivableAmount = receivableAmount - pointsFee;
		// 车场折扣与优惠券，互斥，车场折扣优先
		if (discountFee > 0) {
			fee.payTheFee.showDiscount((discountFee / 100.0) + "元");
			fee.payTheFee.toggleCoupon(false);
		} else {
			fee.payTheFee.toggleCoupon(true);
			fee.payTheFee.showDiscount();
		}
		if (receivableAmount < 0) {
			receivableAmount = 0;
		}
	}
	if (payInfo.account && payInfo.account.balance >= receivableAmount) {
		// 余额可用
		balancePayFun(true);
	} else {
		// 禁用余额
		balancePayFun(false);
	}
	$("#payFeeShow").text((receivableAmount / 100.0) + "元");
	return receivableAmount;
}

// 支付按钮是否可用
function paymentFun(enable) {
	if (enable) {
		$("#btnPay").prop("disabled", false);
		$("#btnPay").removeClass("disable");
	} else {
		$("#btnPay").prop("disabled", true);
		$("#btnPay").addClass("disable");
	}
}

// 余额按钮是否可用
function balancePayFun(enable) {
	if (enable) {
		$("#usebalance").prop("disabled", false);
	} else {
		$("#usebalance").prop("disabled", true);
		$("#usebalance").prop("checked", false);
	}
}

// 计算折扣金额
function compute4Discount(receivableAmount) {
	var discountFee = 0;
	var isRate = payInfo.feeInfo.isRate;
	var discount = payInfo.feeInfo.discount;
	discount = (Object.prototype.toString.call(discount) == '[object Number]') ? discount : 100;
	if (!!isRate && !!receivableAmount && discount < 100 && discount >= 0) {
		discountFee = Math.floor(receivableAmount * (100 - discount) / 100.0);
	}
	return discountFee;
}

// 计算优惠券金额
function compute4Coupon(receivableAmount) {
	var couponFee = 0;
	var isCoupon = payInfo.feeInfo.isCoupon;
	var useCoupon = $("#useCoupon").prop("checked");
	if (isCoupon && useCoupon) { // 使用券支付并该笔缴费信息支持券支付
		var coupon = payInfo.coupon;
		if (coupon) { // 有选中券
			var couponAt = coupon.couponAt;
			if (couponAt > 0) { // 代金券
				couponFee = Math.min(couponAt, receivableAmount);
			} else { // 免费券
				couponFee = receivableAmount;
			}
		}
	}
	return couponFee;
}

// 计算积分金额
function compute4Points(receivableAmount) {
	var pointsFee = 0;
	var isPoints = payInfo.feeInfo.isPoints;
	var usePoints = $("#usePoints").prop("checked");
	if (isPoints && usePoints) { // 使用积分
		var pointsInfo = payInfo.pointsInfo;
		if (pointsInfo) {
			pointsFee = Math.min(pointsInfo.pointsFee, receivableAmount);
		}
	}
	return pointsFee;
}

// 秒数格式化
function prettySecond(seconds) {
	if (!seconds) {
		seconds = 0;
	}
	if (seconds >= 3600) {
		return seconds / 3600.0 + "小时";
	} else {
		return seconds / 60 + "分";
	}
}

function allowCoupon() {
	if (!payInfo.feeInfo) {
		plugin.Toast.show('info', '暂无入场信息');
		return false;
	}
	if (!payInfo.feeInfo.isCoupon) {
		plugin.Toast.show('info', '抱歉，本次缴费暂不支持使用优惠券');
		return false;
	}
	var receivableAmount = payInfo.feeInfo.receivableAmount;
	if (!receivableAmount) {
		plugin.Toast.show('info', '本次缴费无需使用优惠券');
		return false;
	}
	var discountFee = compute4Discount(receivableAmount);
	receivableAmount = receivableAmount - discountFee;
	if (!receivableAmount) {
		plugin.Toast.show('info', '无需使用优惠券');
		return false;
	}
	var pointsFee = compute4Points(receivableAmount);
	receivableAmount = receivableAmount - pointsFee;
	if (!receivableAmount) {
		plugin.Toast.show('info', '无需使用优惠券');
		return false;
	}
	return true;
}

function allowPoints() {
	if (!payInfo.feeInfo) {
		plugin.Toast.show('info', '暂无入场信息');
		return false;
	}
	if (!payInfo.feeInfo.isPoints) {
		plugin.Toast.show('info', '抱歉，本次缴费暂不支持使用积分');
		return false;
	}
	var receivableAmount = payInfo.feeInfo.receivableAmount;
	if (!receivableAmount) {
		plugin.Toast.show('info', '本次缴费无需使用积分');
		return false;
	}
	var discountFee = compute4Discount(receivableAmount);
	receivableAmount = receivableAmount - discountFee;
	if (!receivableAmount) {
		plugin.Toast.show('info', '无需使用积分');
		return false;
	}
	var couponFee = compute4Coupon(receivableAmount);
	receivableAmount = receivableAmount - couponFee;
	if (!receivableAmount) {
		plugin.Toast.show('info', '无需使用积分');
		return false;
	}
	return true;
}

