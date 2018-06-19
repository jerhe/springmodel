var sessionKey = $("#sessionKey").val();
var openId = $("#openId").val();
var plugin = lib.util.init({
	toast:{
		duration:3000
	},
	dialog:{
		//title:'确定要删除该车辆吗',
		closeBtn:false,
		content:'恭喜成功了',
		tapMaskToClose:false,
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
account.mycar.init({
	onDelete:function(){
		var deleteItem = this;
		var vehicleId = this.find(".icon-del").attr("data");
		plugin.Dialog.confirm('确定要删除该车辆吗',function(item){
			if(item.value === 1){
				deleteItem.remove();
				$.ajax({
					type : 'post',
					url : contextPath + '/wx/d/pc/deleteCar',
					data : {"perVehicleid" : vehicleId,"openId":openId},
					dataType : "json",
					success : function(result) {
						if (result.isOk) {
							plugin.Toast.show('info','删除成功');
							location.href = contextPath + "/wx/j/pc/goMyCar?openId="+openId;
						} else {
							plugin.Toast.show('info','删除失败');
						}
					},
					error : function(result) {
						plugin.Loading.show('网络异常.....');
					}
				});
			}
			this.hide();
		});
	}
});

$(".yan").click(function(){
	var cagrade = $(this).attr("stat");
	var plateno = $(this).attr("value");
	var platecolor = $(this).attr("data-color");
	var id = $(this).attr("data");
	var verifycar = $("#verifycar").val();
	if(cagrade != 1){
		window.location.href = contextPath+"/wx/j/pc/goVerifycar?id="+id+"&plateno="+plateno+"&sessionKey="+sessionKey+"&openId="+openId;
	}else{
		plugin.Toast.show('info','这辆车已验证，请选择未验证车辆');
	}
});
$("#add").click(function(){
	if(countCar < 10){
		window.location.href =  contextPath+"/wx/j/pc/goAddCar?sessionKey="+sessionKey+"&openId="+openId;
	}else{
		plugin.Toast.show('info','当前用户已达到最大绑定车辆数');
	}
});

//自动代扣
var url = '';
var vehicleId = '';
$(".iphone-switch").bind("click",function(){
	var $this = $(this);
	vehicleId = $this.attr("data-vehicleId");
	var cagrade = $this.attr("data-cagrade");
	var isEtc = $this.attr("data-isEtc");
//	if(cagrade == 1){
		if(isEtc == "0"){//开启
			url = contextPath + '/wx/d/pc/setVehicleOpenEtc';
			$.ajax({
				type : 'post',
				url : url,
				data : {
					vehicleId:vehicleId,
					sessionKey:sessionKey,
					openId:openId
				},
				dataType : "json",
				success : function(result) {
					if (result.isOk) {
						$this.attr("data-isEtc","1");
						plugin.Toast.show('info',result.desc);
					} else {
						$this.prop('checked',false)
						$this.attr("data-isEtc","0");
						plugin.Toast.show('info',result.error);
					}
				},
				error : function(result) {
					flag = false;
					plugin.Loading.show('网络异常.....');
				},
				complete : function(){
					plugin.Loading.hide();
				}
			});
			
		}else{//关闭
			url = contextPath + '/wx/d/pc/setVehicleCloseEtc';
			$.ajax({
				type : 'post',
				url : url,
				data : {
					vehicleId:vehicleId,
					sessionKey:sessionKey,
					openId:openId
				},
				dataType : "json",
				success : function(result) {
					if (result.isOk) {
						$this.attr("data-isEtc","0");
						plugin.Toast.show('info',result.desc);
					} else {
						$this.attr("data-isEtc","1");
						plugin.Toast.show('info',result.error);
					}
				},
				error : function(result) {
					flag = false;
					plugin.Loading.show('网络异常.....');
				},
				complete : function(){
					plugin.Loading.hide();
				}
			});
		}
//	}else{
//		//提示
//		plugin.Toast.show('info','您的车辆还未审核通过，暂不能开启自动代扣功能.');
//		return false;
//	}
});


