$(document).ready(function(){
    /*setInterval(giftRotate, 100);
    countDown();
    setInterval(countDown, 1000);*/

    //setInterval(xiaoQuLabelFlash, 500);

    /*
    //关闭弹出窗加载音频
    $('#pop_close,.closex').click(function() {
        document.getElementById('yao').play();
        document.getElementById('yao').pause();
        $(this).parents('.cover').css('display', 'none');
        shakeReady = true;
    });
    */

    var SHAKE_THRESHOLD = 1000;
    var last_update = 0;
    var x = y = z = last_x = last_y = last_z = 0;
    if(window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        //alert('您的设备不支持摇一摇');
    }
    function deviceMotionHandler(eventData) {
        //alert(1);
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if((curTime - last_update) > 100) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
            if(speed > SHAKE_THRESHOLD) {
                var order = $("#log tr").length + 1;
                if (shakeReady){
                    shakeReady = 0;
                    doRun();
                }
            };
            last_x = x;
            last_y = y;
            last_z = z;
        };
    };//摇一摇触发

    jQuery(function(){
        jQuery('.footer-bg').click(function(){
            if(jQuery('.footer-nav .off').length){
                jQuery('.footer-nav .footer-nav-plus').removeClass('off');
                jQuery('.footer-bg').hide();
                jQuery('.footer-nav dl').animate({opacity: "0"}, 100, "linear");
            }
        });
        jQuery('.footer-nav .footer-nav-plus').click(function(){
            if(jQuery('.footer-nav .off').length==0){
                jQuery('.footer-nav .footer-nav-plus').addClass('off');
                jQuery('.footer-bg').show();
                jQuery('.footer-nav dl').show().animate({opacity: "1"}, 100, "linear");
            }else{
                jQuery('.footer-nav .footer-nav-plus').removeClass('off');
                jQuery('.footer-bg').hide();
                jQuery('.footer-nav dl').animate({opacity: "0"}, 100, "linear").hide();
            }
        });
        jQuery('.footer-ad-close').click(function(){
            jQuery(this).parent('.footer-ad').hide();
        });
    });

    jQuery(function() {
        jQuery("img").lazyload({
            event : "scroll",
            effect : "fadeIn",
            threshold : 300,
            placeholder : contextPath + "/resources/img/plug/bobing/load.gif"
        });
    });

});

var shakeReady = true;//可以摇一摇
var lastRunTime = 0;

function doRun(){
    var timestamp = (new Date()).valueOf();
    if (timestamp - lastRunTime < 1000){
        showResult('抱歉！您操作太快了！');
        return;
    }
    lastRunTime = timestamp;
    var date = new Date();
    var hour = date.getHours();
    if (hour >= 0 && hour < 2){
        showResult('抱歉!凌晨00:00到2:00为系统统计数据时段，停止博饼服务!');
        return;
    }
    var remainCount = $('#remainCount2').html();
    if (remainCount <= 0){
        showResult("今日博饼次数已用完!<br>&nbsp;", "");
        //$('#share').show();
        return;
    }
    $.ajax({
        url:"playBoBing",
        type:"post",
        dataType:"json",
        data:{tableId: $('#tableId').val(), weixinUserId: $('#weixinUserId').val()},
        beforeSend:function(){
            $('#bobing').hide();
            $('.result').hide();
            $('.dice').addClass('active');
            document.getElementById('yao').play();
        },
        success:function(data){
            doRunSuccessCall(data);
        },
        complete :function()
        {
        }
    });
}

function showResult(content, img){
    shakeReady = false;
    $('.result').show();
    $('.result').find('.icon').children('img').attr('src',img);
    $('.result-tx').html(content);
}

function closeResult(){
    $('.result').hide();
    $('#share').hide();
    shakeReady = true;
}

function doRunSuccessCall(data){
    if(data.status == true)
    {
        var arr = data.resultarr.split(",");
        for (var i=0; i < 6; i++){
            $('.dice'+[i+1]).children('img').attr('src', contextPath + '/resources/img/plug/bobing/dice' + arr[i] + '.png');
        }
        setTimeout(function(){
            var imgUrl;
            if (data.img == 0){
                imgUrl = contextPath + '/resources/img/plug/bobing/cry.png';
            }else if (data.img == 1){
                imgUrl = contextPath + '/resources/img/plug/bobing/love.png';
            }else{
                imgUrl = contextPath + '/resources/img/plug/bobing/happy.png';
            }

            var i = parseInt(5*Math.random()) + 1;
            var helpHint = "";

            /*
            if (i == 1){
                helpHint = "<p style='font-size: 14px'>友情提示：在博饼首页，每天连续签到可以获得大量额外的博饼次哦！</p>";
            }
            if (i == 2){
                helpHint = "<p style='font-size: 14px'>天天惊喜：请长按页面底部二维码关注并进入公众号，在【中秋博饼】菜单中点击【抽奖】，天天有惊喜！</p>";
            }
            if (i == 3){
                helpHint = "<p style='font-size: 14px'>幸福提示：在博饼首页，帮您所在小区开通便民通讯录，做一名热心的好邻居哦！</p>";
            }
            if (i == 4){
                helpHint = "<p style='font-size: 14px'>温馨提示：让您的孩子一起参与博饼，享受叮叮当当的家庭和谐之音:)</p>";
            }
            if (i == 5){
                helpHint = "<p style='font-size: 14px'>快乐提示：礼品、积分很重要，快乐更重要哦!</p>";
            }
            */
            showResult(data.resultname+"    （"+data.credits+" 分）" + helpHint, imgUrl);
            //$('#remainCount').html(data.remainCount);
            $('#remainCount2').html(data.remainCount);
            $('#totalScore').html(data.totalScore);
            $('#todayUseCount').html(data.todayUseCount);
            $('#todayScore').html(data.todayScore);
            $('#sortIndex').html(data.sortIndex);
        },1000);

        setTimeout(function(){
            $('#bobing').show();
            $('.dice').removeClass('active');
            shakeReady = true;
        },1200);
    }
    else
    {
        showResult(data.msg);
        //window.location.reload(true);
        return false;
    }
}


function doHelp(tableId, homeUserId){
    var params = {tableId: tableId, homeUserId: homeUserId};
    $.ajax({
        url:"/bobing/help",
        type:"post",
        dataType:"json",
        data:params,
        beforeSend:function(){
        },
        success:function(data){
            if (data.status == 1){
                alert("已为此好友助力成功！感谢您的参与！");
                window.location.reload(true);
                return;
            }
            if (data.status == 2){
                alert("今日您已为此好友助力过了，明日可以继续助力！感谢您的参与！");
                return;
            }
            if (data.status == 3){
                alert("抱歉！您不能给自己助力！请分享此页面给您好友，让好友给您助力！");
                return;
            }
            if (data.status == 4){
                alert("今日此好友助力人数已满！");
                return;
            }
            alert(data.msg);
        },
        complete :function(){
        }
    });
}


var num = 0;
function giftRotate(){
    num ++ ;
    $("#imgGift").rotate(10 * num);
}

/*
var tag = 0;
function xiaoQuLabelFlash(){
    if (tag == 0){
        tag = 1;
        $('#xiaoqu').hide();
    }else{
        tag = 0;
        $('#xiaoqu').show();
    }
}
*/
