webpackJsonp([12,0],{0:function(n,t,e){n.exports=e(320)},12:function(n,t){"use strict";n.exports=function(){function n(n,t){var e,n=n.split("."),r=window;if(n.length>0){e=n[0],r[e]=r[e]||{};for(var i=1,c=n.length;c>i;i+=1)r=r[e],e=n[i],r[e]=r[e]||{}}return t&&"function"==typeof t?r[e]=t():r[e]=t,r[e]}return{create:function(t,e){return t in this&&"function"==typeof this[t]?this[t].create(e):n.call(this,t,e)}}}()},320:function(n,t,e){"use strict";function r(n){return n&&n.__esModule?n:{"default":n}}var i=e(12),c=r(i);e(344),c["default"].create("account.verifycar",function(){function n(n){var t,i=function(n){switch(n){case"exceed_size":t="文件大小超出";break;case"interrupt":t="上传暂停";break;default:t="上传失败，请重试"}};"invalid"===n.getStatus()?i(n.statusText):(e.makeThumb(n,function(n,t){if(n)return void $wrap.text("不能预览");$('<img src="'+t+'">');r.css({background:"url("+t+")","background-size":"contain","background-repeat":"no-repeat","background-position":"center"})},c,o),n.rotation=0),n.on("statuschange",function(n,t){"progress"===t&&u.width(0)})}function t(t){var i=r.data("img");i&&r.css({background:"url("+i+")","background-size":"contain","background-position":"center","background-repeat":"no-repeat"}),e=WebUploader.create({server:t.api,pick:t.picker,resize:!1}),e.onFileQueued=function(t){n(t),e.upload()},e.on("uploadSuccess",function(n,e){t.success(n,e)})}var e,r=$("#car-view"),i=window.devicePixelRatio||1,c=130*i,o=130*i,u=$(".progress");return{init:function(n){t(n.uploader)}}})},344:function(n,t){}});