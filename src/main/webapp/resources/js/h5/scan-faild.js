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

	module.exports = __webpack_require__(701);


/***/ },

/***/ 89:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.create = create;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	function create(name, opts) {
		var namespace, index, len;
		if (name in this && typeof this[name] == "function") {
			return this[name].create(opts);
		} else {
			return createNs.call(this, name, opts);
		}
	}
	var _bind = function _bind(options) {
		//遍历当前的options
		for (var key in options) {
			var value = options[key],
			    pattern = /^on=?[A-Z]{1}\w*/;
			//当前属性为事件
			if (pattern.test(key)) {
				if (value !== null && typeof value === 'function') {
					if (!(key in this.events)) {
						this.events[key] = [];
					}
					this.events[key].push(value);
				}
			}
		}
	};

	var Component = exports.Component = function () {
		//构造函数
		function Component(opts) {
			_classCallCheck(this, Component);

			this.events = {};
			var arg = Array.prototype.slice.call(arguments);
			if (arg) {
				_bind.apply(this, arg);
			}
		}

		_createClass(Component, [{
			key: "bind",
			value: function bind(name, fn) {
				this.events[name] = this.events[name] || [];
				this.events[name].push(fn);
			}
		}, {
			key: "trigger",
			value: function trigger() {
				var arg = Array.prototype.slice.call(arguments),
				    eventName = arg.shift();
				if (eventName in this.events) {
					var events = this.events[eventName];
					for (var i = 0, len = events.length; i < len; i += 1) {
						var method = events[i];
						method.apply(this, arg);
					}
				}
			}
		}]);

		return Component;
	}();
	//创建全名空间


	exports.default = {
		create: create,
		Component: Component
	};

/***/ },

/***/ 701:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(89);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(738);
	_index2.default.create('account.scanFaild', function () {

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
		return {
			init: function init(opts) {
				this.opts = opts;
				//_initScan(this.opts.scanQR,this.opts.reScan);
			}
		};
	});

/***/ },

/***/ 738:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });