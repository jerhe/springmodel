$(function(){
	account.addcar.init({
        provinceCode:$('#provinceCode').val(),
        cityCode:$('#cityCode').val(),
        defalutColor:'blue'
	});
	$("#button").click(function(){
		var sessionKey = $("#sessionKey").val();
		var plateInfo = account.addcar.getPlateNum();
		var plugin = lib.util.init({
			toast:{
				duration:3000
			},
			dialog:{
				title:'提示',
				content:'恭喜成功了',
				buttons:[{
					display:"确定",
					action:function(){
						this.hide();
					}
				},{
					display:'取消',
					action:function(){
						this.hide();
					}
				}]
			}
		});
		var $p = /^[\u4e00-\u9fa5][A-Za-z][\w\u4e00-\u9fa5][\w]{3}[\w\u4e00-\u9fa5]$/;
		var carNum = plateInfo.plateNo;
		var platecolor = plateInfo.plateColor;
		if(platecolor == 26) {
			$p = /^[\u4e00-\u9fa5][A-Z_a-z][\w\u4e00-\u9fa5][\w]{4}[\w\u4e00-\u9fa5]$/;
		}
		if($p.test(carNum)){
			var plateno = carNum.toUpperCase();
			var appId = $("#appId").val();
			var openId = $("#openId").val();
			var wxAppId = $("#wxAppId").val();
			if((plateno.length == 7 && platecolor != 26) || (plateno.length == 8 && platecolor == 26)){
				if(platecolor != ""){
					if(size > 200000){//size为当前的车辆数， 车辆>=3的时候，需要强行认证(包括删除的)
						var isPayurl = "";
						if(payUrl.length != 0){
							isPayurl = 1;
						}
						window.location.href = contextPath+"/wx/j/pc/goVerifycar?plateno="+plateno+"&sessionKey="+sessionKey+"&openId="+openId+"&platecolor="+platecolor+"&isPayurl="+isPayurl;
					}else{
						$.ajax({
							type : 'post',
							url : contextPath + '/wx/d/pc/addcar',
							data : {"plateno" : plateno,"platecolor" : platecolor,"sessionKey":sessionKey,"appId":appId,"openId":openId,"wxAppId":wxAppId},
							dataType : "json",
							success : function(result) {
								if (result.isOk) {
									plugin.Toast.show('info','添加车辆成功');
									if(payUrl.length == 0){
										window.location.href = contextPath + "/wx/j/pc/goMyCar?sessionKey="+sessionKey;
									}else{
										window.location.href = payUrl;
									}
								} else {
									if(result.errorCode == 60403){
										plugin.Toast.show('info',result.error);
									}else if(result.errorCode == 10001){
										plugin.Toast.show('info',result.error);
									}else{
										plugin.Toast.show('info','添加车辆失败');
									}
								}
							},
							error : function(result) {
								plugin.Loading.show('网络异常.....');
							}
						});
					}
				}else{
					plugin.Toast.show('info','请选择车牌颜色');
				}
			}else{
				plugin.Toast.show('info','车牌号格式不正确，请重输');
			}
		}else{
			plugin.Toast.show('info','车牌格式错误');
		}
	});
});