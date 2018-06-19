$(document).ready(function(){
    doShareReady();
});

/**
 * 微信分享前必须签调用下这个函数，避免jsapi_ticket过期(7200秒）
 */
function doShareReady(){
    //var tableId = $('#tableId').val();
    //var weixinUserId = $('#homeUserId').val();
    var lineLink = window.location.href;// httpRoot() + "/bobing/table" + tableId + "/home" + weixinUserId + ".html";
    $.ajax({
        url:"/bobing/weixinShareParams",
        type:"post",
        dataType:"json",
        data:{shareUrl: lineLink},
        beforeSend:function(){
        },
        success:function(data){
            var imgUrl =  httpRoot() + "/mobile/bobing/style/sharelogo.png";
            var shareTitle = "2016年厦门元福财务中秋博饼活动";
            var descContent = '赢现金500元，等你来战！';
            var appid = data.appId;
            wx.config({
                debug: false,  //调式模式，设置为true后会直接在网页上弹出调试信息，用于排查问题
                appId: appid,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [  //需要使用的网页服务接口
                    'checkJsApi',  //判断当前客户端版本是否支持指定JS接口
                    'onMenuShareTimeline', //分享给好友
                    'onMenuShareAppMessage', //分享到朋友圈
                    'onMenuShareQQ',  //分享到QQ
                    'onMenuShareWeibo' //分享到微博
                ]
            });
            wx.ready(function () {   //ready函数用于调用API，如果你的网页在加载后就需要自定义分享和回调功能，需要在此调用分享函数。//如果是微信游戏结束后，需要点击按钮触发得到分值后分享，这里就不需要调用API了，可以在按钮上绑定事件直接调用。因此，微信游戏由于大多需要用户先触发获取分值，此处请不要填写如下所示的分享API
                //分享到朋友圈的API
                wx.onMenuShareTimeline({
                    title: shareTitle, // 分享标题
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        //alert('分享成功!');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        //alert("取消分享!");
                    }

                });

                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        //alert('分享成功!');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        //alert("取消分享!");
                    }
                });

                //分享到qq
                wx.onMenuShareQQ({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        //alert('分享成功!');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        //alert("取消分享!");
                    }
                });

                //分享到腾讯微博
                wx.onMenuShareWeibo({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        //alert('分享成功!');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        //alert("取消分享!");
                    }
                });
            });
            wx.error(function (res) {
                //alert(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
                $('#errMsg').html(res.errMsg);
            });

        },
        complete :function(){
        }
    });
}