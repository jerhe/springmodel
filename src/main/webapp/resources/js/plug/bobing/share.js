wx.config({
	debug: false,
	appId: appIdstr,
	timestamp: timestampstr,
	nonceStr: nonceStrstr,
	signature: signaturestr,
	jsApiList: [
		'checkJsApi',
		'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'onMenuShareQQ',
		'onMenuShareWeibo',
		'hideMenuItems',
		'showMenuItems',
		'hideAllNonBaseMenuItem',
		'showAllNonBaseMenuItem',
		'translateVoice',
		'startRecord',
		'stopRecord',
		'onRecordEnd',
		'playVoice',
		'pauseVoice',
		'stopVoice',
		'uploadVoice',
		'downloadVoice',
		'chooseImage',
		'previewImage',
		'uploadImage',
		'downloadImage',
		'getNetworkType',
		'openLocation',
		'getLocation',
		'hideOptionMenu',
		'showOptionMenu',
		'closeWindow',
		'scanQRCode',
		'chooseWXPay',
		'openProductSpecificView',
		'addCard',
		'chooseCard',
		'openCard'
	]
});
 
function wx_share() { 
	wx.ready(function () {
		wx.onMenuShareAppMessage({
			title: document.getElementById('wx-share-title').value,
			desc: document.getElementById('wx-share-desc').value,
			link: document.getElementById("wx-share-link").value,
			imgUrl: document.getElementById('wx-share-img').value,
			trigger: function (res) {
			},
			success: function (res) {
			},
			cancel: function (res) {
			},
			fail: function (res) {
			}
		});
	
		wx.onMenuShareTimeline({
			title: document.getElementById('wx-share-title').value,
			link: document.getElementById("wx-share-link").value,
			imgUrl: document.getElementById('wx-share-img').value,
			trigger: function (res) {
			},
			success: function (res) {
			},
			cancel: function (res) {
			},
			fail: function (res) {
			}
		});
	
		wx.onMenuShareQQ({
			title: document.getElementById('wx-share-title').value,
			desc: document.getElementById('wx-share-desc').value,
			link: document.getElementById("wx-share-link").value,
			imgUrl: document.getElementById('wx-share-img').value,
			trigger: function (res) {
			},
			complete: function (res) {
			},
			success: function (res) {
			},
			cancel: function (res) {
			},
			fail: function (res) {
			}
		});
	
		wx.onMenuShareWeibo({
			title: document.getElementById('wx-share-title').value,
			desc: document.getElementById('wx-share-desc').value,
			link: document.getElementById("wx-share-link").value,
			imgUrl: document.getElementById('wx-share-img').value,
			trigger: function (res) {
			},
			complete: function (res) {
			},
			success: function (res) {
			},
			cancel: function (res) {
			},
			fail: function (res) {
			}
		}); 
	});
}
wx_share();