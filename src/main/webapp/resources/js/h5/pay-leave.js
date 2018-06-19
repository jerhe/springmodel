/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/resources/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(706);


/***/ },

/***/ 17:
/***/ function(module, exports) {

	"use strict";

	module.exports = function Factory() {
		function createNs(namespace, constructor) {
			var namespace = namespace.split("."),
			    root,
			    ns = window;
			if (namespace.length > 0) {
				root = namespace[0];
				ns[root] = ns[root] || {};
				for (var i = 1, len = namespace.length; i < len; i += 1) {
					ns = ns[root];
					root = namespace[i];
					ns[root] = ns[root] || {};
				}
			}
			if (constructor && typeof constructor == "function") {
				ns[root] = constructor();
			} else {
				ns[root] = constructor;
			}
			return ns[root];
		}
		return {
			create: function create(name, opts) {
				var namespace, index, len;
				if (name in this && typeof this[name] == "function") {
					return this[name].create(opts);
				} else {
					return createNs.call(this, name, opts);
				}
			}
		};
	}();

/***/ },

/***/ 706:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _factory = __webpack_require__(17);

	var _factory2 = _interopRequireDefault(_factory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(741);
	_factory2.default.create('fee.payLeave', function () {
		function _getWxInfo(api, data, fn) {
			$.ajax({
				url: api,
				data: data,
				type: 'post',
				dataType: 'json',
				success: function success(data) {
					if (data.isOk) {
						fn(data.data);
					}
				}
			});
		}
		function _initScan(opts, reScan) {
			var params = {
				url: location.href
			};
			if (window.wx && window.wx.ready) {
				_getWxInfo(opts.api, params, function (data) {
					wx.config({
						"appId": data.appId,
						"timestamp": data.timestamp,
						"nonceStr": data.noncestr, //随机串    
						"signature": data.signature,
						jsApiList: opts.jsApiList
					});
				});

				wx.ready(function () {
					$(reScan).live('click', function () {
						wx.scanQRCode({
							needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
							scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
							success: function success(res) {
								var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
								opts.successGetCode(result);
							}
						});
					});
				});
				wx.error(function (res) {
					console.log(res);
				});
			} else if (window.Ali) {
				if (navigator.userAgent.indexOf("AlipayClient") === -1) {
					Ali.alert({
						title: '亲',
						message: '请在支付宝钱包内运行',
						button: '确定'
					});
				} else {
					if (Ali.alipayVersion.slice(0, 3) >= 8.1) {
						$(reScan).live('click', function () {
							Ali.scan({
								type: 'qr'
							}, function (result) {
								if (result.errorCode) {
									//没有扫码的情况
									//errorCode=10，用户取消
									//errorCode=11，操作失败
									switch (result.errorCode) {
										case 10:

											Ali.alert({
												title: '亲',
												message: '已取消扫码',
												button: '确定'
											});
											break;
										default:
											Ali.alert({
												title: '亲',
												message: '操作失败',
												button: '确定'
											});
									}
								} else {
									if (result.barCode !== undefined) {
										opts.successGetCode(result.barCode);
									} else if (result.qrCode !== undefined) {
										opts.successGetCode(result.qrCode);
									} else if (result.cardNumber !== undefined) {
										opts.successGetCode(result.cardNumber);
									}
								}
							});
						});
					} else {
						Ali.alert({
							title: '亲',
							message: '请升级您的钱包到最新版',
							button: '确定'
						});
					}
				}
			}
		}
		function _bindEvent() {
			var url = this.opts.confirmURL;
			var scanQR = this.opts.scanQR;
			var reScan = $('#reScan');
			$('#confirm').on('click', function () {
				location.href = url;
			});
			reScan.on('click', function () {
				_initScan(scanQR, reScan);
			});
		}
		return {
			init: function init(opts) {
				this.opts = opts;
				_bindEvent.call(this);
			}
		};
	});

/***/ },

/***/ 741:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });