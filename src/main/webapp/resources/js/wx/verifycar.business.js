$(function(){
	$("#button").bind("click",checkVehicle);
});
var openId = $("#openId").val();
var imgUpload = {};
account.verifycar.init({
	openId:openId,
	uploader:{
		api: contextPath + "/wx/d/upload?openId="+openId,
		
		picker:'#picker',
		success:function(file,status){
			console.log(status)
			var upload = imgUpload[dicCode];
			var dicCode = "ETC_DRIVING";
			if(!upload){
				upload = {};
				imgUpload[dicCode] = upload;
			}
			upload.title = status.originalName;
			upload.fileext = status.fileType.substring(1);
			upload.sizes = status.size;
			upload.filename = status.fileName;
			upload.path = status.url.replace("/" + status.fileName, "");
			upload.orderid = 1;
			upload.typeclass = dicCode;
			upload.fileid = null;
		}
	},
	carPage:{
		width:'70%',
		api: contextPath+'/wx/d/pay/getVehiclesByAccountNo',
		addCarUrl:function(data){
			if(data.length < 10){
				return contextPath+'/wx/j/pc/goAddCar?openId='+openId;
			}else{
				return contextPath+'/wx/j/pc/goMyCar?openId='+openId;
			}
		},
		getVehicleInfo:contextPath+'/wx/d/pay/getAuthentication',
		getParams:function(){//请求参数
			return {
				openId : openId
			}
		},
		onClick:function (data) {
            $("#perVehicleid").val(data.vehicleId);
        },
		beforeClick:function(){
			return false;
		}
	}
});
function weixinUpload(){
	var array = [];
	$.map(imgUpload, function(e){
		array.push(e);
	});
	$("#imgUpload").val(JSON.stringify(array));
}
var plugin = lib.util.init({
	toast:{
		duration:3000
	},
	dialog:{
		//title:'提示',
		closeBtn:false,
		content:'恭喜成功了',
		buttons:[{
			display:"确定",
			value:1,
			action:function(){
				this.hide();
			}
		},{
			display:'取消',
			value:0,
			action:function(){
				this.hide();
			}
		}]
	}
});
function checkUpload(){
	var dicCode = "ETC_DRIVING";
	if(!imgUpload[dicCode]){
		plugin.Toast.show('info','请上传行驶证图片');
		return false;
	}
	return true;
}

function checkVehicle(){
	var sessionKey = $("#sessionKey").val();
	var openId = $("#openId").val();
	if($("#vehiclekeyCode").val().length == 6){
		var checkdata = {"plateno" : $("#plateno").val(),
				"platecolor" : platecolor,
				"vehiclekeyCode" : $("#vehiclekeyCode").val(),
				"sessionKey":sessionKey,
				"openId":openId};
		var checkurl = contextPath + '/wx/d/pc/checkVerifycar';
		$.ajax({
			type : 'post',
			url : checkurl,
			data : checkdata,
			dataType : "json",
			success : function(result) {
				if (result.isOk) {
					if(result.data.flag == 1){
						a=1;
					}else if(result.data.flag == 2){
						a=2;
					}else if(result.data.flag == 3){
						a=3;
					}
					weixinUpload();
					var imgUpload = $("#imgUpload").val();
					//验证是否需要上传图片
					if(a == 2){
						var validResult = checkUpload();
						if (!validResult) {
							return;
						}
					}
					var jurl = '';
					var url = '';
					var data = {};
					if(payUrl.length == 0){
						jurl = contextPath + "/wx/j/pc/goMyCar?sessionKey="+sessionKey+"&openId="+openId;
					}else{
						jurl = payUrl;
					}
					if(a == 2){
						if(platecolor.length == 0){//跟以前的方法数据一样
							url = contextPath + '/wx/d/pc/verifycar';
							data = {"perVehicleid" : $("#perVehicleid").val(),
									"vehiclekeyCode" : $("#vehiclekeyCode").val(),
									"sessionKey":sessionKey,
									"openId":openId,
									"imgUpload":imgUpload,
									"a":2};
						}else{//>2两辆强制验证，不然无法保存车辆
							url = contextPath + '/wx/d/pc/verifycar';
							data = {"perVehicleid" : $("#perVehicleid").val(),
									"plateno" : $("#plateno").val(),
									"vehiclekeyCode" : $("#vehiclekeyCode").val(),
									"sessionKey":sessionKey,
									"openId":openId,
									"platecolor":platecolor,
									"imgUpload":imgUpload,
									"a":2};
						}
						plugin.Dialog.confirm('该车辆需要等待审核，确定提交吗？',function(item){
							if(item.value === 1){
								$.ajax({
									type : 'post',
									url : url,
									data : data,
									dataType : "json",
									success : function(result) {
										if (result.isOk) {
											plugin.Toast.show('info','提交成功');
											window.location.href = jurl;
										} else {
											plugin.Toast.show('info','提交失败');
										}
									},
									error : function(result) {
										plugin.Loading.show('网络异常.....');
									}
								});
							}
							this.hide();
						});
					}else{
						if(platecolor.length == 0){//跟以前的方法数据一样
							url = contextPath + '/wx/d/pc/verifycar';
							data = {"perVehicleid" : $("#perVehicleid").val(),
									"vehiclekeyCode" : $("#vehiclekeyCode").val(),
									"sessionKey":sessionKey,
									"openId":openId,
									"imgUpload":imgUpload,
									"a":1};
						}else{//>2两辆强制验证，不然无法保存车辆
							url = contextPath + '/wx/d/pc/verifycar';
							data = {"perVehicleid" : $("#perVehicleid").val(),
									"plateno" : $("#plateno").val(),
									"vehiclekeyCode" : $("#vehiclekeyCode").val(),
									"sessionKey":sessionKey,
									"openId":openId,
									"platecolor":platecolor,
									"imgUpload":imgUpload,
									"a":1};
						}
						$.ajax({
							type : 'post',
							url : url,
							data : data,
							dataType : "json",
							success : function(result) {
								if (result.isOk) {
									plugin.Toast.show('info','验证成功');
									window.location.href = jurl;
								} else {
									plugin.Toast.show('info',result.error);
								}
							},
							error : function(result) {
								plugin.Loading.show('网络异常.....');
							}
						});
					}
				}else{
					plugin.Toast.show('info','验证失败');
				}
			}
		});
	}else{
		plugin.Toast.show('info','请输入末6位车辆识别代号');
	}
}



