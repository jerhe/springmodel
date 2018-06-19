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
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(352);


/***/ },

/***/ 11:
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

/***/ 347:
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var timmer = void 0; //私用变量：标识倒计时的计时器
		var getAuth = false; //是否正在获取验证码，false：否，true：是

		function _bindEvent() {
			var _opts = this.opts;
			var authApi = _opts.authApi;
			var type = _opts.type;
			var mobileEl = _opts.mobileEl;
			var codeType = _opts.codeType;
			var duration = _opts.duration;
			var authCodeEl = _opts.authCodeEl;
			var disableClass = _opts.disableClass;
			var onError = _opts.onError;

			$(authCodeEl).on('click', function (e) {
				var mobile = $(mobileEl).val();
				var $this = $(this);
				var reg = /^1[0-9]{10}$/;
				if (!getAuth) {
					if (!reg.test(mobile)) {
						onError(mobile);
					} else {
						getAuth = true;
						clearInterval(timmer);
						_getCodeFromServer({
							api: authApi,
							type: type,
							data: {
								linkPhone: mobile,
								codeType: codeType
							},
							fn: function fn(err, data) {
								if (!err && data.isOk) {
									_startAuthCode($this, duration, disableClass);
								}
							}
						});
					}
				}
			});
		}

		function _getCodeFromServer(_ref) {
			var api = _ref.api;
			var type = _ref.type;
			var data = _ref.data;
			var fn = _ref.fn;

			$.ajax({
				type: type,
				dataType: 'json',
				data: data,
				url: api,
				success: function success(data) {
					fn(null, data);
				},
				error: function error(err) {
					fn(err);
				}
			});
		}

		function _startAuthCode($this, duration, disableClass) {
			$this.addClass(disableClass);
			clearInterval(timmer);
			$this.text(duration + "秒后重新获取");
			timmer = setInterval(function () {
				duration--;
				$this.text(duration + "秒后重新获取");
				if (duration <= 0) {
					getAuth = false;
					clearInterval(timmer);
					$this.removeClass(disableClass);
					$this.text('获取验证码');
					return false;
				}
			}, 1000);
		}

		return {
			init: function init(opts) {
				this.opts = $.extend({}, opts);
				_bindEvent.call(this);
			}
		};
	}();

/***/ },

/***/ 352:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _factory = __webpack_require__(11);

	var _factory2 = _interopRequireDefault(_factory);

	var _authcode = __webpack_require__(347);

	var _authcode2 = _interopRequireDefault(_authcode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(385);
	_factory2.default.create('account.login', function () {
		return {
			init: function init(opts) {
				this.opts = opts;
				_authcode2.default.init(opts.authcode);
			}
		};
	});

/***/ },

/***/ 385:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });