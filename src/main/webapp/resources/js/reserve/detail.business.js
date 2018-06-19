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

$(function() {
	var relinfoIds = {};
//	$("#button").prop("disabled", true);
//	$("#button").addClass("disable");
	
	$(".checklist").click(function(){
		$("#button").prop("disabled", false);
		$("#button").removeClass("disable");
		relinfoIds = $(this).attr("relinfoIds");//点击单选框获取当前relinfoIds
	});
	
	$("#button").click(function(){
		if(spaceList.length == 0){
			plugin.Toast.show('提示','目前暂时没有空余车位');
		}else{
			if($.isEmptyObject(relinfoIds)){
				plugin.Toast.show('提示','请选择预定条件');
			}else{
				plugin.Loading.show('请稍后……');
				$("#button").prop("disabled", true);
				$("#button").addClass("disable");
				var timeType = 1;//暂时用
				$.ajax({
					type : 'post',
					url : contextPath + '/wx/d/rc/responseReserve',
					data : {
						parkId : parkId,
						parkNo : parkNo, 
						preType : preType, 
						timeType : timeType,
						openId : openId,
						relinfoIds : relinfoIds
					},
					dataType : "json",
					success : function(result) {
						if(result.isOk == false){
							plugin.Toast.show('info','预定失败');
							$("#button").prop("disabled", true);
							$("#button").addClass("disable");
						}else{
							window.location.href = contextPath + "/wx/j/rc/reserveDetail?openId="+openId+"&parkId="+parkId+"&preType="+preType+"&preinfoId="+result.data.preinfoId+"&parkNo="+result.data.parkNo+"&relinfoIds="+relinfoIds+"&fee="+result.data.fee;
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
		}
		
	});
	
	
});