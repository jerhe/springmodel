

function doSigned(url, tableId){
    var params = {tableId: tableId};
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        data:params,
        beforeSend:function(){
        },
        success:function(data){
            if (data.success == 1){
                $('#signedDays').html(data.sendTimes);
                $('#imgSigned').attr('src', contextPath + "/resources/img/plug/bobing/ok.png');
                alert("恭喜你签到成功！系统赠送您" + data.addTimes + "次博饼机会");
                return;
            }
            alert(data.msg);
        },
        complete :function(){
        }
    });
}


function f2(v){
    return v < 10 ? ('0'+v) : v;
}

function countDown(){
    var showDate = date2show(new Date())
    var today = show2date(showDate);
    var currentWeek = today.getDay();
    if ( currentWeek == 0 ){
        currentWeek = 7;
    }
    var dayValue = 24 * 3600 * 1000;
    var endDateValue = today.getTime() + (8 - currentWeek) * dayValue; //下星期一
    var totalSeconds = endDateValue - new Date().getTime();
    totalSeconds = totalSeconds / 1000;
    var days =  parseInt(totalSeconds / (24 * 3600));
    var hour = parseInt(totalSeconds / 3600 % 24);
    var minute = parseInt(totalSeconds / 60 % 60);
    var seconds = parseInt(totalSeconds % 60);
    var html = days + '天' + f2(hour) + "时" + f2(minute) + "分" + f2(seconds) + '秒';
    $("#countDown").html(html);
}

