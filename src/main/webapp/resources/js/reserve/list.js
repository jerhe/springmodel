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

	module.exports = __webpack_require__(344);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLE1BQU0sR0FBRztBQUNiLEtBQUcsRUFBRSxPQUFPO0FBQ1osS0FBRyxFQUFFLE1BQU07QUFDWCxLQUFHLEVBQUUsTUFBTTtBQUNYLEtBQUcsRUFBRSxRQUFRO0FBQ2IsS0FBRyxFQUFFLFFBQVE7QUFDYixLQUFHLEVBQUUsUUFBUTtBQUNiLEtBQUcsRUFBRSxRQUFRO0NBQ2QsQ0FBQzs7QUFFRixJQUFNLFFBQVEsR0FBRyxZQUFZO0lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUM7O0FBRTdCLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixTQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQjs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxHQUFHLG9CQUFtQjtBQUMzQyxPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxTQUFLLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM1QixVQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDM0QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUM5QjtLQUNGO0dBQ0Y7O0FBRUQsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFTSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzs7Ozs7O0FBS2hELElBQUksVUFBVSxHQUFHLG9CQUFTLEtBQUssRUFBRTtBQUMvQixTQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQztDQUNwQyxDQUFDOzs7QUFHRixJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNuQixVQUlNLFVBQVUsR0FKaEIsVUFBVSxHQUFHLFVBQVMsS0FBSyxFQUFFO0FBQzNCLFdBQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUJBQW1CLENBQUM7R0FDcEYsQ0FBQztDQUNIO1FBQ08sVUFBVSxHQUFWLFVBQVU7Ozs7O0FBSVgsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxVQUFTLEtBQUssRUFBRTtBQUN0RCxTQUFPLEFBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixHQUFHLEtBQUssQ0FBQztDQUNqRyxDQUFDOzs7OztBQUdLLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDcEMsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRCxRQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDdEIsYUFBTyxDQUFDLENBQUM7S0FDVjtHQUNGO0FBQ0QsU0FBTyxDQUFDLENBQUMsQ0FBQztDQUNYOztBQUdNLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ3ZDLE1BQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFOztBQUU5QixRQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQzNCLGFBQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hCLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ3pCLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2xCLGFBQU8sTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7Ozs7QUFLRCxVQUFNLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztHQUN0Qjs7QUFFRCxNQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUFFLFdBQU8sTUFBTSxDQUFDO0dBQUU7QUFDOUMsU0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUM3Qzs7QUFFTSxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDN0IsTUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQ3pCLFdBQU8sSUFBSSxDQUFDO0dBQ2IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMvQyxXQUFPLElBQUksQ0FBQztHQUNiLE1BQU07QUFDTCxXQUFPLEtBQUssQ0FBQztHQUNkO0NBQ0Y7O0FBRU0sU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQ2xDLE1BQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0IsT0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDdkIsU0FBTyxLQUFLLENBQUM7Q0FDZDs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRU0sU0FBUyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO0FBQ2pELFNBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSSxFQUFFLENBQUM7Q0FDcEQiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuIl19


/***/ },

/***/ 6:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsSUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFbkcsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUNoQyxNQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUc7TUFDdEIsSUFBSSxZQUFBO01BQ0osTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLEdBQUcsRUFBRTtBQUNQLFFBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUN0QixVQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTFCLFdBQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7R0FDeEM7O0FBRUQsTUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7O0FBRzFELE9BQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDOUM7OztBQUdELE1BQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQzNCLFNBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDMUM7O0FBRUQsTUFBSSxHQUFHLEVBQUU7QUFDUCxRQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztHQUN0QjtDQUNGOztBQUVELFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7cUJBRW5CLFNBQVMiLCJmaWxlIjoiZXhjZXB0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgbGV0IGxvYyA9IG5vZGUgJiYgbm9kZS5sb2MsXG4gICAgICBsaW5lLFxuICAgICAgY29sdW1uO1xuICBpZiAobG9jKSB7XG4gICAgbGluZSA9IGxvYy5zdGFydC5saW5lO1xuICAgIGNvbHVtbiA9IGxvYy5zdGFydC5jb2x1bW47XG5cbiAgICBtZXNzYWdlICs9ICcgLSAnICsgbGluZSArICc6JyArIGNvbHVtbjtcbiAgfVxuXG4gIGxldCB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBFeGNlcHRpb24pO1xuICB9XG5cbiAgaWYgKGxvYykge1xuICAgIHRoaXMubGluZU51bWJlciA9IGxpbmU7XG4gICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gIH1cbn1cblxuRXhjZXB0aW9uLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG5leHBvcnQgZGVmYXVsdCBFeGNlcHRpb247XG4iXX0=


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(20)['default'];


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

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(3);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = __webpack_require__(23);

	var _decorators = __webpack_require__(21);

	var _logger = __webpack_require__(31);

	var _logger2 = _interopRequireDefault(_logger);

	var VERSION = '4.0.5';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 7;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  }
	};

	var log = _logger2['default'].log;

	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7cUJBQTRDLFNBQVM7O3lCQUMvQixhQUFhOzs7O3VCQUNFLFdBQVc7OzBCQUNSLGNBQWM7O3NCQUNuQyxVQUFVOzs7O0FBRXRCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQzs7QUFDeEIsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7OztBQUU1QixJQUFNLGdCQUFnQixHQUFHO0FBQzlCLEdBQUMsRUFBRSxhQUFhO0FBQ2hCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxVQUFVO0FBQ2IsR0FBQyxFQUFFLGtCQUFrQjtBQUNyQixHQUFDLEVBQUUsaUJBQWlCO0FBQ3BCLEdBQUMsRUFBRSxVQUFVO0NBQ2QsQ0FBQzs7O0FBRUYsSUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUM7O0FBRTlCLFNBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFDbkUsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzdCLE1BQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztBQUMvQixNQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7O0FBRW5DLGtDQUF1QixJQUFJLENBQUMsQ0FBQztBQUM3Qix3Q0FBMEIsSUFBSSxDQUFDLENBQUM7Q0FDakM7O0FBRUQscUJBQXFCLENBQUMsU0FBUyxHQUFHO0FBQ2hDLGFBQVcsRUFBRSxxQkFBcUI7O0FBRWxDLFFBQU0scUJBQVE7QUFDZCxLQUFHLEVBQUUsb0JBQU8sR0FBRzs7QUFFZixnQkFBYyxFQUFFLHdCQUFTLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDakMsUUFBSSxnQkFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQ3RDLFVBQUksRUFBRSxFQUFFO0FBQUUsY0FBTSwyQkFBYyx5Q0FBeUMsQ0FBQyxDQUFDO09BQUU7QUFDM0Usb0JBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1QixNQUFNO0FBQ0wsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDekI7R0FDRjtBQUNELGtCQUFnQixFQUFFLDBCQUFTLElBQUksRUFBRTtBQUMvQixXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDM0I7O0FBRUQsaUJBQWUsRUFBRSx5QkFBUyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLFFBQUksZ0JBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxvQkFBTyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCLE1BQU07QUFDTCxVQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtBQUNsQyxjQUFNLHlFQUEwRCxJQUFJLG9CQUFpQixDQUFDO09BQ3ZGO0FBQ0QsVUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7S0FDL0I7R0FDRjtBQUNELG1CQUFpQixFQUFFLDJCQUFTLElBQUksRUFBRTtBQUNoQyxXQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDNUI7O0FBRUQsbUJBQWlCLEVBQUUsMkJBQVMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUNwQyxRQUFJLGdCQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7QUFDdEMsVUFBSSxFQUFFLEVBQUU7QUFBRSxjQUFNLDJCQUFjLDRDQUE0QyxDQUFDLENBQUM7T0FBRTtBQUM5RSxvQkFBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQy9CLE1BQU07QUFDTCxVQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM1QjtHQUNGO0FBQ0QscUJBQW1CLEVBQUUsNkJBQVMsSUFBSSxFQUFFO0FBQ2xDLFdBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUM5QjtDQUNGLENBQUM7O0FBRUssSUFBSSxHQUFHLEdBQUcsb0JBQU8sR0FBRyxDQUFDOzs7UUFFcEIsV0FBVztRQUFFLE1BQU0iLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjUnO1xuZXhwb3J0IGNvbnN0IENPTVBJTEVSX1JFVklTSU9OID0gNztcblxuZXhwb3J0IGNvbnN0IFJFVklTSU9OX0NIQU5HRVMgPSB7XG4gIDE6ICc8PSAxLjAucmMuMicsIC8vIDEuMC5yYy4yIGlzIGFjdHVhbGx5IHJldjIgYnV0IGRvZXNuJ3QgcmVwb3J0IGl0XG4gIDI6ICc9PSAxLjAuMC1yYy4zJyxcbiAgMzogJz09IDEuMC4wLXJjLjQnLFxuICA0OiAnPT0gMS54LngnLFxuICA1OiAnPT0gMi4wLjAtYWxwaGEueCcsXG4gIDY6ICc+PSAyLjAuMC1iZXRhLjEnLFxuICA3OiAnPj0gNC4wLjAnXG59O1xuXG5jb25zdCBvYmplY3RUeXBlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMsIGRlY29yYXRvcnMpIHtcbiAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuICB0aGlzLmRlY29yYXRvcnMgPSBkZWNvcmF0b3JzIHx8IHt9O1xuXG4gIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG4gIHJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnModGhpcyk7XG59XG5cbkhhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgbG9nZ2VyOiBsb2dnZXIsXG4gIGxvZzogbG9nZ2VyLmxvZyxcblxuICByZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHBhcnRpYWwpIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgZXh0ZW5kKHRoaXMucGFydGlhbHMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHBhcnRpYWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oYEF0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgYSBwYXJ0aWFsIGNhbGxlZCBcIiR7bmFtZX1cIiBhcyB1bmRlZmluZWRgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSBwYXJ0aWFsO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJ0aWFsc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgZGVjb3JhdG9ycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5kZWNvcmF0b3JzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWNvcmF0b3JzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuZGVjb3JhdG9yc1tuYW1lXTtcbiAgfVxufTtcblxuZXhwb3J0IGxldCBsb2cgPSBsb2dnZXIubG9nO1xuXG5leHBvcnQge2NyZWF0ZUZyYW1lLCBsb2dnZXJ9O1xuIl19


/***/ },

/***/ 15:
/***/ function(module, exports) {

	'use strict';

	var FPS = 60;
	var INTERVAL = 1000 / FPS;

	function setTimeoutFrame(cb) {
	    return setTimeout(cb, INTERVAL);
	}

	function clearTimeoutFrame(tick) {
	    clearTimeout(tick);
	}

	var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || setTimeoutFrame;

	var cancelAnimationFrame = window.cancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeoutFrame;

	if (requestAnimationFrame === setTimeoutFrame || cancelAnimationFrame === clearTimeoutFrame) {
	    requestAnimationFrame = setTimeoutFrame;
	    cancelAnimationFrame = clearTimeoutFrame;
	}

	function Frame(fun) {
	    var isRequested = false;
	    Object.defineProperty(this, 'isRequested', {
	        get: function get() {
	            return isRequested;
	        }
	    });

	    var callback = [];
	    function done() {
	        isRequested = true;
	        if (callback) {
	            callback.forEach(function (cb) {
	                cb && cb();
	            });
	        }
	    }

	    var tick;
	    var isCancel = false;
	    this.request = function () {
	        if (isRequested) return;

	        var args = arguments;
	        isCancel = false;
	        tick = requestAnimationFrame(function () {
	            if (isCancel) return;
	            fun.apply(window, args);
	            done();
	        });

	        return this;
	    };

	    this.cancel = function () {
	        if (tick) {
	            isCancel = true;
	            cancelAnimationFrame(tick);
	        }
	    };

	    this.then = function (cb) {
	        if (isRequested) {
	            cb && cb();
	        } else {
	            callback.push(cb);
	        }
	        return this;
	    };

	    this.clone = function () {
	        return new Frame(fun);
	    };
	}

	function Animation(duration, timingFunction, delay, frames) {
	    if (typeof frames === 'function') {
	        frames = {
	            '0': frames
	        };
	    }
	    var frameCount = duration / INTERVAL;
	    var framePercent = 1 / frameCount;
	    var frameQueue = [];
	    var frameKeys = Object.keys(frames).map(function (i) {
	        return parseInt(i);
	    });

	    for (var i = 0; i < frameCount; i++) {
	        var key = frameKeys[0];
	        var percent = framePercent * i;
	        if (key != null && key <= percent * 100) {
	            var frame = frames['' + key];
	            if (!(frame instanceof Frame)) {
	                frame = new Frame(frame);
	            }
	            frameQueue.push(frame);
	            frameKeys.shift();
	        } else if (frameQueue.length) {
	            frameQueue.push(frameQueue[frameQueue.length - 1].clone());
	        }
	    }

	    var bezier;
	    if (typeof timingFunction === 'string' || timingFunction instanceof Array) {
	        if (!lib['cubicbezier']) {
	            console.error('require lib.cubicbezier');
	        } else {
	            if (typeof timingFunction === 'string') {
	                if (lib.cubicbezier[timingFunction]) {
	                    bezier = lib.cubicbezier[timingFunction];
	                }
	            } else if (timingFunction instanceof Array && timingFunction.length === 4) {
	                bezier = lib.cubicbezier.apply(lib.cubicbezier, timingFunction);
	            }
	        }
	    } else if (typeof timingFunction === 'function') {
	        bezier = timingFunction;
	    }

	    if (!bezier) {
	        console.error('unexcept timing function');
	    }

	    var isPlaying = false;
	    var delayTick = 0;
	    var frameIndex = 0;
	    var currentFrame;

	    this.play = function () {
	        if (isPlaying) return;
	        isPlaying = true;

	        function done() {
	            isPlaying = false;
	            endHandler && endHandler();
	        }

	        function request() {
	            var percent = framePercent * (frameIndex + 1).toFixed(10);

	            currentFrame = frameQueue[frameIndex];
	            currentFrame.request(percent.toFixed(10), timingFunction(percent).toFixed(10));
	            currentFrame.then(function () {
	                frameIndex++;
	                next();
	            });
	        }

	        function next() {
	            if (!isPlaying) return;

	            if (frameIndex === frameQueue.length) {
	                done();
	            } else {
	                request();
	            }
	        }

	        delayTick = setTimeout(function () {
	            delayTick = 0;
	            next();
	        }, !frameIndex && delay || 0);
	        return this;
	    };

	    this.stop = function () {
	        if (!isPlaying) return;
	        isPlaying = false;

	        if (delayTick) {
	            clearTimeout(delayTick);
	            delayTick = 0;
	        }

	        if (currentFrame) {
	            currentFrame.cancel();
	        }

	        return this;
	    };

	    var endHandler;
	    this.onend = function (handler) {
	        endHandler = handler;
	    };
	}

	Animation.Frame = Frame;
	Animation.requestFrame = function (fun) {
	    var frame = new Frame(fun);
	    frame.request();
	    return frame;
	};
	module.exports = Animation;

/***/ },

/***/ 16:
/***/ function(module, exports) {

	"use strict";

	function cubicBezierFunction(p1x, p1y, p2x, p2y) {
	    var ZERO_LIMIT = 1e-6;
	    // Calculate the polynomial coefficients,
	    // implicit first and last control points are (0,0) and (1,1).
	    var ax = 3 * p1x - 3 * p2x + 1,
	        bx = 3 * p2x - 6 * p1x,
	        cx = 3 * p1x;

	    var ay = 3 * p1y - 3 * p2y + 1,
	        by = 3 * p2y - 6 * p1y,
	        cy = 3 * p1y;

	    function sampleCurveDerivativeX(t) {
	        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
	        return (3 * ax * t + 2 * bx) * t + cx;
	    }

	    function sampleCurveX(t) {
	        return ((ax * t + bx) * t + cx) * t;
	    }

	    function sampleCurveY(t) {
	        return ((ay * t + by) * t + cy) * t;
	    }

	    // Given an x value, find a parametric value it came from.
	    function solveCurveX(x) {
	        var t2 = x,
	            derivative,
	            x2;

	        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
	        // First try a few iterations of Newton's method -- normally very fast.
	        // http://en.wikipedia.org/wiki/Newton's_method
	        for (var i = 0; i < 8; i++) {
	            // f(t)-x=0
	            x2 = sampleCurveX(t2) - x;
	            if (Math.abs(x2) < ZERO_LIMIT) {
	                return t2;
	            }
	            derivative = sampleCurveDerivativeX(t2);
	            // == 0, failure
	            if (Math.abs(derivative) < ZERO_LIMIT) {
	                break;
	            }
	            t2 -= x2 / derivative;
	        }

	        // Fall back to the bisection method for reliability.
	        // bisection
	        // http://en.wikipedia.org/wiki/Bisection_method
	        var t1 = 1,
	            t0 = 0;
	        t2 = x;
	        while (t1 > t0) {
	            x2 = sampleCurveX(t2) - x;
	            if (Math.abs(x2) < ZERO_LIMIT) {
	                return t2;
	            }
	            if (x2 > 0) {
	                t1 = t2;
	            } else {
	                t0 = t2;
	            }
	            t2 = (t1 + t0) / 2;
	        }

	        // Failure
	        return t2;
	    }

	    function solve(x) {
	        return sampleCurveY(solveCurveX(x));
	    }

	    return solve;
	}

	/**
	 * @callback BezierFunction
	 * @param {Number} x x坐标，0~1之间的数
	 * @return {Number} y坐标
	 */

	/**
	 * 生成贝塞尔曲线函数
	 * @method cubicbezier
	 * @memberOf lib
	 * @param {Number} p1x 第一个控制点x坐标
	 * @param {Number} p1y 第一个控制点y坐标
	 * @param {Number} p2x 第二个控制点x坐标
	 * @param {Number} p2y 第二个控制点y坐标
	 * @property {BezierFunction} linear 直线函数
	 * @property {BezierFunction} ease ease函数
	 * @property {BezierFunction} easeIn easeIn函数
	 * @property {BezierFunction} easeOut easeOut函数
	 * @property {BezierFunction} easeInOut easeInOut函数
	 * @return {BezierFunction} 贝塞尔曲线函数
	 */

	module.exports = cubicBezierFunction;

	cubicBezierFunction.linear = cubicBezierFunction(0, 0, 1, 1);
	cubicBezierFunction.ease = cubicBezierFunction(.25, .1, .25, 1);
	cubicBezierFunction.easeIn = cubicBezierFunction(.42, 0, 1, 1);
	cubicBezierFunction.easeOut = cubicBezierFunction(0, 0, .58, 1);
	cubicBezierFunction.easeInOut = cubicBezierFunction(.42, 0, .58, 1);

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _handlebarsBase = __webpack_require__(12);

	var base = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = __webpack_require__(34);

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = __webpack_require__(6);

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = __webpack_require__(3);

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = __webpack_require__(33);

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = __webpack_require__(32);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OEJBQXNCLG1CQUFtQjs7SUFBN0IsSUFBSTs7Ozs7b0NBSU8sMEJBQTBCOzs7O21DQUMzQix3QkFBd0I7Ozs7K0JBQ3ZCLG9CQUFvQjs7SUFBL0IsS0FBSzs7aUNBQ1Esc0JBQXNCOztJQUFuQyxPQUFPOztvQ0FFSSwwQkFBMEI7Ozs7O0FBR2pELFNBQVMsTUFBTSxHQUFHO0FBQ2hCLE1BQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRTFDLE9BQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLElBQUUsQ0FBQyxVQUFVLG9DQUFhLENBQUM7QUFDM0IsSUFBRSxDQUFDLFNBQVMsbUNBQVksQ0FBQztBQUN6QixJQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNqQixJQUFFLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDOztBQUU3QyxJQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztBQUNoQixJQUFFLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQzNCLFdBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDbkMsQ0FBQzs7QUFFRixTQUFPLEVBQUUsQ0FBQztDQUNYOztBQUVELElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVyQixrQ0FBVyxJQUFJLENBQUMsQ0FBQzs7QUFFakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQzs7cUJBRVIsSUFBSSIsImZpbGUiOiJoYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG4iXX0=


/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _decoratorsInline = __webpack_require__(22);

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Z0NBQTJCLHFCQUFxQjs7OztBQUV6QyxTQUFTLHlCQUF5QixDQUFDLFFBQVEsRUFBRTtBQUNsRCxnQ0FBZSxRQUFRLENBQUMsQ0FBQztDQUMxQiIsImZpbGUiOiJkZWNvcmF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cbiJdfQ==


/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(3);

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQXFCLFVBQVU7O3FCQUVoQixVQUFTLFFBQVEsRUFBRTtBQUNoQyxVQUFRLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFVBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQzNFLFFBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ25CLFdBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQUcsR0FBRyxVQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRS9CLFlBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsaUJBQVMsQ0FBQyxRQUFRLEdBQUcsY0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRCxZQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLGlCQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUM5QixlQUFPLEdBQUcsQ0FBQztPQUNaLENBQUM7S0FDSDs7QUFFRCxTQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUU3QyxXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVyRGVjb3JhdG9yKCdpbmxpbmUnLCBmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIGxldCByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFydGlhbHMgc3RhY2sgZnJhbWUgcHJpb3IgdG8gZXhlYy5cbiAgICAgICAgbGV0IG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBleHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG4gICAgICAgIGxldCByZXQgPSBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3JpZ2luYWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG4iXX0=


/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _helpersBlockHelperMissing = __webpack_require__(24);

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = __webpack_require__(25);

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = __webpack_require__(26);

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = __webpack_require__(27);

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = __webpack_require__(28);

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = __webpack_require__(29);

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = __webpack_require__(30);

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7eUNBQXVDLGdDQUFnQzs7OzsyQkFDOUMsZ0JBQWdCOzs7O29DQUNQLDBCQUEwQjs7Ozt5QkFDckMsY0FBYzs7OzswQkFDYixlQUFlOzs7OzZCQUNaLGtCQUFrQjs7OzsyQkFDcEIsZ0JBQWdCOzs7O0FBRWxDLFNBQVMsc0JBQXNCLENBQUMsUUFBUSxFQUFFO0FBQy9DLHlDQUEyQixRQUFRLENBQUMsQ0FBQztBQUNyQywyQkFBYSxRQUFRLENBQUMsQ0FBQztBQUN2QixvQ0FBc0IsUUFBUSxDQUFDLENBQUM7QUFDaEMseUJBQVcsUUFBUSxDQUFDLENBQUM7QUFDckIsMEJBQVksUUFBUSxDQUFDLENBQUM7QUFDdEIsNkJBQWUsUUFBUSxDQUFDLENBQUM7QUFDekIsMkJBQWEsUUFBUSxDQUFDLENBQUM7Q0FDeEIiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuIl19


/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(3);

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBc0QsVUFBVTs7cUJBRWpELFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3ZFLFFBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPO1FBQ3pCLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDcEIsYUFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakIsTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUMvQyxhQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QixNQUFNLElBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUMzQixVQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNmLGlCQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCOztBQUVELGVBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTCxlQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN0QjtLQUNGLE1BQU07QUFDTCxVQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixZQUFJLElBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdFLGVBQU8sR0FBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztPQUN4Qjs7QUFFRCxhQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDN0I7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJibG9jay1oZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=


/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(3);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey !== undefined) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O3FCQUErRSxVQUFVOzt5QkFDbkUsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixZQUFNLDJCQUFjLDZCQUE2QixDQUFDLENBQUM7S0FDcEQ7O0FBRUQsUUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFDZixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87UUFDekIsQ0FBQyxHQUFHLENBQUM7UUFDTCxHQUFHLEdBQUcsRUFBRTtRQUNSLElBQUksWUFBQTtRQUNKLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixpQkFBVyxHQUFHLHlCQUFrQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ2pGOztBQUVELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsVUFBSSxHQUFHLG1CQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQzs7QUFFRCxhQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtBQUN6QyxVQUFJLElBQUksRUFBRTtBQUNSLFlBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUN6QixZQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7O0FBRW5CLFlBQUksV0FBVyxFQUFFO0FBQ2YsY0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO09BQ0Y7O0FBRUQsU0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzdCLFlBQUksRUFBRSxJQUFJO0FBQ1YsbUJBQVcsRUFBRSxtQkFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDL0UsQ0FBQyxDQUFDO0tBQ0o7O0FBRUQsUUFBSSxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQzFDLFVBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNwQixhQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QyxjQUFJLENBQUMsSUFBSSxPQUFPLEVBQUU7QUFDaEIseUJBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1dBQy9DO1NBQ0Y7T0FDRixNQUFNO0FBQ0wsWUFBSSxRQUFRLFlBQUEsQ0FBQzs7QUFFYixhQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRTtBQUN2QixjQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Ozs7QUFJL0IsZ0JBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQiwyQkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEM7QUFDRCxvQkFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLGFBQUMsRUFBRSxDQUFDO1dBQ0w7U0FDRjtBQUNELFlBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQix1QkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO09BQ0Y7S0FDRjs7QUFFRCxRQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxTQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCOztBQUVELFdBQU8sR0FBRyxDQUFDO0dBQ1osQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cbiJdfQ==


/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozt5QkFBc0IsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsaUNBQWdDO0FBQ3ZFLFFBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O0FBRTFCLGFBQU8sU0FBUyxDQUFDO0tBQ2xCLE1BQU07O0FBRUwsWUFBTSwyQkFBYyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDdkY7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJoZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHJ1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuIl19


/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(3);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBa0MsVUFBVTs7cUJBRTdCLFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUMzRCxRQUFJLGtCQUFXLFdBQVcsQ0FBQyxFQUFFO0FBQUUsaUJBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQUU7Ozs7O0FBS3RFLFFBQUksQUFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxJQUFLLGVBQVEsV0FBVyxDQUFDLEVBQUU7QUFDdkUsYUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCLE1BQU07QUFDTCxhQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7R0FDRixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQy9ELFdBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztHQUN2SCxDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJpZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cbiJdfQ==


/***/ },

/***/ 28:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsa0NBQWlDO0FBQzlELFFBQUksSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5QyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0MsVUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7QUFFRCxRQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZCxRQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtBQUM5QixXQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ3JELFdBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1QjtBQUNELFFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7O0FBRWhCLFlBQVEsQ0FBQyxHQUFHLE1BQUEsQ0FBWixRQUFRLEVBQVMsSUFBSSxDQUFDLENBQUM7R0FDeEIsQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuIl19


/***/ },

/***/ 29:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3JELFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUMxQixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJsb29rdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG4iXX0=


/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(3);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUErRSxVQUFVOztxQkFFMUUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLENBQUMsZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNyQixVQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3hCLFVBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQy9CLFlBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2hGOztBQUVELGFBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLEVBQUUsSUFBSTtBQUNWLG1CQUFXLEVBQUUsbUJBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDaEUsQ0FBQyxDQUFDO0tBQ0osTUFBTTtBQUNMLGFBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtHQUNGLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6IndpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==


/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(3);

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      if (!console[method]) {
	        // eslint-disable-line no-console
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUFzQixTQUFTOztBQUUvQixJQUFJLE1BQU0sR0FBRztBQUNYLFdBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUM3QyxPQUFLLEVBQUUsTUFBTTs7O0FBR2IsYUFBVyxFQUFFLHFCQUFTLEtBQUssRUFBRTtBQUMzQixRQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUM3QixVQUFJLFFBQVEsR0FBRyxlQUFRLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDOUQsVUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2pCLGFBQUssR0FBRyxRQUFRLENBQUM7T0FDbEIsTUFBTTtBQUNMLGFBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO09BQzdCO0tBQ0Y7O0FBRUQsV0FBTyxLQUFLLENBQUM7R0FDZDs7O0FBR0QsS0FBRyxFQUFFLGFBQVMsS0FBSyxFQUFjO0FBQy9CLFNBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVsQyxRQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUU7QUFDL0UsVUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxVQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztBQUNwQixjQUFNLEdBQUcsS0FBSyxDQUFDO09BQ2hCOzt3Q0FQbUIsT0FBTztBQUFQLGVBQU87OztBQVEzQixhQUFPLENBQUMsTUFBTSxPQUFDLENBQWYsT0FBTyxFQUFZLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO0dBQ0Y7Q0FDRixDQUFDOztxQkFFYSxNQUFNIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiJdfQ==


/***/ },

/***/ 32:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUNlLFVBQVMsVUFBVSxFQUFFOztBQUVsQyxNQUFJLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU07TUFDdEQsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRWxDLFlBQVUsQ0FBQyxVQUFVLEdBQUcsWUFBVztBQUNqQyxRQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO0FBQ2xDLFVBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0tBQy9CO0FBQ0QsV0FBTyxVQUFVLENBQUM7R0FDbkIsQ0FBQztDQUNIIiwiZmlsZSI6Im5vLWNvbmZsaWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cbiJdfQ==

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _utils = __webpack_require__(3);

	var Utils = _interopRequireWildcard(_utils);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _base = __webpack_require__(12);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }
	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = container.merge(options.decorators, env.decorators);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context !== depths[0]) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    options.data = _base.createFrame(options.data);
	    partialBlock = options.data['partial-block'] = options.fn;

	    if (partialBlock.partials) {
	      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
	    }
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQXVCLFNBQVM7O0lBQXBCLEtBQUs7O3lCQUNLLGFBQWE7Ozs7b0JBQzhCLFFBQVE7O0FBRWxFLFNBQVMsYUFBYSxDQUFDLFlBQVksRUFBRTtBQUMxQyxNQUFNLGdCQUFnQixHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztNQUN2RCxlQUFlLDBCQUFvQixDQUFDOztBQUUxQyxNQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRTtBQUN4QyxRQUFJLGdCQUFnQixHQUFHLGVBQWUsRUFBRTtBQUN0QyxVQUFNLGVBQWUsR0FBRyx1QkFBaUIsZUFBZSxDQUFDO1VBQ25ELGdCQUFnQixHQUFHLHVCQUFpQixnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVELFlBQU0sMkJBQWMseUZBQXlGLEdBQ3ZHLHFEQUFxRCxHQUFHLGVBQWUsR0FBRyxtREFBbUQsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNoSyxNQUFNOztBQUVMLFlBQU0sMkJBQWMsd0ZBQXdGLEdBQ3RHLGlEQUFpRCxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNuRjtHQUNGO0NBQ0Y7O0FBRU0sU0FBUyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTs7QUFFMUMsTUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLFVBQU0sMkJBQWMsbUNBQW1DLENBQUMsQ0FBQztHQUMxRDtBQUNELE1BQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO0FBQ3ZDLFVBQU0sMkJBQWMsMkJBQTJCLEdBQUcsT0FBTyxZQUFZLENBQUMsQ0FBQztHQUN4RTs7QUFFRCxjQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDOzs7O0FBSWxELEtBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFNUMsV0FBUyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUN2RCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsYUFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsVUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2YsZUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7T0FDdkI7S0FDRjs7QUFFRCxXQUFPLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RFLFFBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFeEUsUUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7QUFDakMsYUFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN6RixZQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNEO0FBQ0QsUUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ2xCLFVBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNsQixZQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDNUMsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1QixrQkFBTTtXQUNQOztBQUVELGVBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztBQUNELGNBQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQzNCO0FBQ0QsYUFBTyxNQUFNLENBQUM7S0FDZixNQUFNO0FBQ0wsWUFBTSwyQkFBYyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRywwREFBMEQsQ0FBQyxDQUFDO0tBQ2pIO0dBQ0Y7OztBQUdELE1BQUksU0FBUyxHQUFHO0FBQ2QsVUFBTSxFQUFFLGdCQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDMUIsVUFBSSxFQUFFLElBQUksSUFBSSxHQUFHLENBQUEsQUFBQyxFQUFFO0FBQ2xCLGNBQU0sMkJBQWMsR0FBRyxHQUFHLElBQUksR0FBRyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQztPQUM3RDtBQUNELGFBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCO0FBQ0QsVUFBTSxFQUFFLGdCQUFTLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDN0IsVUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMxQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVCLFlBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDeEMsaUJBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO09BQ0Y7S0FDRjtBQUNELFVBQU0sRUFBRSxnQkFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLGFBQU8sT0FBTyxPQUFPLEtBQUssVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO0tBQ3hFOztBQUVELG9CQUFnQixFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7QUFDeEMsaUJBQWEsRUFBRSxvQkFBb0I7O0FBRW5DLE1BQUUsRUFBRSxZQUFTLENBQUMsRUFBRTtBQUNkLFVBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixTQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDdkMsYUFBTyxHQUFHLENBQUM7S0FDWjs7QUFFRCxZQUFRLEVBQUUsRUFBRTtBQUNaLFdBQU8sRUFBRSxpQkFBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUU7QUFDbkUsVUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7VUFDakMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsVUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLFdBQVcsSUFBSSxtQkFBbUIsRUFBRTtBQUN4RCxzQkFBYyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO09BQzNGLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUMxQixzQkFBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FDOUQ7QUFDRCxhQUFPLGNBQWMsQ0FBQztLQUN2Qjs7QUFFRCxRQUFJLEVBQUUsY0FBUyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQzNCLGFBQU8sS0FBSyxJQUFJLEtBQUssRUFBRSxFQUFFO0FBQ3ZCLGFBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO09BQ3ZCO0FBQ0QsYUFBTyxLQUFLLENBQUM7S0FDZDtBQUNELFNBQUssRUFBRSxlQUFTLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDN0IsVUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQzs7QUFFMUIsVUFBSSxLQUFLLElBQUksTUFBTSxJQUFLLEtBQUssS0FBSyxNQUFNLEFBQUMsRUFBRTtBQUN6QyxXQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQ3ZDOztBQUVELGFBQU8sR0FBRyxDQUFDO0tBQ1o7O0FBRUQsUUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSTtBQUNqQixnQkFBWSxFQUFFLFlBQVksQ0FBQyxRQUFRO0dBQ3BDLENBQUM7O0FBRUYsV0FBUyxHQUFHLENBQUMsT0FBTyxFQUFnQjtRQUFkLE9BQU8seURBQUcsRUFBRTs7QUFDaEMsUUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFeEIsT0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixRQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFO0FBQzVDLFVBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0FBQ0QsUUFBSSxNQUFNLFlBQUE7UUFDTixXQUFXLEdBQUcsWUFBWSxDQUFDLGNBQWMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO0FBQy9ELFFBQUksWUFBWSxDQUFDLFNBQVMsRUFBRTtBQUMxQixVQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDbEIsY0FBTSxHQUFHLE9BQU8sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO09BQzVGLE1BQU07QUFDTCxjQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUNwQjtLQUNGOztBQUVELGFBQVMsSUFBSSxDQUFDLE9BQU8sZ0JBQWU7QUFDbEMsYUFBTyxFQUFFLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ3JIO0FBQ0QsUUFBSSxHQUFHLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDdEcsV0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQy9CO0FBQ0QsS0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRWpCLEtBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBUyxPQUFPLEVBQUU7QUFDN0IsUUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDcEIsZUFBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVsRSxVQUFJLFlBQVksQ0FBQyxVQUFVLEVBQUU7QUFDM0IsaUJBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUN0RTtBQUNELFVBQUksWUFBWSxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUMsYUFBYSxFQUFFO0FBQ3pELGlCQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7T0FDNUU7S0FDRixNQUFNO0FBQ0wsZUFBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ3BDLGVBQVMsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUN0QyxlQUFTLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7S0FDM0M7R0FDRixDQUFDOztBQUVGLEtBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUU7QUFDbEQsUUFBSSxZQUFZLENBQUMsY0FBYyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQy9DLFlBQU0sMkJBQWMsd0JBQXdCLENBQUMsQ0FBQztLQUMvQztBQUNELFFBQUksWUFBWSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNyQyxZQUFNLDJCQUFjLHlCQUF5QixDQUFDLENBQUM7S0FDaEQ7O0FBRUQsV0FBTyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7R0FDakYsQ0FBQztBQUNGLFNBQU8sR0FBRyxDQUFDO0NBQ1o7O0FBRU0sU0FBUyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUU7QUFDNUYsV0FBUyxJQUFJLENBQUMsT0FBTyxFQUFnQjtRQUFkLE9BQU8seURBQUcsRUFBRTs7QUFDakMsUUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDO0FBQzNCLFFBQUksTUFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDbkMsbUJBQWEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQzs7QUFFRCxXQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQ2YsT0FBTyxFQUNQLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFDckMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQ3BCLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQ3hELGFBQWEsQ0FBQyxDQUFDO0dBQ3BCOztBQUVELE1BQUksR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDOztBQUV6RSxNQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNqQixNQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN4QyxNQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFtQixJQUFJLENBQUMsQ0FBQztBQUM1QyxTQUFPLElBQUksQ0FBQztDQUNiOztBQUVNLFNBQVMsY0FBYyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3hELE1BQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixRQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7QUFDckMsYUFBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDekMsTUFBTTtBQUNMLGFBQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQztHQUNGLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFOztBQUV6QyxXQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUN2QixXQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUNyQztBQUNELFNBQU8sT0FBTyxDQUFDO0NBQ2hCOztBQUVNLFNBQVMsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3ZELFNBQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLE1BQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNmLFdBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7R0FDdkU7O0FBRUQsTUFBSSxZQUFZLFlBQUEsQ0FBQztBQUNqQixNQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUU7QUFDckMsV0FBTyxDQUFDLElBQUksR0FBRyxrQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsZ0JBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7O0FBRTFELFFBQUksWUFBWSxDQUFDLFFBQVEsRUFBRTtBQUN6QixhQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzlFO0dBQ0Y7O0FBRUQsTUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLFlBQVksRUFBRTtBQUN6QyxXQUFPLEdBQUcsWUFBWSxDQUFDO0dBQ3hCOztBQUVELE1BQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtBQUN6QixVQUFNLDJCQUFjLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDLENBQUM7R0FDNUUsTUFBTSxJQUFJLE9BQU8sWUFBWSxRQUFRLEVBQUU7QUFDdEMsV0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQ2xDO0NBQ0Y7O0FBRU0sU0FBUyxJQUFJLEdBQUc7QUFBRSxTQUFPLEVBQUUsQ0FBQztDQUFFOztBQUVyQyxTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQy9CLE1BQUksQ0FBQyxJQUFJLElBQUksRUFBRSxNQUFNLElBQUksSUFBSSxDQUFBLEFBQUMsRUFBRTtBQUM5QixRQUFJLEdBQUcsSUFBSSxHQUFHLGtCQUFZLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyQyxRQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztHQUNyQjtBQUNELFNBQU8sSUFBSSxDQUFDO0NBQ2I7O0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtBQUN6RSxNQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUU7QUFDaEIsUUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsUUFBSSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVGLFNBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQzNCO0FBQ0QsU0FBTyxJQUFJLENBQUM7Q0FDYiIsImZpbGUiOiJydW50aW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7IENPTVBJTEVSX1JFVklTSU9OLCBSRVZJU0lPTl9DSEFOR0VTLCBjcmVhdGVGcmFtZSB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1JldmlzaW9uKGNvbXBpbGVySW5mbykge1xuICBjb25zdCBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIGNvbnN0IHJ1bnRpbWVWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcbiAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIHJ1bnRpbWVWZXJzaW9ucyArICcpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVyVmVyc2lvbnMgKyAnKS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVySW5mb1sxXSArICcpLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcbiAgfVxuICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgdGVtcGxhdGVTcGVjLm1haW4uZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjLm1haW5fZDtcblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIGZ1bmN0aW9uIGludm9rZVBhcnRpYWxXcmFwcGVyKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBvcHRpb25zLmhhc2gpO1xuICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgbGV0IHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIGxldCBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEp1c3QgYWRkIHdhdGVyXG4gIGxldCBjb250YWluZXIgPSB7XG4gICAgc3RyaWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gb2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24oZGVwdGhzLCBuYW1lKSB7XG4gICAgICBjb25zdCBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGFtYmRhOiBmdW5jdGlvbihjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uKGkpIHtcbiAgICAgIGxldCByZXQgPSB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICByZXQuZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjW2kgKyAnX2QnXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgICBsZXQgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgIGlmIChkYXRhIHx8IGRlcHRocyB8fCBibG9ja1BhcmFtcyB8fCBkZWNsYXJlZEJsb2NrUGFyYW1zKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG5cbiAgICBkYXRhOiBmdW5jdGlvbih2YWx1ZSwgZGVwdGgpIHtcbiAgICAgIHdoaWxlICh2YWx1ZSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuX3BhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICBsZXQgb2JqID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICBvYmogPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIGZ1bmN0aW9uIHJldChjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICB9XG4gICAgbGV0IGRlcHRocyxcbiAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgaWYgKG9wdGlvbnMuZGVwdGhzKSB7XG4gICAgICAgIGRlcHRocyA9IGNvbnRleHQgIT09IG9wdGlvbnMuZGVwdGhzWzBdID8gW2NvbnRleHRdLmNvbmNhdChvcHRpb25zLmRlcHRocykgOiBvcHRpb25zLmRlcHRocztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlcHRocyA9IFtjb250ZXh0XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluKGNvbnRleHQvKiwgb3B0aW9ucyovKSB7XG4gICAgICByZXR1cm4gJycgKyB0ZW1wbGF0ZVNwZWMubWFpbihjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIH1cbiAgICBtYWluID0gZXhlY3V0ZURlY29yYXRvcnModGVtcGxhdGVTcGVjLm1haW4sIG1haW4sIGNvbnRhaW5lciwgb3B0aW9ucy5kZXB0aHMgfHwgW10sIGRhdGEsIGJsb2NrUGFyYW1zKTtcbiAgICByZXR1cm4gbWFpbihjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxuICByZXQuaXNUb3AgPSB0cnVlO1xuXG4gIHJldC5fc2V0dXAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwgfHwgdGVtcGxhdGVTcGVjLnVzZURlY29yYXRvcnMpIHtcbiAgICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5kZWNvcmF0b3JzLCBlbnYuZGVjb3JhdG9ycyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gb3B0aW9ucy5kZWNvcmF0b3JzO1xuICAgIH1cbiAgfTtcblxuICByZXQuX2NoaWxkID0gZnVuY3Rpb24oaSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgJiYgIWJsb2NrUGFyYW1zKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgYmxvY2sgcGFyYW1zJyk7XG4gICAgfVxuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzICYmICFkZXB0aHMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBwYXJlbnQgZGVwdGhzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgdGVtcGxhdGVTcGVjW2ldLCBkYXRhLCAwLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgfTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgZnVuY3Rpb24gcHJvZyhjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgY3VycmVudERlcHRocyA9IGRlcHRocztcbiAgICBpZiAoZGVwdGhzICYmIGNvbnRleHQgIT09IGRlcHRoc1swXSkge1xuICAgICAgY3VycmVudERlcHRocyA9IFtjb250ZXh0XS5jb25jYXQoZGVwdGhzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4oY29udGFpbmVyLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLFxuICAgICAgICBvcHRpb25zLmRhdGEgfHwgZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksXG4gICAgICAgIGN1cnJlbnREZXB0aHMpO1xuICB9XG5cbiAgcHJvZyA9IGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpO1xuXG4gIHByb2cucHJvZ3JhbSA9IGk7XG4gIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgcHJvZy5ibG9ja1BhcmFtcyA9IGRlY2xhcmVkQmxvY2tQYXJhbXMgfHwgMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmICghcGFydGlhbCkge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBhcnRpYWwuY2FsbCAmJiAhb3B0aW9ucy5uYW1lKSB7XG4gICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG4gICAgb3B0aW9ucy5uYW1lID0gcGFydGlhbDtcbiAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1twYXJ0aWFsXTtcbiAgfVxuICByZXR1cm4gcGFydGlhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICBvcHRpb25zLnBhcnRpYWwgPSB0cnVlO1xuICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICBvcHRpb25zLmRhdGEuY29udGV4dFBhdGggPSBvcHRpb25zLmlkc1swXSB8fCBvcHRpb25zLmRhdGEuY29udGV4dFBhdGg7XG4gIH1cblxuICBsZXQgcGFydGlhbEJsb2NrO1xuICBpZiAob3B0aW9ucy5mbiAmJiBvcHRpb25zLmZuICE9PSBub29wKSB7XG4gICAgb3B0aW9ucy5kYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICBwYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAocGFydGlhbEJsb2NrLnBhcnRpYWxzKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLnBhcnRpYWxzLCBwYXJ0aWFsQmxvY2sucGFydGlhbHMpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQgJiYgcGFydGlhbEJsb2NrKSB7XG4gICAgcGFydGlhbCA9IHBhcnRpYWxCbG9jaztcbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgZm91bmQnKTtcbiAgfSBlbHNlIGlmIChwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgcmV0dXJuICcnOyB9XG5cbmZ1bmN0aW9uIGluaXREYXRhKGNvbnRleHQsIGRhdGEpIHtcbiAgaWYgKCFkYXRhIHx8ICEoJ3Jvb3QnIGluIGRhdGEpKSB7XG4gICAgZGF0YSA9IGRhdGEgPyBjcmVhdGVGcmFtZShkYXRhKSA6IHt9O1xuICAgIGRhdGEucm9vdCA9IGNvbnRleHQ7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpIHtcbiAgaWYgKGZuLmRlY29yYXRvcikge1xuICAgIGxldCBwcm9wcyA9IHt9O1xuICAgIHByb2cgPSBmbi5kZWNvcmF0b3IocHJvZywgcHJvcHMsIGNvbnRhaW5lciwgZGVwdGhzICYmIGRlcHRoc1swXSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgVXRpbHMuZXh0ZW5kKHByb2csIHByb3BzKTtcbiAgfVxuICByZXR1cm4gcHJvZztcbn1cbiJdfQ==


/***/ },

/***/ 34:
/***/ function(module, exports) {

	// Build out our basic SafeString type
	'use strict';

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDMUIsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDdEI7O0FBRUQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUN2RSxTQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQ3pCLENBQUM7O3FCQUVhLFVBQVUiLCJmaWxlIjoic2FmZS1zdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcbiJdfQ==


/***/ },

/***/ 35:
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var doc = window.document,
	    docEl = doc.documentElement,
	    slice = Array.prototype.slice,
	    gestures = {},
	    lastTap = null;

	/**
	 * 找到两个结点共同的最小根结点
	 * 如果跟结点不存在，则返回null
	 * 
	 * @param  {Element} el1 第一个结点
	 * @param  {Element} el2 第二个结点
	 * @return {Element}     根结点
	 */
	function getCommonAncestor(el1, el2) {
	    var el = el1;
	    while (el) {
	        if (el.contains(el2) || el == el2) {
	            return el;
	        }
	        el = el.parentNode;
	    }
	    return null;
	}

	/**
	 * 触发一个事件
	 * 
	 * @param  {Element} element 目标结点
	 * @param  {string}  type    事件类型
	 * @param  {object}  extra   对事件对象的扩展
	 */
	function fireEvent(element, type, extra) {
	    var event = doc.createEvent('HTMLEvents');
	    event.initEvent(type, true, true);

	    if ((typeof extra === 'undefined' ? 'undefined' : _typeof(extra)) === 'object') {
	        for (var p in extra) {
	            event[p] = extra[p];
	        }
	    }

	    element.dispatchEvent(event);
	}

	/**
	 * 计算变换效果
	 * 假设坐标系上有4个点ABCD
	 * > 旋转：从AB旋转到CD的角度
	 * > 缩放：从AB长度变换到CD长度的比例
	 * > 位移：从A点位移到C点的横纵位移
	 * 
	 * @param  {number} x1 上述第1个点的横坐标
	 * @param  {number} y1 上述第1个点的纵坐标
	 * @param  {number} x2 上述第2个点的横坐标
	 * @param  {number} y2 上述第2个点的纵坐标
	 * @param  {number} x3 上述第3个点的横坐标
	 * @param  {number} y3 上述第3个点的纵坐标
	 * @param  {number} x4 上述第4个点的横坐标
	 * @param  {number} y4 上述第4个点的纵坐标
	 * @return {object}    变换效果，形如{rotate, scale, translate[2], matrix[3][3]}
	 */
	function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
	    var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1),
	        scale = Math.sqrt((Math.pow(y4 - y3, 2) + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))),
	        translate = [x3 - scale * x1 * Math.cos(rotate) + scale * y1 * Math.sin(rotate), y3 - scale * y1 * Math.cos(rotate) - scale * x1 * Math.sin(rotate)];
	    return {
	        rotate: rotate,
	        scale: scale,
	        translate: translate,
	        matrix: [[scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]], [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]], [0, 0, 1]]
	    };
	}

	/**
	 * 捕获touchstart事件，将每一个新增的触点添加到gestrues
	 * 如果之前尚无被记录的触点，则绑定touchmove, touchend, touchcancel事件
	 * 
	 * 新增触点默认处于tapping状态
	 * 500毫秒之后如果还处于tapping状态，则触发press手势
	 * 如果触点数为2，则触发dualtouchstart手势，该手势的目标结点为两个触点共同的最小根结点
	 *
	 * @event
	 * @param  {event} event
	 */
	function touchstartHandler(event) {

	    if (Object.keys(gestures).length === 0) {
	        docEl.addEventListener('touchmove', touchmoveHandler, false);
	        docEl.addEventListener('touchend', touchendHandler, false);
	        docEl.addEventListener('touchcancel', touchcancelHandler, false);
	    }

	    // 记录每一个触点
	    // TODO: 变量声明方式，建议在函数最前面声明
	    for (var i = 0; i < event.changedTouches.length; i++) {
	        var touch = event.changedTouches[i],
	            touchRecord = {};

	        for (var p in touch) {
	            touchRecord[p] = touch[p];
	        }

	        var gesture = {
	            startTouch: touchRecord,
	            startTime: Date.now(),
	            status: 'tapping',
	            element: event.srcElement || event.target,
	            // TODO: Don't make functions within a loop
	            pressingHandler: setTimeout(function (element) {
	                return function () {
	                    if (gesture.status === 'tapping') {
	                        gesture.status = 'pressing';

	                        fireEvent(element, 'press', {
	                            touchEvent: event
	                        });
	                    }

	                    clearTimeout(gesture.pressingHandler);
	                    gesture.pressingHandler = null;
	                };
	            }(event.srcElement || event.target), 500)
	        };
	        gestures[touch.identifier] = gesture;
	    }

	    // TODO: 变量声明方式，建议在函数最前面声明
	    if (Object.keys(gestures).length == 2) {
	        var elements = [];

	        for (var p in gestures) {
	            elements.push(gestures[p].element);
	        }

	        fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchstart', {
	            touches: slice.call(event.touches),
	            touchEvent: event
	        });
	    }
	}

	/**
	 * 捕获touchmove事件，处理pan和dual的相关手势
	 * 
	 * 1. 遍历每个触点：
	 * > 如果触点之前处于tapping状态，且位移超过10像素，则认定为进入panning状态
	 * 先触发panstart手势，然后根据移动的方向选择性触发horizontalpanstart或verticalpanstart手势
	 * > 如果触点之前处于panning状态，则根据pan的初始方向触发horizontalpan或verticalpan手势
	 * 
	 * 2. 如果当前触点数为2，则计算出几何变换的各项参数，触发dualtouch手势
	 * 
	 * @event
	 * @param  {event} event
	 */
	function touchmoveHandler(event) {
	    // TODO: 函数太大了，影响可读性，建议分解并加必要的注释

	    // 遍历每个触点：
	    // 1. 如果触点之前处于tapping状态，且位移超过10像素，则认定为进入panning状态
	    // 先触发panstart手势，然后根据移动的方向选择性触发horizontalpanstart或verticalpanstart手势
	    // 2. 如果触点之前处于panning状态，则根据pan的初始方向触发horizontalpan或verticalpan手势
	    for (var i = 0; i < event.changedTouches.length; i++) {
	        var touch = event.changedTouches[i],
	            gesture = gestures[touch.identifier];

	        if (!gesture) {
	            return;
	        }

	        if (!gesture.lastTouch) {
	            gesture.lastTouch = gesture.startTouch;
	        }
	        if (!gesture.lastTime) {
	            gesture.lastTime = gesture.startTime;
	        }
	        if (!gesture.velocityX) {
	            gesture.velocityX = 0;
	        }
	        if (!gesture.velocityY) {
	            gesture.velocityY = 0;
	        }
	        if (!gesture.duration) {
	            gesture.duration = 0;
	        }

	        var time = Date.now() - gesture.lastTime;
	        var vx = (touch.clientX - gesture.lastTouch.clientX) / time,
	            vy = (touch.clientY - gesture.lastTouch.clientY) / time;

	        var RECORD_DURATION = 70;
	        if (time > RECORD_DURATION) {
	            time = RECORD_DURATION;
	        }
	        if (gesture.duration + time > RECORD_DURATION) {
	            gesture.duration = RECORD_DURATION - time;
	        }

	        gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time) / (gesture.duration + time);
	        gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time) / (gesture.duration + time);
	        gesture.duration += time;

	        gesture.lastTouch = {};

	        for (var p in touch) {
	            gesture.lastTouch[p] = touch[p];
	        }
	        gesture.lastTime = Date.now();

	        var displacementX = touch.clientX - gesture.startTouch.clientX,
	            displacementY = touch.clientY - gesture.startTouch.clientY,
	            distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));

	        // magic number 10: moving 10px means pan, not tap
	        if ((gesture.status === 'tapping' || gesture.status === 'pressing') && distance > 10) {
	            gesture.status = 'panning';
	            gesture.isVertical = !(Math.abs(displacementX) > Math.abs(displacementY));

	            fireEvent(gesture.element, 'panstart', {
	                touch: touch,
	                touchEvent: event,
	                isVertical: gesture.isVertical
	            });

	            fireEvent(gesture.element, (gesture.isVertical ? 'vertical' : 'horizontal') + 'panstart', {
	                touch: touch,
	                touchEvent: event
	            });
	        }

	        if (gesture.status === 'panning') {
	            gesture.panTime = Date.now();
	            fireEvent(gesture.element, 'pan', {
	                displacementX: displacementX,
	                displacementY: displacementY,
	                touch: touch,
	                touchEvent: event,
	                isVertical: gesture.isVertical
	            });

	            if (gesture.isVertical) {
	                fireEvent(gesture.element, 'verticalpan', {
	                    displacementY: displacementY,
	                    touch: touch,
	                    touchEvent: event
	                });
	            } else {
	                fireEvent(gesture.element, 'horizontalpan', {
	                    displacementX: displacementX,
	                    touch: touch,
	                    touchEvent: event
	                });
	            }
	        }
	    }

	    // 如果当前触点数为2，则计算出几何变换的各项参数，触发dualtouch手势
	    if (Object.keys(gestures).length == 2) {
	        var position = [],
	            current = [],
	            elements = [],
	            transform;

	        // TODO: 变量声明方式，建议在函数最前面声明
	        for (var i = 0; i < event.touches.length; i++) {
	            var touch = event.touches[i];
	            var gesture = gestures[touch.identifier];
	            position.push([gesture.startTouch.clientX, gesture.startTouch.clientY]);
	            current.push([touch.clientX, touch.clientY]);
	        }

	        // TODO: 变量声明方式，建议在函数最前面声明
	        for (var p in gestures) {
	            elements.push(gestures[p].element);
	        }

	        transform = calc(position[0][0], position[0][1], position[1][0], position[1][1], current[0][0], current[0][1], current[1][0], current[1][1]);
	        fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouch', {
	            transform: transform,
	            touches: event.touches,
	            touchEvent: event
	        });
	    }
	}

	/**
	 * 捕获touchend事件
	 * 
	 * 1. 如果当前触点数为2，则触发dualtouchend手势
	 *
	 * 2. 遍历每个触点：
	 * > 如果处于tapping状态，则触发tap手势
	 * 如果之前300毫秒出现过tap手势，则升级为doubletap手势
	 * > 如果处于panning状态，则根据滑出的速度，触发panend/flick手势
	 * flick手势被触发之后，再根据滑出的方向触发verticalflick/horizontalflick手势
	 * > 如果处于pressing状态，则触发pressend手势
	 *
	 * 3. 解绑定所有相关事件
	 * 
	 * @event
	 * @param  {event} event
	 */
	function touchendHandler(event) {

	    if (Object.keys(gestures).length == 2) {
	        var elements = [];
	        for (var p in gestures) {
	            elements.push(gestures[p].element);
	        }
	        fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
	            touches: slice.call(event.touches),
	            touchEvent: event
	        });
	    }

	    for (var i = 0; i < event.changedTouches.length; i++) {
	        var touch = event.changedTouches[i],
	            id = touch.identifier,
	            gesture = gestures[id];

	        if (!gesture) continue;

	        if (gesture.pressingHandler) {
	            clearTimeout(gesture.pressingHandler);
	            gesture.pressingHandler = null;
	        }

	        if (gesture.status === 'tapping') {
	            gesture.timestamp = Date.now();
	            fireEvent(gesture.element, 'tap', {
	                touch: touch,
	                touchEvent: event
	            });

	            if (lastTap && gesture.timestamp - lastTap.timestamp < 300) {
	                fireEvent(gesture.element, 'doubletap', {
	                    touch: touch,
	                    touchEvent: event
	                });
	            }

	            lastTap = gesture;
	        }

	        if (gesture.status === 'panning') {
	            var now = Date.now();
	            var duration = now - gesture.startTime,

	            // TODO: velocityX & velocityY never used
	            velocityX = (touch.clientX - gesture.startTouch.clientX) / duration,
	                velocityY = (touch.clientY - gesture.startTouch.clientY) / duration,
	                displacementX = touch.clientX - gesture.startTouch.clientX,
	                displacementY = touch.clientY - gesture.startTouch.clientY;

	            var velocity = Math.sqrt(gesture.velocityY * gesture.velocityY + gesture.velocityX * gesture.velocityX);
	            var isflick = velocity > 0.5 && now - gesture.lastTime < 100;
	            var extra = {
	                duration: duration,
	                isflick: isflick,
	                velocityX: gesture.velocityX,
	                velocityY: gesture.velocityY,
	                displacementX: displacementX,
	                displacementY: displacementY,
	                touch: touch,
	                touchEvent: event,
	                isVertical: gesture.isVertical
	            };

	            fireEvent(gesture.element, 'panend', extra);
	            if (isflick) {
	                fireEvent(gesture.element, 'flick', extra);

	                if (gesture.isVertical) {
	                    fireEvent(gesture.element, 'verticalflick', extra);
	                } else {
	                    fireEvent(gesture.element, 'horizontalflick', extra);
	                }
	            }
	        }

	        if (gesture.status === 'pressing') {
	            fireEvent(gesture.element, 'pressend', {
	                touch: touch,
	                touchEvent: event
	            });
	        }

	        delete gestures[id];
	    }

	    if (Object.keys(gestures).length === 0) {
	        docEl.removeEventListener('touchmove', touchmoveHandler, false);
	        docEl.removeEventListener('touchend', touchendHandler, false);
	        docEl.removeEventListener('touchcancel', touchcancelHandler, false);
	    }
	}

	/**
	 * 捕获touchcancel事件
	 * 
	 * 1. 如果当前触点数为2，则触发dualtouchend手势
	 *
	 * 2. 遍历每个触点：
	 * > 如果处于panning状态，则触发panend手势
	 * > 如果处于pressing状态，则触发pressend手势
	 *
	 * 3. 解绑定所有相关事件
	 * 
	 * @event
	 * @param  {event} event
	 */
	function touchcancelHandler(event) {
	    // TODO: 和touchendHandler大量重复，建议DRY

	    if (Object.keys(gestures).length == 2) {
	        var elements = [];
	        for (var p in gestures) {
	            elements.push(gestures[p].element);
	        }
	        fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
	            touches: slice.call(event.touches),
	            touchEvent: event
	        });
	    }

	    for (var i = 0; i < event.changedTouches.length; i++) {
	        var touch = event.changedTouches[i],
	            id = touch.identifier,
	            gesture = gestures[id];

	        if (!gesture) continue;

	        if (gesture.pressingHandler) {
	            clearTimeout(gesture.pressingHandler);
	            gesture.pressingHandler = null;
	        }

	        if (gesture.status === 'panning') {
	            fireEvent(gesture.element, 'panend', {
	                touch: touch,
	                touchEvent: event
	            });
	        }
	        if (gesture.status === 'pressing') {
	            fireEvent(gesture.element, 'pressend', {
	                touch: touch,
	                touchEvent: event
	            });
	        }
	        delete gestures[id];
	    }

	    if (Object.keys(gestures).length === 0) {
	        docEl.removeEventListener('touchmove', touchmoveHandler, false);
	        docEl.removeEventListener('touchend', touchendHandler, false);
	        docEl.removeEventListener('touchcancel', touchcancelHandler, false);
	    }
	}

	docEl.addEventListener('touchstart', touchstartHandler, false);

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//引入依赖
	var animation = __webpack_require__(15);
	var cubicbezier = __webpack_require__(16);
	var motion = __webpack_require__(42);
	var gesture = __webpack_require__(35);

	var doc = window.document;
	var ua = window.navigator.userAgent;
	var scrollObjs = {};
	var plugins = {};
	var dpr = window.dpr || (!!window.navigator.userAgent.match(/iPhone|iPad|iPod/) ? document.documentElement.clientWidth / window.screen.availWidth : 1);
	var inertiaCoefficient = {
	    'normal': [2 * dpr, 0.0015 * dpr],
	    'slow': [1.5 * dpr, 0.003 * dpr],
	    'veryslow': [1.5 * dpr, 0.005 * dpr]
	};
	var timeFunction = {
	    'ease': [.25, .1, .25, 1],
	    'liner': [0, 0, 1, 1],
	    'ease-in': [.42, 0, 1, 1],
	    'ease-out': [0, 0, .58, 1],
	    'ease-in-out': [.42, 0, .58, 1]
	};
	var Firefox = !!ua.match(/Firefox/i);
	var IEMobile = !!ua.match(/IEMobile/i);
	var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-';
	var stylePrefix = Firefox ? 'Moz' : IEMobile ? 'ms' : 'webkit';

	function debugLog() {
	    if (scroll.outputDebugLog) {
	        console.debug.apply(console, arguments);
	    }
	}

	function getBoundingClientRect(el) {
	    var rect = el.getBoundingClientRect();
	    if (!rect) {
	        rect = {};
	        rect.width = el.offsetWidth;
	        rect.height = el.offsetHeight;

	        rect.left = el.offsetLeft;
	        rect.top = el.offsetTop;
	        var parent = el.offsetParent;
	        while (parent) {
	            rect.left += parent.offsetLeft;
	            rect.top += parent.offsetTop;
	            parent = parent.offsetParent;
	        }

	        rect.right = rect.left + rect.width;
	        rect.bottom = rect.top + rect.height;
	    }
	    return rect;
	}

	function getMinScrollOffset(scrollObj) {
	    return 0 - scrollObj.options[scrollObj.axis + 'PaddingTop'];
	}

	function getMaxScrollOffset(scrollObj) {
	    var rect = getBoundingClientRect(scrollObj.element);
	    var pRect = getBoundingClientRect(scrollObj.viewport);
	    var min = getMinScrollOffset(scrollObj);
	    if (scrollObj.axis === 'y') {
	        var max = 0 - rect.height + pRect.height;
	    } else {
	        var max = 0 - rect.width + pRect.width;
	    }
	    return Math.min(max + scrollObj.options[scrollObj.axis + 'PaddingBottom'], min);
	}

	function _getBoundaryOffset(scrollObj, offset) {
	    if (offset > scrollObj.minScrollOffset) {
	        return offset - scrollObj.minScrollOffset;
	    } else if (offset < scrollObj.maxScrollOffset) {
	        return offset - scrollObj.maxScrollOffset;
	    }
	}

	function touchBoundary(scrollObj, offset) {
	    if (offset > scrollObj.minScrollOffset) {
	        offset = scrollObj.minScrollOffset;
	    } else if (offset < scrollObj.maxScrollOffset) {
	        offset = scrollObj.maxScrollOffset;
	    }
	    return offset;
	}

	function fireEvent(scrollObj, eventName, extra) {
	    debugLog(scrollObj.element.scrollId, eventName, extra);

	    var event = doc.createEvent('HTMLEvents');
	    event.initEvent(eventName, false, true);
	    event.scrollObj = scrollObj;
	    if (extra) {
	        for (var key in extra) {
	            event[key] = extra[key];
	        }
	    }
	    scrollObj.element.dispatchEvent(event);
	    scrollObj.viewport.dispatchEvent(event);
	}

	function getTransformOffset(scrollObj) {
	    var offset = { x: 0, y: 0 };
	    var transform = getComputedStyle(scrollObj.element)[stylePrefix + 'Transform'];
	    var matched;

	    if (transform !== 'none') {
	        if (matched = transform.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/) || transform.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/)) {
	            offset.x = parseFloat(matched[1]) || 0;
	            offset.y = parseFloat(matched[2]) || 0;
	        }
	    }

	    return offset;
	}

	var CSSMatrix = IEMobile ? 'MSCSSMatrix' : 'WebKitCSSMatrix';
	var has3d = !!Firefox || CSSMatrix in window && 'm11' in new window[CSSMatrix]();
	function getTranslate(x, y) {
	    x = parseFloat(x);
	    y = parseFloat(y);

	    if (x != 0) {
	        x += 'px';
	    }

	    if (y != 0) {
	        y += 'px';
	    }

	    if (has3d) {
	        return 'translate3d(' + x + ', ' + y + ', 0)';
	    } else {
	        return 'translate(' + x + ', ' + y + ')';
	    }
	}

	function setTransitionStyle(scrollObj, duration, timingFunction) {
	    if (duration === '' && timingFunction === '') {
	        scrollObj.element.style[stylePrefix + 'Transition'] = '';
	    } else {
	        scrollObj.element.style[stylePrefix + 'Transition'] = cssPrefix + 'transform ' + duration + ' ' + timingFunction + ' 0s';
	    }
	}

	function setTransformStyle(scrollObj, offset) {
	    var x = 0,
	        y = 0;
	    if ((typeof offset === 'undefined' ? 'undefined' : _typeof(offset)) === 'object') {
	        x = offset.x;
	        y = offset.y;
	    } else {
	        if (scrollObj.axis === 'y') {
	            y = offset;
	        } else {
	            x = offset;
	        }
	    }
	    scrollObj.element.style[stylePrefix + 'Transform'] = getTranslate(x, y);
	}

	var panning = false;
	doc.addEventListener('touchmove', function (e) {
	    if (panning) {
	        e.preventDefault();
	        return false;
	    }
	    return true;
	}, false);

	function Scroll(element, options) {
	    var that = this;

	    options = options || {};
	    options.noBounce = !!options.noBounce;
	    options.padding = options.padding || {};

	    if (options.isPrevent == null) {
	        options.isPrevent = true;
	    } else {
	        options.isPrevent = !!options.isPrevent;
	    }

	    if (options.isFixScrollendClick == null) {
	        options.isFixScrollendClick = true;
	    } else {
	        options.isFixScrollendClick = !!options.isFixScrollendClick;
	    }

	    if (options.padding) {
	        options.yPaddingTop = -options.padding.top || 0;
	        options.yPaddingBottom = -options.padding.bottom || 0;
	        options.xPaddingTop = -options.padding.left || 0;
	        options.xPaddingBottom = -options.padding.right || 0;
	    } else {
	        options.yPaddingTop = 0;
	        options.yPaddingBottom = 0;
	        options.xPaddingTop = 0;
	        options.xPaddingBottom = 0;
	    }

	    options.direction = options.direction || 'y';
	    options.inertia = options.inertia || 'normal';

	    this.options = options;
	    that.axis = options.direction;
	    this.element = element;
	    this.viewport = element.parentNode;
	    this.plugins = {};

	    this.element.scrollId = setTimeout(function () {
	        scrollObjs[that.element.scrollId + ''] = that;
	    }, 1);

	    this.viewport.addEventListener('touchstart', touchstartHandler, false);
	    this.viewport.addEventListener('touchend', touchendHandler, false);
	    this.viewport.addEventListener('touchcancel', touchendHandler, false);
	    this.viewport.addEventListener('panstart', panstartHandler, false);
	    this.viewport.addEventListener('pan', panHandler, false);
	    this.viewport.addEventListener('panend', panendHandler, false);

	    if (options.isPrevent) {
	        this.viewport.addEventListener('touchstart', function (e) {
	            panning = true;
	        }, false);
	        that.viewport.addEventListener('touchend', function (e) {
	            panning = false;
	        }, false);
	    }

	    // if (options.isPrevent) {
	    //     var d = this.axis === 'y'?'vertical':'horizontal';
	    //     this.viewport.addEventListener(d + 'panstart', function(e) {
	    //         panning = true;
	    //     }, false);
	    //     that.viewport.addEventListener('panend', function(e){
	    //         panning = false;
	    //     }, false);
	    // }

	    if (options.isFixScrollendClick) {
	        var preventScrollendClickHandler = function preventScrollendClickHandler(e) {
	            if (preventScrollendClick || isScrolling) {
	                e.preventDefault();
	                e.stopPropagation();
	                return false;
	            } else {
	                return true;
	            }
	        };

	        var fireNiceTapEventHandler = function fireNiceTapEventHandler(e) {
	            if (!preventScrollendClick && !isScrolling) {
	                setTimeout(function () {
	                    var niceTapEvent = document.createEvent('HTMLEvents');
	                    niceTapEvent.initEvent('niceclick', true, true);
	                    e.target.dispatchEvent(niceTapEvent);
	                }, 300);
	            }
	        };

	        var preventScrollendClick;
	        var fixScrollendClickTimeoutId;

	        this.viewport.addEventListener('scrolling', function () {
	            preventScrollendClick = true;
	            fixScrollendClickTimeoutId && clearTimeout(fixScrollendClickTimeoutId);
	            fixScrollendClickTimeoutId = setTimeout(function (e) {
	                preventScrollendClick = false;
	            }, 400);
	        }, false);

	        this.viewport.addEventListener('click', preventScrollendClickHandler, false);
	        this.viewport.addEventListener('tap', fireNiceTapEventHandler, false);
	    }

	    if (options.useFrameAnimation) {
	        var scrollAnimation;

	        Object.defineProperty(this, 'animation', {
	            get: function get() {
	                return scrollAnimation;
	            }
	        });
	    } else {
	        var _setTransitionEndHandler = function _setTransitionEndHandler(h, t) {
	            transitionEndHandler = null;
	            clearTimeout(transitionEndTimeoutId);

	            transitionEndTimeoutId = setTimeout(function () {
	                if (transitionEndHandler) {
	                    transitionEndHandler = null;
	                    animation.requestFrame(h);
	                }
	            }, t || 400);

	            transitionEndHandler = h;
	        };

	        var transitionEndHandler;
	        var transitionEndTimeoutId = 0;

	        element.addEventListener(Firefox ? 'transitionend' : stylePrefix + 'TransitionEnd', function (e) {
	            if (transitionEndHandler) {
	                var handler = transitionEndHandler;

	                transitionEndHandler = null;
	                clearTimeout(transitionEndTimeoutId);

	                animation.requestFrame(function () {
	                    handler(e);
	                });
	            }
	        }, false);
	    }

	    var panFixRatio;
	    var isScrolling;
	    var isFlickScrolling;
	    var cancelScrollEnd;

	    Object.defineProperty(this, 'isScrolling', {
	        get: function get() {
	            return !!isScrolling;
	        }
	    });

	    function isEnabled(e) {
	        if (!that.enabled) {
	            return false;
	        }

	        if (typeof e.isVertical != 'undefined') {
	            if (that.axis === 'y' && e.isVertical || that.axis === 'x' && !e.isVertical) {
	                // 同方向的手势，停止冒泡
	                e.stopPropagation();
	            } else {
	                // 不是同方向的手势，冒泡到上层，不做任何处理
	                return false;
	            }
	        }

	        return true;
	    }

	    function touchstartHandler(e) {
	        if (!isEnabled(e)) {
	            return;
	        }

	        if (isScrolling) {
	            scrollEnd();
	        }

	        if (options.useFrameAnimation) {
	            scrollAnimation && scrollAnimation.stop();
	            scrollAnimation = null;
	        } else {
	            var transform = getTransformOffset(that);
	            setTransformStyle(that, transform);
	            setTransitionStyle(that, '', '');
	            transitionEndHandler = null;
	            clearTimeout(transitionEndTimeoutId);
	        }
	    }

	    function touchendHandler(e) {
	        if (!isEnabled(e)) {
	            return;
	        }

	        var s0 = getTransformOffset(that)[that.axis];
	        var boundaryOffset = _getBoundaryOffset(that, s0);

	        if (boundaryOffset) {
	            // 拖动超出边缘，需要回弹
	            var s1 = touchBoundary(that, s0);

	            if (options.useFrameAnimation) {
	                // frame
	                var _s = s1 - s0;
	                scrollAnimation = new animation(400, cubicbezier.ease, 0, function (i1, i2) {
	                    var offset = (s0 + _s * i2).toFixed(2);
	                    setTransformStyle(that, offset);
	                    fireEvent(that, 'scrolling');
	                });
	                scrollAnimation.onend(scrollEnd);
	                scrollAnimation.play();
	            } else {
	                // css
	                var offset = s1.toFixed(0);
	                setTransitionStyle(that, '0.4s', 'ease');
	                setTransformStyle(that, offset);
	                setTransitionEndHandler(scrollEnd, 400);

	                animation.requestFrame(function () {
	                    if (isScrolling && that.enabled) {
	                        fireEvent(that, 'scrolling');
	                        animation.requestFrame(arguments.callee);
	                    }
	                });
	            }

	            if (boundaryOffset > 0) {
	                fireEvent(that, that.axis === 'y' ? 'pulldownend' : 'pullrightend');
	            } else if (boundaryOffset < 0) {
	                fireEvent(that, that.axis === 'y' ? 'pullupend' : 'pullleftend');
	            }
	        } else if (isScrolling) {
	            // 未超出边缘，直接结束
	            scrollEnd();
	        }
	    }

	    var lastDisplacement;
	    function panstartHandler(e) {
	        if (!isEnabled(e)) {
	            return;
	        }

	        that.transformOffset = getTransformOffset(that);
	        that.minScrollOffset = getMinScrollOffset(that);
	        that.maxScrollOffset = getMaxScrollOffset(that);
	        panFixRatio = 2.5;
	        cancelScrollEnd = true;
	        isScrolling = true;
	        isFlickScrolling = false;
	        fireEvent(that, 'scrollstart');

	        lastDisplacement = e['displacement' + that.axis.toUpperCase()];
	    }

	    function panHandler(e) {
	        if (!isEnabled(e)) {
	            return;
	        }

	        // 手指移动小于5像素，也忽略
	        var displacement = e['displacement' + that.axis.toUpperCase()];
	        if (Math.abs(displacement - lastDisplacement) < 5) {
	            e.stopPropagation();
	            return;
	        }
	        lastDisplacement = displacement;

	        var offset = that.transformOffset[that.axis] + displacement;
	        if (offset > that.minScrollOffset) {
	            offset = that.minScrollOffset + (offset - that.minScrollOffset) / panFixRatio;
	            panFixRatio *= 1.003;
	        } else if (offset < that.maxScrollOffset) {
	            offset = that.maxScrollOffset - (that.maxScrollOffset - offset) / panFixRatio;
	            panFixRatio *= 1.003;
	        }
	        if (panFixRatio > 4) {
	            panFixRatio = 4;
	        }

	        // 判断是否到了边缘
	        var boundaryOffset = _getBoundaryOffset(that, offset);
	        if (boundaryOffset) {
	            fireEvent(that, boundaryOffset > 0 ? that.axis === 'y' ? 'pulldown' : 'pullright' : that.axis === 'y' ? 'pullup' : 'pullleft', {
	                boundaryOffset: Math.abs(boundaryOffset)
	            });
	            if (that.options.noBounce) {
	                offset = touchBoundary(that, offset);
	            }
	        }

	        setTransformStyle(that, offset.toFixed(2));
	        fireEvent(that, 'scrolling');
	    }

	    function panendHandler(e) {
	        if (!isEnabled(e)) {
	            return;
	        }

	        if (e.isflick) {
	            flickHandler(e);
	        }
	    }

	    function flickHandler(e) {
	        cancelScrollEnd = true;

	        var v0, a0, t0, s0, s, motion0;
	        var v1, a1, t1, s1, motion1, sign;
	        var v2, a2, t2, s2, motion2, ft;

	        s0 = getTransformOffset(that)[that.axis];
	        var boundaryOffset0 = _getBoundaryOffset(that, s0);
	        if (!boundaryOffset0) {
	            //手指离开屏幕时，已经超出滚动范围，不作处理，让touchend handler处理
	            //手指离开屏幕时，在滚动范围内，做一下惯性计算
	            v0 = e['velocity' + that.axis.toUpperCase()];

	            var maxV = 2;
	            var friction = 0.0015;
	            if (options.inertia && inertiaCoefficient[options.inertia]) {
	                maxV = inertiaCoefficient[options.inertia][0];
	                friction = inertiaCoefficient[options.inertia][1];
	            }

	            if (v0 > maxV) {
	                v0 = maxV;
	            }
	            if (v0 < -maxV) {
	                v0 = -maxV;
	            }
	            a0 = friction * (v0 / Math.abs(v0));
	            motion0 = new motion({
	                v: v0,
	                a: -a0
	            });
	            t0 = motion0.t;
	            s = s0 + motion0.s;

	            var boundaryOffset1 = _getBoundaryOffset(that, s);
	            if (boundaryOffset1) {
	                //惯性运动足够滑出屏幕边缘
	                debugLog('惯性计算超出了边缘', boundaryOffset1);

	                v1 = v0;
	                a1 = a0;
	                if (boundaryOffset1 > 0) {
	                    s1 = that.minScrollOffset;
	                    sign = 1;
	                } else {
	                    s1 = that.maxScrollOffset;
	                    sign = -1;
	                }
	                motion1 = new motion({
	                    v: sign * v1,
	                    a: -sign * a1,
	                    s: Math.abs(s1 - s0)
	                });
	                t1 = motion1.t;
	                var timeFunction1 = motion1.generateCubicBezier();

	                v2 = v1 - a1 * t1;
	                a2 = 0.03 * (v2 / Math.abs(v2));
	                motion2 = new motion({
	                    v: v2,
	                    a: -a2
	                });
	                t2 = motion2.t;
	                s2 = s1 + motion2.s;
	                var timeFunction2 = motion2.generateCubicBezier();

	                if (options.noBounce) {
	                    // 没有边缘回弹效果，直接平顺滑到边缘
	                    debugLog('没有回弹效果');

	                    if (s0 !== s1) {
	                        if (options.useFrameAnimation) {
	                            // frame
	                            var _s = s1 - s0;
	                            var bezier = cubicbezier(timeFunction1[0][0], timeFunction1[0][1], timeFunction1[1][0], timeFunction1[1][1]);
	                            scrollAnimation = new animation(t1.toFixed(0), bezier, 0, function (i1, i2) {
	                                var offset = s0 + _s * i2;
	                                getTransformOffset(that, offset.toFixed(2));
	                                fireEvent(that, 'scrolling', {
	                                    afterFlick: true
	                                });
	                            });

	                            scrollAnimation.onend(scrollEnd);

	                            scrollAnimation.play();
	                        } else {
	                            // css
	                            var offset = s1.toFixed(0);
	                            setTransitionStyle(that, (t1 / 1000).toFixed(2) + 's', 'cubic-bezier(' + timeFunction1 + ')');
	                            setTransformStyle(that, offset);
	                            setTransitionEndHandler(scrollEnd, (t1 / 1000).toFixed(2) * 1000);
	                        }
	                    } else {
	                        scrollEnd();
	                    }
	                } else if (s0 !== s2) {
	                    debugLog('惯性滚动', 's=' + s2.toFixed(0), 't=' + ((t1 + t2) / 1000).toFixed(2));

	                    if (options.useFrameAnimation) {
	                        var _s = s2 - s0;
	                        var bezier = cubicbezier.easeOut;
	                        scrollAnimation = new animation((t1 + t2).toFixed(0), bezier, 0, function (i1, i2) {
	                            var offset = s0 + _s * i2;
	                            setTransformStyle(that, offset.toFixed(2));
	                            fireEvent(that, 'scrolling', {
	                                afterFlick: true
	                            });
	                        });

	                        scrollAnimation.onend(function () {
	                            if (!that.enabled) {
	                                return;
	                            }

	                            var _s = s1 - s2;
	                            var bezier = cubicbezier.ease;
	                            scrollAnimation = new animation(400, bezier, 0, function (i1, i2) {
	                                var offset = s2 + _s * i2;
	                                setTransformStyle(that, offset.toFixed(2));
	                                fireEvent(that, 'scrolling', {
	                                    afterFlick: true
	                                });
	                            });

	                            scrollAnimation.onend(scrollEnd);

	                            scrollAnimation.play();
	                        });

	                        scrollAnimation.play();
	                    } else {
	                        var offset = s2.toFixed(0);
	                        setTransitionStyle(that, ((t1 + t2) / 1000).toFixed(2) + 's', 'ease-out');
	                        setTransformStyle(that, offset);

	                        setTransitionEndHandler(function (e) {
	                            if (!that.enabled) {
	                                return;
	                            }

	                            debugLog('惯性回弹', 's=' + s1.toFixed(0), 't=400');

	                            if (s2 !== s1) {
	                                var offset = s1.toFixed(0);
	                                setTransitionStyle(that, '0.4s', 'ease');
	                                setTransformStyle(that, offset);
	                                setTransitionEndHandler(scrollEnd, 400);
	                            } else {
	                                scrollEnd();
	                            }
	                        }, ((t1 + t2) / 1000).toFixed(2) * 1000);
	                    }
	                } else {
	                    scrollEnd();
	                }
	            } else {
	                debugLog('惯性计算没有超出边缘');
	                var timeFunction = motion0.generateCubicBezier();

	                if (options.useFrameAnimation) {
	                    // frame;
	                    var _s = s - s0;
	                    var bezier = cubicbezier(timeFunction[0][0], timeFunction[0][1], timeFunction[1][0], timeFunction[1][1]);
	                    scrollAnimation = new animation(t0.toFixed(0), bezier, 0, function (i1, i2) {
	                        var offset = (s0 + _s * i2).toFixed(2);
	                        setTransformStyle(that, offset);
	                        fireEvent(that, 'scrolling', {
	                            afterFlick: true
	                        });
	                    });

	                    scrollAnimation.onend(scrollEnd);

	                    scrollAnimation.play();
	                } else {
	                    // css
	                    var offset = s.toFixed(0);
	                    setTransitionStyle(that, (t0 / 1000).toFixed(2) + 's', 'cubic-bezier(' + timeFunction + ')');
	                    setTransformStyle(that, offset);
	                    setTransitionEndHandler(scrollEnd, (t0 / 1000).toFixed(2) * 1000);
	                }
	            }

	            isFlickScrolling = true;
	            if (!options.useFrameAnimation) {
	                animation.requestFrame(function () {
	                    if (isScrolling && isFlickScrolling && that.enabled) {
	                        fireEvent(that, 'scrolling', {
	                            afterFlick: true
	                        });
	                        animation.requestFrame(arguments.callee);
	                    }
	                });
	            }
	        }
	    }

	    function scrollEnd() {
	        if (!that.enabled) {
	            return;
	        }

	        cancelScrollEnd = false;

	        setTimeout(function () {
	            if (!cancelScrollEnd && isScrolling) {
	                isScrolling = false;
	                isFlickScrolling = false;

	                if (options.useFrameAnimation) {
	                    scrollAnimation && scrollAnimation.stop();
	                    scrollAnimation = null;
	                } else {
	                    setTransitionStyle(that, '', '');
	                }
	                fireEvent(that, 'scrollend');
	            }
	        }, 50);
	    }

	    var proto = {
	        init: function init() {
	            this.enable();
	            this.refresh();
	            this.scrollTo(0);
	            return this;
	        },

	        enable: function enable() {
	            this.enabled = true;
	            return this;
	        },

	        disable: function disable() {
	            var el = this.element;
	            this.enabled = false;

	            if (this.options.useFrameAnimation) {
	                scrollAnimation && scrollAnimation.stop();
	            } else {
	                animation.requestFrame(function () {
	                    el.style[stylePrefix + 'Transform'] = getComputedStyle(el)[stylePrefix + 'Transform'];
	                });
	            }

	            return this;
	        },

	        getScrollWidth: function getScrollWidth() {
	            return getBoundingClientRect(this.element).width;
	        },

	        getScrollHeight: function getScrollHeight() {
	            return getBoundingClientRect(this.element).height;
	        },

	        getScrollLeft: function getScrollLeft() {
	            return -getTransformOffset(this).x - this.options.xPaddingTop;
	        },

	        getScrollTop: function getScrollTop() {
	            return -getTransformOffset(this).y - this.options.yPaddingTop;
	        },

	        getMaxScrollLeft: function getMaxScrollLeft() {
	            return -that.maxScrollOffset - this.options.xPaddingTop;
	        },

	        getMaxScrollTop: function getMaxScrollTop() {
	            return -that.maxScrollOffset - this.options.yPaddingTop;
	        },

	        getBoundaryOffset: function getBoundaryOffset() {
	            return Math.abs(_getBoundaryOffset(this, getTransformOffset(this)[this.axis]) || 0);
	        },

	        refresh: function refresh() {
	            var el = this.element;
	            var isVertical = this.axis === 'y';
	            var type = isVertical ? 'height' : 'width';

	            if (this.options[type] != null) {
	                // use options
	                el.style[type] = this.options[type] + 'px';
	            } else if (!!this.options.useElementRect) {
	                el.style[type] = 'auto';
	                el.style[type] = getBoundingClientRect(el)[type] + 'px';
	            } else if (el.childElementCount > 0) {
	                var range;
	                var rect;
	                var firstEl = el.firstElementChild;
	                var lastEl = el.lastElementChild;

	                if (document.createRange && !this.options.ignoreOverflow) {
	                    // use range
	                    range = document.createRange();
	                    range.selectNodeContents(el);
	                    rect = getBoundingClientRect(range);
	                }

	                if (rect) {
	                    el.style[type] = rect[type] + 'px';
	                } else {
	                    // use child offsets
	                    while (firstEl) {
	                        if (getBoundingClientRect(firstEl)[type] === 0 && firstEl.nextElementSibling) {
	                            firstEl = firstEl.nextElementSibling;
	                        } else {
	                            break;
	                        }
	                    }

	                    while (lastEl && lastEl !== firstEl) {
	                        if (getBoundingClientRect(lastEl)[type] === 0 && lastEl.previousElementSibling) {
	                            lastEl = lastEl.previousElementSibling;
	                        } else {
	                            break;
	                        }
	                    }

	                    el.style[type] = getBoundingClientRect(lastEl)[isVertical ? 'bottom' : 'right'] - getBoundingClientRect(firstEl)[isVertical ? 'top' : 'left'] + 'px';
	                }
	            }

	            this.transformOffset = getTransformOffset(this);
	            this.minScrollOffset = getMinScrollOffset(this);
	            this.maxScrollOffset = getMaxScrollOffset(this);
	            this.scrollTo(-this.transformOffset[this.axis] - this.options[this.axis + 'PaddingTop']);
	            fireEvent(this, 'contentrefresh');

	            return this;
	        },

	        offset: function offset(childEl) {
	            var elRect = getBoundingClientRect(this.element);
	            var childRect = getBoundingClientRect(childEl);
	            if (this.axis === 'y') {
	                var offsetRect = {
	                    top: childRect.top - elRect.top - this.options.yPaddingTop,
	                    left: childRect.left - elRect.left,
	                    right: elRect.right - childRect.right,
	                    width: childRect.width,
	                    height: childRect.height
	                };

	                offsetRect.bottom = offsetRect.top + offsetRect.height;
	            } else {
	                var offsetRect = {
	                    top: childRect.top - elRect.top,
	                    bottom: elRect.bottom - childRect.bottom,
	                    left: childRect.left - elRect.left - this.options.xPaddingTop,
	                    width: childRect.width,
	                    height: childRect.height
	                };

	                offsetRect.right = offsetRect.left + offsetRect.width;
	            }
	            return offsetRect;
	        },

	        getRect: function getRect(childEl) {
	            var viewRect = getBoundingClientRect(this.viewport);
	            var childRect = getBoundingClientRect(childEl);
	            if (this.axis === 'y') {
	                var offsetRect = {
	                    top: childRect.top - viewRect.top,
	                    left: childRect.left - viewRect.left,
	                    right: viewRect.right - childRect.right,
	                    width: childRect.width,
	                    height: childRect.height
	                };

	                offsetRect.bottom = offsetRect.top + offsetRect.height;
	            } else {
	                var offsetRect = {
	                    top: childRect.top - viewRect.top,
	                    bottom: viewRect.bottom - childRect.bottom,
	                    left: childRect.left - viewRect.left,
	                    width: childRect.width,
	                    height: childRect.height
	                };

	                offsetRect.right = offsetRect.left + offsetRect.width;
	            }
	            return offsetRect;
	        },

	        isInView: function isInView(childEl) {
	            var viewRect = this.getRect(this.viewport);
	            var childRect = this.getRect(childEl);
	            if (this.axis === 'y') {
	                return viewRect.top < childRect.bottom && viewRect.bottom > childRect.top;
	            } else {
	                return viewRect.left < childRect.right && viewRect.right > childRect.left;
	            }
	        },

	        scrollTo: function scrollTo(offset, isSmooth) {
	            var that = this;
	            var element = this.element;

	            offset = -offset - this.options[this.axis + 'PaddingTop'];
	            offset = touchBoundary(this, offset);

	            isScrolling = true;
	            if (isSmooth === true) {
	                if (this.options.useFrameAnimation) {
	                    var s0 = getTransformOffset(that)[this.axis];
	                    var _s = offset - s0;
	                    scrollAnimation = new animation(400, cubicbezier.ease, 0, function (i1, i2) {
	                        var offset = (s0 + _s * i2).toFixed(2);
	                        setTransformStyle(that, offset);
	                        fireEvent(that, 'scrolling');
	                    });

	                    scrollAnimation.onend(scrollEnd);

	                    scrollAnimation.play();
	                } else {
	                    setTransitionStyle(that, '0.4s', 'ease');
	                    setTransformStyle(that, offset);
	                    setTransitionEndHandler(scrollEnd, 400);

	                    animation.requestFrame(function () {
	                        if (isScrolling && that.enabled) {
	                            fireEvent(that, 'scrolling');
	                            animation.requestFrame(arguments.callee);
	                        }
	                    });
	                }
	            } else {
	                if (!this.options.useFrameAnimation) {
	                    setTransitionStyle(that, '', '');
	                }
	                setTransformStyle(that, offset);
	                scrollEnd();
	            }

	            return this;
	        },

	        scrollToElement: function scrollToElement(childEl, isSmooth) {
	            var offset = this.offset(childEl);
	            offset = offset[this.axis === 'y' ? 'top' : 'left'];
	            return this.scrollTo(offset, isSmooth);
	        },

	        getViewWidth: function getViewWidth() {
	            return getBoundingClientRect(this.viewport).width;
	        },

	        getViewHeight: function getViewHeight() {
	            return getBoundingClientRect(this.viewport).height;
	        },

	        addPulldownHandler: function addPulldownHandler(handler) {
	            var that = this;
	            this.element.addEventListener('pulldownend', function (e) {
	                that.disable();
	                handler.call(that, e, function () {
	                    that.scrollTo(0, true);
	                    that.refresh();
	                    that.enable();
	                });
	            }, false);

	            return this;
	        },

	        addPullupHandler: function addPullupHandler(handler) {
	            var that = this;

	            this.element.addEventListener('pullupend', function (e) {
	                that.disable();
	                handler.call(that, e, function () {
	                    that.scrollTo(that.getScrollHeight(), true);
	                    that.refresh();
	                    that.enable();
	                });
	            }, false);

	            return this;
	        },

	        addScrollstartHandler: function addScrollstartHandler(handler) {
	            var that = this;
	            this.element.addEventListener('scrollstart', function (e) {
	                handler.call(that, e);
	            }, false);

	            return this;
	        },

	        addScrollingHandler: function addScrollingHandler(handler) {
	            var that = this;
	            this.element.addEventListener('scrolling', function (e) {
	                handler.call(that, e);
	            }, false);

	            return this;
	        },

	        addScrollendHandler: function addScrollendHandler(handler) {
	            var that = this;
	            this.element.addEventListener('scrollend', function (e) {
	                handler.call(that, e);
	            }, false);

	            return this;
	        },

	        addContentrenfreshHandler: function addContentrenfreshHandler(handler) {
	            var that = this;
	            this.element.addEventListener('contentrefresh', function (e) {
	                handler.call(that, e);
	            }, false);
	        },

	        addEventListener: function addEventListener(name, handler, useCapture) {
	            var that = this;
	            this.element.addEventListener(name, function (e) {
	                handler.call(that, e);
	            }, !!useCapture);
	        },

	        removeEventListener: function removeEventListener(name, handler) {
	            var that = this;
	            this.element.removeEventListener(name, function (e) {
	                handler.call(that, e);
	            });
	        },

	        enablePlugin: function enablePlugin(name, options) {
	            var plugin = plugins[name];
	            if (plugin && !this.plugins[name]) {
	                this.plugins[name] = true;
	                options = options || {};
	                plugin.call(this, name, options);
	            }
	            return this;
	        }
	    };

	    for (var k in proto) {
	        this[k] = proto[k];
	    }
	    //delete proto;
	}
	var scroll = function scroll(el, options) {
	    if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
	        options = arguments[0];
	        if (options.scrollElement) {
	            el = options.scrollElement;
	        } else if (options.scrollWrap) {
	            el = options.scrollWrap.firstElementChild;
	        } else {
	            throw new Error('no scroll element');
	        }
	    }

	    if (!el.parentNode) {
	        throw new Error('wrong dom tree');
	    }
	    if (options && options.direction && ['x', 'y'].indexOf(options.direction) < 0) {
	        throw new Error('wrong direction');
	    }

	    var scroll1;

	    if (options.downgrade === true && scroll.downgrade) {
	        scroll1 = scroll.downgrade(el, options);
	    } else {

	        if (el.scrollId) {
	            scroll1 = scrollObjs[el.scrollId];
	        } else {
	            scroll1 = new Scroll(el, options);
	        }
	    }
	    return scroll1;
	};
	scroll.plugin = function (name, constructor) {
	    if (constructor) {
	        name = name.split(',');
	        name.forEach(function (n) {
	            plugins[n] = constructor;
	        });
	    } else {
	        return plugins[name];
	    }
	};
	module.exports = scroll;

/***/ },

/***/ 42:
/***/ function(module, exports) {

	'use strict';

	/**
	 * 二次贝塞尔曲线(即抛物线)转换为三次贝塞尔曲线
	 * 
	 * @param  {number} a p1点的横坐标
	 * @param  {number} b p1点的纵坐标
	 * @return {Array}    4个三次贝塞尔参数组成的数组，形如[[p1x, p1y], [p2x, p2y]]
	 */
	function quadratic2cubicBezier(a, b) {
	    return [[(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)], [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]];
	}

	/**
	 * 通过已知的运动参数，推导出其它的位置参数
	 * 基于牛顿第二定律：s = vt + at^2/2
	 * 
	 * @param {object} config 形如{v, a, s, t}，其中：
	 *                        v是已知初速度，a是已知加速度
	 *                        t是时间，s是位移
	 *                        t和s最少知其一，即可推导出另一个
	 */
	function Motion(config) {

	    this.v = config.v || 0;
	    this.a = config.a || 0;

	    if (typeof config.t !== 'undefined') {
	        this.t = config.t;
	    }

	    if (typeof config.s !== 'undefined') {
	        this.s = config.s;
	    }

	    // 通过位移倒推时间
	    if (typeof this.t === 'undefined') {
	        if (typeof this.s === 'undefined') {
	            this.t = -this.v / this.a;
	        } else {
	            var t1 = (Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
	            var t2 = (-Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
	            this.t = Math.min(t1, t2);
	        }
	    }

	    // 通过时间推导位移
	    if (typeof this.s === 'undefined') {
	        this.s = this.a * this.t * this.t / 2 + this.v * this.t;
	    }
	}

	/**
	 * 根据运动参数推导出三维贝塞尔参数
	 * @return {Array} 4个三次贝塞尔参数组成的数组，形如[[p1x, p1y], [p2x, p2y]]
	 */
	Motion.prototype.generateCubicBezier = function () {
	    return quadratic2cubicBezier(this.v / this.a, this.t + this.v / this.a);
	};
	module.exports = Motion;

/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//引入css
	var style = __webpack_require__(47);
	//引入模板
	var tplRender = __webpack_require__(48);
	var scrollObj = __webpack_require__(38);

	//默认配置项
	var defaults = {
		/**
	  * PageView弹出的
	  * 方位,默认从右侧弹出
	  * <br>有以下几种取值：
	  * <br>0 -> 从上侧弹出
	  * <br>1 -> 从右侧弹出
	  * <br>2 -> 从下侧弹出
	  * <br>3 -> 从械侧弹出
	  * @property  position 
	  * @type {Number}
	  * @default 1
	  */
		position: 1,
		/**
	  * PageView的宽度，以整页宽的百分比表示，也可以用像素表示
	  * @property  width
	  * @type {String}
	  * @default "100%"
	  */
		width: "100%",
		/**
	  * PageView的高度，以整页高的百分比表示，也可以用像素表示
	  * @property  height 
	  * @type {String}
	  * @default "100%"
	  */
		height: "100%",
		/**
	  * 是否显示遮罩层
	  * @property  mask 
	  * @type {Boolean}
	  * @default true
	  */
		mask: true,
		dataType: 'server', //server or html
		url: null,
		dataTpl: null,
		/**
	  * 当前pageview的内容
	  * @property  dataEl 
	  * @type {Object}
	  * @default null
	  */
		dataEl: null,
		/**
	  * 是否自动隐藏
	  * @property  autohide 
	  * @type {Boolean}
	  * @default false
	  */
		autohide: false,
		/**
	  * 如果设置了自动隐藏，则此配置为隐藏延时，单位为毫秒
	  * @property  delay 
	  * @type {Number}
	  * @default  3000
	  */
		delay: 3000,
		history: null,
		pageBackground: '#fff',
		isLoad: true,
		onComplete: null //完成回调
	};
	var incId = 0;
	var styleId = "pageview-style";
	var isShow = false;
	var stylePrefix = "webkit";
	var positionMap = ["translate3d(0,-100%,0)", "translate3d(100%,0,0)", "translate3d(0," + screen.height + "px,0)", "translate3d(-100%,0,0)"];

	var oldSize = screen.height;
	//私有方法区

	var _getData = function _getData(params, fn) {

		var that = this;
		$.ajax({
			type: 'post',
			data: params,
			url: this.options.url,
			success: function success(data) {
				if (data.isOk) {
					fn.call(that, data.data);
				}
			}
		});
	};

	var _renderData = function _renderData(id, style, html) {
		var content = {
			id: id,
			html: html,
			transparent: this.options.isMaskTransparent || false,
			style: style
		};
		var htmlStr = tplRender(content);
		$("body").append(htmlStr);

		var scrollObj1 = scrollObj({
			scrollWrap: document.getElementById(id),
			useElementRect: true
		});

		scrollObj1.init();
		this.scroll = scrollObj1;
		this.element = document.getElementById(id);
		this.maskEle = document.getElementById("mask-" + id);
		this.element.style.background = this.options.pageBackground;
		//_render(pageDom,this.options.dataEl);
		//根据当前配置设置pageview的初始位置
		_setPosition(this.element, this.options.position);
		_setSize.call(this, this.element, this.options.width, this.options.height);
		_bindEvent.call(this);
		this.options.onComplete.call(this);
	};
	/**
	 * 初始化方法
	 * @method  _init
	 * @private
	 */
	var _init = function _init() {
		//生成当前插件唯一ID
		var id = Date.now() + '-' + ++incId;
		this.id = id;
		this.scrollObjID = "scrollObjer-" + id;
		var html = "";
		var opts = this.options;
		var that = this;

		switch (this.options.dataType) {
			case 'server':
				var params = this.options.getParams();
				if (this.options.isLoad) {
					_getData.call(this, params, function (data) {
						data = opts.formatData(data);
						var compunStr = opts.dataTpl(data);
						_renderData.call(that, id, style, compunStr);
					});
				} else {
					_renderData.call(that, id, style, html);
				}
				break;
			case 'html':
				html = $(this.options.dataEl).html();
				_renderData(id, style, html).bind(this);
				break;
			case 'data':
				html = opts.dataTpl(opts.data);
				_renderData.call(that, id, style, html);
				break;
		}
	};

	var _render = function _render(params) {
		var id = this.id;

		var html = "";
		var opts = this.options;
		var that = this;

		switch (this.options.dataType) {
			case 'server':
				_getData.call(this, params, function (data) {
					data = opts.formatData(data);
					html = opts.dataTpl(data);
					$(that.element).find('.scroller').empty().append(html);
					that.scroll.refresh();
				});
				break;
			case 'html':
				html = params;
				break;
			case 'data':
				html = opts.dataTpl({ data: params });
				break;
		}
		$(this.element).find('.scroller').empty().append(html);
		that.scroll.refresh();
	};

	/**
	 * 设置pageview的弹出位置
	 * @method _setPosition
	 * @private
	 * @param {Number} position 位置标识
	 */
	var _setPosition = function _setPosition(wrap, position) {
		if (position === 0) {
			wrap.style.top = 0;
		}
		if (position === 1) {
			wrap.style.right = 0;
		}
		if (position === 2) {
			wrap.style.bottom = 0;
		}
		if (position === 3) {
			wrap.style.left = 0;
		}
		wrap.style.display = 'none';
		wrap.style[stylePrefix + "Transform"] = positionMap[position];
		setTimeout(function () {
			wrap.style.display = 'block';
		}, 0);
	};

	/**
	 * 设置pageview的大小
	 * @method _setSize
	 * @param {Object} wrap   pageView的容器
	 * @param {String} width  pageView的宽度
	 * @param {String} height pageView的高度
	 */
	var _setSize = function _setSize(wrap, width, height) {
		var options = this.options;

		if (this.options.top) {
			height = screen.height - options.top + 'px';
		}
		wrap.style.width = width;
		wrap.style.height = height;
	};

	var _bindEvent = function _bindEvent() {
		var self = this;
		this.maskEle.addEventListener('touchmove', function (e) {
			e.stopPropagation();
			return false;
		});
	};
	function _renRender(html) {
		$(this.element).find('.scroller').empty().append(html);
	}
	/**
	 * 单页视图组件，实现如下功能
	 * <br>1、在当前页面插入spa单页，并实现动态切换
	 * <br>2、修改历史记录，用户可以使用前进和后退按钮进行页面切换
	 * <br>3、可配置页面的宽度，默认为全屏，否则，页面只当当前屏的一并
	 * <br>4、可配置页面弹出的方位，有上、下、左、右四种可选
	 * @class PageView
	 * @constructor
	 */
	function PageView(opts) {
		this.options = $.extend({}, defaults, opts);

		//初始化
		_init.call(this);

		return this;
	}

	PageView.prototype = {
		/**
	  * 重新渲染当前页面的内容
	  * @method render
	  * @param  {Object} ele 要设置为当前页的dom结构
	  * @return {PageView}   当前实例，以便可以链式调用
	  */
		render: function render(ele) {
			$("#scrollObjer-" + this.id).empty().append(ele.cloneNode());
			return this;
		},
		getElement: function getElement() {
			console.log(this.element);
			return this.element;
		},
		/**
	  * 显示当前的的PageView
	  * @method show
	  * @return {PageView} 当前实例，以便可以链式调用
	  */
		show: function show() {
			var transform = 'translate3d(0,0,0)';
			switch (this.options.position) {
				case 2:
					transform = 'translate3d(0,' + this.options.top + 'px,0)';
					break;
			}
			var self = this;
			isShow = true;
			self.element.style[stylePrefix + "Transform"] = transform;
			this.maskEle.classList.add(style.active);
			$(this.maskEle).one('click', function (e) {
				if (isShow) {
					self.hide();
					if (location.hash == "#!" + self.id) {
						self.options.history.back();
					}
				}
			});

			var state = {
				id: this.id,
				title: "test",
				url: "#!" + this.id
			};
			//self.options.history.push(state,self);
			return this;
		},
		/**
	  * 隐藏当前的PageView
	  * @method  hide
	  * @return {PageView} 当前实例，以便可以链式调用
	  */
		hide: function hide() {
			var self = this;
			isShow = false;
			this.element.style[stylePrefix + "Transform"] = positionMap[this.options.position];
			this.maskEle.classList.remove(style.active);
			/*self.element.classList.remove("active");
	  if(self.options.position == 3){
	  			self.element.style[stylePrefix+"Transform"] = "translate3d(-100%,0,0)";
	  }*/
			return this;
		},
		reRender: function reRender(params) {
			_render.call(this, params);
		},
		/**
	  * 销毁当前页面
	  * @method distory
	  * @return {PageView} 当前实例，以便可以链式调用
	  */
		distory: function distory() {},
		refresh: function refresh(opts) {
			this.options = $.extend({}, this.options, opts);

			_setPosition(this.element, this.options.position);
			_setSize.call(this, this.element, this.options.width, this.options.height);
		}
	};

	/**
	 * PageView生成器
	 * @method create
	 * @static
	 * @example
	 * 	var page1 = plugin.PageView.create({
	 * 		width:"70%",
	 * 		position: 1
	 * 	})
	 * @param  {JSON} 	opts PageView的配置参数，详见Properties
	 * @return {PageView} 返回PageView实例 
	 */
	PageView.create = function (opts) {
		return new PageView(opts);
	};
	//导出构造函数
	module.exports = PageView;

/***/ },

/***/ 47:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"wraper":"pageview__wraper___2i4_e","active":"pageview__active___3pLjH","mask":"pageview__mask___bw0H5"};

/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    return "opacity:0";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing, alias5="function";

	  return "<div class=\""
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.style : depth0)) != null ? stack1.mask : stack1), depth0))
	    + "\" id=\"mask-"
	    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\" style=\""
	    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.transparent : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\"></div>\r\n<div class=\""
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.style : depth0)) != null ? stack1.wraper : stack1), depth0))
	    + "\" id=\""
	    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\">\r\n	<div class=\"scroller\" id=\"scroller-"
	    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\">\r\n		"
	    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "\r\n	</div>\r\n</div>";
	},"useData":true});

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)}; true?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"=="function"&&__webpack_require__(188)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return m}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}).call(this);
	//# sourceMappingURL=underscore-min.map

/***/ },

/***/ 188:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//根对象
	__webpack_require__(226);
	var cubicbezier = __webpack_require__(16);
	var animation = __webpack_require__(15);
	var isIEMobile = window.navigator.userAgent.match(/IEMobile\/([\d\.]+)/);
	var stylePrefix = !!isIEMobile ? 'ms' : 'webkit';

	var incId = 0;

	/**
	 * 初始化加载动画实例
	 * @class Loading
	 * @param {HTMLElement} [element] - 初始化的元素，可省略
	 */
	function Loading(element, options) {
	    var that = this;
	    var id = Date.now() + '-' + ++incId;
	    var root = document.createDocumentFragment();

	    if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
	        options = arguments[0];
	        element = null;
	    }
	    if (!element) {
	        element = document.createElement('div');
	        root.appendChild(element);
	    }
	    options = options || {};

	    element.setAttribute('data-ctrl-name', 'loading');
	    element.setAttribute('data-ctrl-id', id);
	    element.innerHTML = '<div><canvas></canvas><span class="arrow"></span></div><span class="text"></span>';

	    var canvas,
	        context,
	        radius,
	        lineWidth,
	        startAngle,
	        perAngle,
	        isInit = false;
	    var canvasPixelRatio = 2;
	    function init() {
	        if (!isInit) {
	            isInit = true;
	            canvas = element.querySelector('canvas');
	            context = canvas.getContext('2d');
	            startAngle = 0.13373158940994154;
	            perAngle = 0.06015722128359704;
	        }

	        var rect = canvas.getBoundingClientRect();
	        if (canvas.width !== rect.width * canvasPixelRatio || canvas.height !== rect.height * canvasPixelRatio) {
	            canvas.width = rect.width * canvasPixelRatio;
	            canvas.height = rect.height * canvasPixelRatio;
	            radius = rect.width / 2;
	            lineWidth = radius / 15;
	        }
	    }

	    function spin() {
	        if (mode !== 'spin') return;

	        init();
	        var offset = 0;

	        animation.requestFrame(function () {
	            if (mode !== 'spin') return;

	            context.clearRect(0, 0, canvas.width, canvas.height);
	            context.beginPath();
	            context.arc(radius * canvasPixelRatio, radius * canvasPixelRatio, (radius - lineWidth) * canvasPixelRatio, -startAngle - Math.PI / 2 - offset, -startAngle - Math.PI / 2 - perAngle * 100 - offset, true);
	            context.lineWidth = lineWidth * canvasPixelRatio;
	            context.strokeStyle = '#ff5000';
	            context.stroke();
	            context.closePath();
	            offset += Math.PI * 4 / 60;
	            animation.requestFrame(spin);
	        });
	    }

	    function draw(per) {
	        if (mode !== 'draw') return;

	        init();

	        if (per > 100) {
	            per = 100;
	        }

	        context.clearRect(0, 0, canvas.width * canvasPixelRatio, canvas.height * canvasPixelRatio);
	        context.beginPath();
	        context.arc(radius * canvasPixelRatio, radius * canvasPixelRatio, (radius - lineWidth) * canvasPixelRatio, -startAngle - Math.PI / 2, -startAngle - Math.PI / 2 - perAngle * per, true);
	        context.lineWidth = lineWidth * canvasPixelRatio;
	        context.strokeStyle = '#ff5000';
	        context.stroke();
	        context.closePath();
	    }

	    function showArrow() {
	        var arrow = element.querySelector('.arrow');
	        arrow.style.cssText = 'display: block';
	    }

	    function hideArrow() {
	        var arrow = element.querySelector('.arrow');

	        arrow.style[stylePrefix + 'Transform'] = 'scale(1)';
	        arrow.style.opacity = '1';
	        var anim = new animation(400, cubicbezier.easeIn, 0, function (i1, i2) {
	            arrow.style[stylePrefix + 'Transform'] = 'scale(' + (1 - 0.5 * i2) + ')';
	            arrow.style.opacity = 1 - i2 + '';
	        });
	        anim.onend(function () {
	            arrow.style.cssText = 'display:none';
	        });
	        anim.play();
	    }

	    /**
	     * 获取/设置背景色
	     * @member {String} bgcolor
	     * @memberof Loading
	     * @instance
	     */
	    Object.defineProperty(this, 'bgcolor', {
	        get: function get() {
	            return element.style.backgroundColor;
	        },
	        set: function set(v) {
	            if (typeof v !== 'string') {
	                throw new Error('Non expected value');
	            } else {
	                element.style.backgroundColor = v;
	            }
	        }
	    });

	    /**
	     * 获取/设置文本
	     * @member {String} text
	     * @memberof Loading
	     * @instance
	     */
	    Object.defineProperty(this, 'text', {
	        get: function get() {
	            return element.querySelector('.text').textContent;
	        },
	        set: function set(v) {
	            if (typeof v !== 'string') {
	                throw new Error('Non expected value');
	            } else {
	                var divEl = element.querySelector('div');
	                var textEl = element.querySelector('.text');
	                if (v) {
	                    element.style[stylePrefix + 'BoxPack'] = '';
	                    divEl.style.marginLeft = '';
	                    textEl.style.display = 'block';
	                    textEl.textContent = v;
	                } else {
	                    element.style[stylePrefix + 'BoxPack'] = 'center';
	                    divEl.style.marginLeft = '0';
	                    textEl.style.display = 'none';
	                    textEl.textContent = '';
	                }
	            }
	        }
	    });

	    /**
	     * 获取/设置模式，draw 绘制模式，可设置绘制的百分比；spin 旋转模式
	     * @member {String} mode
	     * @memberof Loading
	     * @instance
	     */
	    var mode = '';
	    Object.defineProperty(this, 'mode', {
	        get: function get() {
	            return mode;
	        },
	        set: function set(v) {
	            if (!v && typeof v !== 'string' && ['draw', 'spin'].indexOf(v) < 0) {
	                throw new Error('Non expected value');
	            } else {
	                mode = v;
	                if (mode === 'spin') {
	                    if (arrowDirection) {
	                        hideArrow();
	                    }
	                    spin();
	                } else if (mode === 'draw') {
	                    showArrow();
	                    draw(0);
	                }
	            }
	        }
	    });

	    /**
	     * 获取/设置绘制的百分比，在绘制模式下设置百分比0~100
	     * @member {String} per
	     * @memberof Loading
	     * @instance
	     */
	    var per = 0;
	    Object.defineProperty(this, 'per', {
	        get: function get() {
	            return per;
	        },
	        set: function set(v) {
	            if (mode !== 'draw') {
	                throw new Error('only work under "draw" mode');
	            }

	            if (!v && typeof v !== 'number' && v < 0 && v > 100) {
	                throw new Error('Non expected value');
	            } else {
	                draw(v);
	            }
	        }
	    });

	    /**
	     * 获取/设置箭头的方向
	     * @member {String} arrowDirection
	     * @memberof Loading
	     * @instance
	     */
	    var arrowDirection = '';
	    Object.defineProperty(this, 'arrowDirection', {
	        get: function get() {
	            return arrowDirection;
	        },
	        set: function set(v) {
	            if (!v && typeof v !== 'string' && ['up', 'down', ''].indexOf(v) < 0) {
	                throw new Error('Non expected value');
	            } else {
	                arrowDirection = v;
	                element.querySelector('.arrow').className = 'arrow ' + v;
	            }
	        }
	    });

	    /**
	     * 移除控件
	     * @method remove
	     * @memberof Loading
	     * @instance
	     */
	    this.remove = function () {
	        if (element.parentNode) {
	            element.parentNode.removeChild(element);
	        }
	    };

	    this.element = element;
	    /**
	     * 当前控件的根元素
	     * @member {HTMLElment} root
	     * @memberof Loading
	     * @instance
	     */
	    this.root = root;
	}
	module.exports = Loading;

/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//注入样式
	__webpack_require__(227);
	var doc = window.document;
	var ua = window.navigator.userAgent;
	var Firefox = !!ua.match(/Firefox/i);
	var IEMobile = !!ua.match(/IEMobile/i);
	var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-';
	var stylePrefix = Firefox ? 'Moz' : IEMobile ? 'ms' : 'webkit';
	var scrollOjb = __webpack_require__(38);
	var refreshLoadingObj = __webpack_require__(223);
	var animation = __webpack_require__(15);
	var cubicbezier = __webpack_require__(16);
	function setHTMLElement(parent, child) {
	    if (typeof child === 'string') {
	        parent.innerHTML = child;
	    } else if (child instanceof HTMLElement) {
	        parent.innerHTML = '';
	        parent.appendChild(child);
	    } else if (child instanceof Array || child instanceof NodeList) {
	        var fragment = doc.createDocumentFragment();
	        Array.prototype.slice.call(child).forEach(function (node) {
	            fragment.appendChild(node);
	        });
	        parent.appendChild(fragment);
	    }
	}

	function getTransformOffset(element) {
	    var offset = { x: 0, y: 0 };
	    var transform = getComputedStyle(element)[stylePrefix + 'Transform'];
	    var matched;

	    if (transform !== 'none') {
	        if (matched = transform.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/) || transform.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/)) {
	            offset.x = parseFloat(matched[1]) || 0;
	            offset.y = parseFloat(matched[2]) || 0;
	        }
	    }

	    return offset;
	}

	var CSSMatrix = IEMobile ? 'MSCSSMatrix' : 'WebKitCSSMatrix';
	var has3d = !!Firefox || CSSMatrix in window && 'm11' in new window[CSSMatrix]();
	function getTranslate(x, y) {
	    x = parseFloat(x);
	    y = parseFloat(y);

	    if (x != 0) {
	        x += 'px';
	    }

	    if (y != 0) {
	        y += 'px';
	    }

	    if (has3d) {
	        return 'translate3d(' + x + ', ' + y + ', 0)';
	    } else {
	        return 'translate(' + x + ', ' + y + ')';
	    }
	}

	function setTransitionStyle(element, duration, timingFunction) {
	    if (arguments.length === 1) {
	        element.style[stylePrefix + 'Transition'] = '';
	    } else {
	        element.style[stylePrefix + 'Transition'] = cssPrefix + 'transform ' + duration + ' ' + timingFunction + ' 0s';
	    }
	}

	function setTransformStyle(element, x, y) {
	    element.style[stylePrefix + 'Transform'] = getTranslate(x, y);
	}

	var incId = 0;
	function ScrollView(root, options) {

	    function fireEvent(name, extra) {
	        var ev = doc.createEvent('HTMLEvents');
	        ev.initEvent(name, false, false);
	        if (extra) {
	            for (var key in extra) {
	                ev[key] = extra[key];
	            }
	        }
	        scroll.element.dispatchEvent(ev);
	    }

	    var that = this;
	    var id = Date.now() + '-' + ++incId;

	    if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
	        options = arguments[0];
	        root = null;
	    }

	    options = options || {};
	    if (!root) {
	        root = doc.createElement('div');
	    }
	    var scrollWrap = root.firstElementChild || doc.createElement('div');
	    var scrollElement = scrollWrap.firstElementChild || doc.createElement('div');

	    if (!scrollWrap.parentNode) {
	        root.appendChild(scrollWrap);
	    }

	    if (!scrollElement.parentNode) {
	        scrollWrap.appendChild(scrollElement);
	    }

	    root.setAttribute('data-ctrl-name', 'scrollview');
	    root.setAttribute('data-ctrl-id', id);
	    root.setAttribute('data-direction', options.direction !== 'x' ? 'vertical' : 'horizontal');
	    if (scrollWrap.className.indexOf('scroll-wrap') < 0) {
	        scrollWrap.className = scrollWrap.className.split(' ').concat('scroll-wrap').join(' ').replace(/^\s+/, '');
	    }
	    if (scrollElement.className.indexOf('scroll-content') < 0) {
	        scrollElement.className = scrollElement.className.split(' ').concat('scroll-content').join(' ').replace(/^\s+/, '');
	    }

	    options.scrollElement = scrollElement;
	    options.scrollWrap = scrollWrap;

	    var scroll = new scrollOjb(options);

	    this.scrollWrap = scrollWrap;
	    this.scrollElement = scrollElement;
	    this.scroll = scroll;
	    this.root = this.element = root;

	    for (var name in scroll) {
	        void function (name) {
	            if (typeof scroll[name] === 'function') {
	                that[name] = function () {
	                    return scroll[name].apply(scroll, arguments);
	                };
	            } else {
	                Object.defineProperty(that, name, {
	                    get: function get() {
	                        return scroll[name];
	                    },
	                    set: function set(v) {
	                        scroll[name] = v;
	                    }
	                });
	            }
	        }(name);
	    }

	    Object.defineProperty(this, 'forceRepaint', {
	        value: new ForceRepaint(this)
	    });

	    Object.defineProperty(this, 'fixed', {
	        value: new Fixed(this)
	    });

	    Object.defineProperty(this, 'lazyload', {
	        value: new Lazyload(this)
	    });

	    Object.defineProperty(this, 'sticky', {
	        value: new Sticky(this)
	    });

	    Object.defineProperty(this, 'pullRefresh', {
	        value: new Refresh(this)
	    });

	    // refersh init
	    (function () {
	        if (scroll.axis !== 'y') return;

	        var height = window.dpr ? window.dpr * 60 : 60;
	        var processingText = '下拉即可刷新...';
	        var refreshText = '正在刷新...';

	        var refreshLoading = new refreshLoadingObj();
	        refreshLoading.arrowDirection = 'down';
	        refreshLoading.mode = 'draw';
	        refreshLoading.text = processingText;
	        var element = refreshLoading.element;

	        that.pullRefresh.element = element;
	        that.pullRefresh.height = height;
	        that.pullRefresh.processingHandler = function (offset) {
	            if (refreshLoading.mode !== 'draw') {
	                refreshLoading.mode = 'draw';
	            }
	            if (refreshLoading.text !== processingText) {
	                refreshLoading.text = processingText;
	            }
	            refreshLoading.per = Math.round(offset / height * 100);
	        };
	        that.pullRefresh.refreshHandler = function (done) {
	            var isDone = false;
	            refreshLoading.text = refreshText;
	            refreshLoading.mode = 'spin';
	            that.pullRefresh.handler && that.pullRefresh.handler(function () {
	                if (isDone) return;
	                isDone = true;
	                done();
	            });
	        };
	    })();

	    Object.defineProperty(this, 'pullUpdate', {
	        value: new Update(this)
	    });

	    // update init
	    (function () {
	        if (scroll.axis !== 'y') return;

	        var height = window.dpr ? window.dpr * 60 : 60;
	        var processingText = '上拉加载更多...';
	        var updateText = '正在加载...';

	        var updateLoading = new refreshLoadingObj();
	        updateLoading.arrowDirection = 'up';
	        updateLoading.mode = 'draw';
	        updateLoading.text = processingText;
	        var element = updateLoading.element;

	        that.pullUpdate.element = element;
	        that.pullUpdate.height = height;

	        that.pullUpdate.processingHandler = function (offset) {
	            if (updateLoading.mode !== 'draw') {
	                updateLoading.mode = 'draw';
	            }
	            if (updateLoading.text !== processingText) {
	                updateLoading.text = processingText;
	            }
	            updateLoading.per = Math.round(offset / height * 100);
	        };

	        that.pullUpdate.updateHandler = function (done) {
	            var isDone = false;
	            updateLoading.text = updateText;
	            updateLoading.mode = 'spin';
	            that.pullUpdate.handler && that.pullUpdate.handler(function () {
	                if (isDone) return;
	                isDone = true;
	                done();
	            });
	        };
	    })();

	    Object.defineProperty(this, 'content', {
	        get: function get() {
	            return Array.prototype.slice.call(element.childNodes);
	        },
	        set: function set(content) {
	            setHTMLElement(scrollElement, content);
	        }
	    });
	}

	function ForceRepaint(view) {
	    var scroll = view.scroll;
	    var forceRepaintElement = doc.createElement('div');
	    forceRepaintElement.className = 'force-repaint';
	    forceRepaintElement.style.cssText = 'position: absolute; top: 0; left: 0; width: 0; height: 0; font-size: 0; opacity: 1;';
	    view.root.appendChild(forceRepaintElement);

	    var enable = false;
	    Object.defineProperty(this, 'enable', {
	        get: function get() {
	            return enable;
	        },
	        set: function set(v) {
	            enable = v;
	        }
	    }, false);

	    Object.defineProperty(this, 'element', {
	        value: forceRepaintElement
	    });

	    scroll.addScrollingHandler(function () {
	        if (!enable) return;
	        forceRepaintElement.style.opacity = Math.abs(parseInt(forceRepaintElement.style.opacity) - 1) + '';
	    });
	}

	function Fixed(view) {
	    var that = this;
	    var scroll = view.scroll;
	    var fragment = doc.createDocumentFragment();
	    var topFixedElement;
	    var bottomFixedElement;
	    var leftFixedElement;
	    var rightFixedElement;

	    var enable = false;
	    Object.defineProperty(that, 'enable', {
	        get: function get() {
	            return enable;
	        },
	        set: function set(v) {
	            enable = v;
	            if (!!enable) {
	                if (topFixedElement) {
	                    if (!topFixedElement.parentNode) {
	                        view.root.insertBefore(topFixedElement, view.scrollWrap);
	                    }
	                    topFixedElement.style.display = 'block';
	                }
	                if (bottomFixedElement) {
	                    if (!bottomFixedElement.parentNode) {
	                        view.root.appendChild(bottomFixedElement);
	                    }
	                    bottomFixedElement.style.display = 'block';
	                }
	                if (leftFixedElement) {
	                    if (!leftFixedElement.parentNode) {
	                        view.root.insertBefore(leftFixedElement, view.scrollWrap);
	                    }
	                    leftFixedElement.style.display = 'block';
	                }
	                if (rightFixedElement) {
	                    if (!rightFixedElement.parentNode) {
	                        view.root.appendChild(rightFixedElement);
	                    }
	                    rightFixedElement.style.display = 'block';
	                }
	            } else {
	                topFiexElement && (topFixedElement.style.display = 'none');
	                bottomFixedElement && (bottomFixedElement.style.display = 'none');
	                leftFixedElement && (leftFixedElement.style.display = 'none');
	                rightFixedElement && (rightFixedElement.style.display = 'none');
	            }
	        }
	    });

	    if (scroll.axis === 'y') {
	        topFixedElement = doc.createElement('div');
	        topFixedElement.className = 'top-fixed';
	        topFixedElement.style.cssText = 'left: 0; top: 0; width: 100%;';
	        Object.defineProperty(that, 'topElement', {
	            get: function get() {
	                return topFixedElement;
	            },
	            set: function set(v) {
	                setHTMLElement(topFixedElement, v);
	            }
	        });
	        Object.defineProperty(that, 'topOffset', {
	            set: function set(v) {
	                topFixedElement.style.top = v + 'px';
	            }
	        });

	        bottomFixedElement = this.bottomFixedElement = doc.createElement('div');
	        bottomFixedElement.className = 'bottom-fxied';
	        bottomFixedElement.style.cssText = 'left: 0; bottom: 0; width: 100%;';
	        Object.defineProperty(that, 'bottomElement', {
	            get: function get() {
	                return bottomFixedElement;
	            },
	            set: function set(v) {
	                setHTMLElement(bottomFixedElement, v);
	            }
	        });
	        Object.defineProperty(that, 'bottomOffset', {
	            set: function set(v) {
	                bottomFixedElement.style.top = v + 'px';
	            }
	        });
	    } else {
	        leftFixedElement = this.leftFixedElement = doc.createElement('div');
	        leftFixedElement.className = 'left-fixed';
	        leftFixedElement.style.cssText = 'top: 0; left: 0; height: 100%;';
	        Object.defineProperty(that, 'leftElement', {
	            get: function get() {
	                return leftFixedElement;
	            },
	            set: function set(v) {
	                setHTMLElement(leftFixedElement, v);
	            }
	        });
	        Object.defineProperty(that, 'leftOffset', {
	            set: function set(v) {
	                leftFixedElement.style.left = v + 'px';
	            }
	        });

	        rightFixedElement = this.rightFixedElement = doc.createElement('div');
	        rightFixedElement.className = 'right-fxied';
	        rightFixedElement.style.cssText = 'top: 0; right: 0; height: 100%;';
	        Object.defineProperty(that, 'rightElement', {
	            get: function get() {
	                return rightFixedElement;
	            },
	            set: function set(v) {
	                setHTMLElement(rightFixedElement, v);
	            }
	        });
	        Object.defineProperty(that, 'rightOffset', {
	            set: function set(v) {
	                rightFixedElement.style.right = v + 'px';
	            }
	        });
	    }
	}

	function Lazyload(view) {
	    var that = this;
	    var scroll = view.scroll;
	    var limit = 4;
	    var waitingQueue = [];
	    var loadingCount = 0;
	    var loaded = {};

	    var isRunningLoadingQueue = false;
	    function runLoadingQueue() {
	        if (isRunningLoadingQueue) return;
	        isRunningLoadingQueue = true;

	        if (loadingCount < limit && waitingQueue.length > 0) {
	            var url = waitingQueue.shift();
	            loadingCount++;

	            var img = new Image();
	            img.onload = img.onreadystatechange = function () {
	                if (loaded[url] !== true) {
	                    loaded[url].forEach(function (cb) {
	                        cb && cb(url);
	                    });
	                    loaded[url] = true;
	                    loadingCount--;
	                }
	                runLoadingQueue();
	            };
	            img.src = url;
	            runLoadingQueue();
	        }

	        isRunningLoadingQueue = false;
	    }

	    function load(url, callback) {
	        if (loaded[url] === true) {
	            return callback(url);
	        } else if (loaded[url]) {
	            loaded[url].push(callback);
	        } else {
	            loaded[url] = [callback];
	            waitingQueue.push(url);
	        }
	        runLoadingQueue();
	    }

	    function checkLazyload() {
	        if (!enable) return;

	        var elements = Array.prototype.slice.call(scroll.element.querySelectorAll('.lazy, *[lazyload="true"]'));

	        elements.filter(function (el) {
	            return scroll.isInView(el);
	        }).forEach(function (el) {
	            var imglist;
	            var bglist;

	            if (el.tagName.toUpperCase() === 'IMG') {
	                imglist = [el];
	                bglist = [];
	            } else {
	                imglist = Array.prototype.slice.call(el.querySelectorAll('img[data-src]'));
	                bglist = Array.prototype.slice.call(el.querySelectorAll('*[data-image]'));
	                if (el.hasAttribute('data-image')) {
	                    bglist.push(el);
	                }
	            }

	            imglist.forEach(function (img) {
	                var src = img.getAttribute('data-src');
	                if (src) {
	                    img.removeAttribute('data-src');
	                    load(src, function () {
	                        img.src = src;
	                    });
	                }
	            });

	            bglist.forEach(function (bg) {
	                var image = bg.getAttribute('data-image');
	                if (image) {
	                    bg.removeAttribute('data-image');
	                    load(image, function () {
	                        bg.style.backgroundImage = 'url(' + image + ')';
	                    });
	                }
	            });

	            lazyloadHandler && lazyloadHandler(el);
	            el.className = el.className.split(' ').filter(function (name) {
	                return name !== 'lazy';
	            }).join(' ');
	            el.removeAttribute('lazyload');
	        });
	    }

	    var enable;
	    Object.defineProperty(that, 'enable', {
	        get: function get() {
	            return enable;
	        },
	        set: function set(v) {
	            enable = v;
	        }
	    });

	    var lazyloadHandler;
	    Object.defineProperty(that, 'handler', {
	        get: function get() {
	            return lazyloadHandler;
	        },
	        set: function set(v) {
	            lazyloadHandler = v;
	        }
	    });

	    var realtime;
	    Object.defineProperty(that, 'realtime', {
	        get: function get() {
	            return realtime;
	        },
	        set: function set(v) {
	            realtime = !!v;
	            if (realtime) {
	                view.forceRepaint.enable = true;
	            }
	        }
	    });

	    scroll.addScrollingHandler(function () {
	        if (realtime) {
	            checkLazyload();
	        }
	    });

	    scroll.addScrollendHandler(function () {
	        checkLazyload();
	    });

	    scroll.addContentrenfreshHandler(function () {
	        checkLazyload();
	    });

	    animation.requestFrame(function () {
	        checkLazyload();
	    });

	    view.checkLazyload = checkLazyload;
	}

	function Sticky(view) {
	    var that = this;
	    var scroll = view.scroll;

	    var stickyWrapElement = doc.createElement('div');
	    stickyWrapElement.className = 'sticky';
	    stickyWrapElement.style.cssText = 'z-index:9; position: absolute; left: 0; top: 0;' + cssPrefix + 'transform: translateZ(9px);';
	    if (scroll.axis === 'y') {
	        stickyWrapElement.style.width = '100%';
	    } else {
	        stickyWrapElement.style.height = '100%';
	    }

	    Object.defineProperty(this, 'offset', {
	        set: function set(v) {
	            if (scroll.axis === 'y') {
	                stickyWrapElement.style.top = v + 'px';
	            } else {
	                stickyWrapElement.style.left = v + 'px';
	            }
	        }
	    });

	    var enable;
	    Object.defineProperty(this, 'enable', {
	        get: function get() {
	            return enable;
	        },
	        set: function set(v) {
	            enable = !!v;
	            if (enable) {
	                if (!stickyWrapElement.parentNode) {
	                    scroll.viewport.appendChild(stickyWrapElement);
	                }
	                stickyWrapElement.style.display = 'block';
	            } else {
	                stickyWrapElement.style.display = 'none';
	            }
	        }
	    });

	    var stickyList = [];

	    function checkSticky() {
	        if (!enable) return;

	        Array.prototype.slice.call(scroll.element.querySelectorAll('.sticky, *[sticky="true"]')).forEach(function (el) {
	            el.className = el.className.split(' ').filter(function (name) {
	                return name !== 'sticky';
	            }).join(' ');
	            el.setAttribute('sticky', 'initialized');
	            var offset = scroll.offset(el);
	            var top = offset.top;
	            for (var i = 0; i <= stickyList.length; i++) {
	                if (!stickyList[i] || top < stickyList[i].top) {
	                    stickyList.splice(i, 0, {
	                        top: top,
	                        el: el,
	                        pined: el.firstElementChild
	                    });
	                    break;
	                }
	            }
	        });

	        if (stickyList.length) {
	            var scrollOffset = scroll.axis === 'y' ? scroll.getScrollTop() : scroll.getScrollLeft();
	            for (var i = 0; i < stickyList.length; i++) {
	                if (scrollOffset < stickyList[i][scroll.axis === 'y' ? 'top' : 'left']) {
	                    break;
	                }
	            }

	            j = i - 1;
	            if (j > -1) {
	                if (!stickyList[j].pined.parentNode || stickyList[j].pined.parentNode === stickyList[j].el) {
	                    stickyWrapElement.innerHTML = '';
	                    stickyWrapElement.appendChild(stickyList[j].pined);
	                }
	            }

	            for (j++; j < stickyList.length; j++) {
	                if (stickyList[j].pined.parentNode !== stickyList[j].el) {
	                    stickyList[j].el.appendChild(stickyList[j].pined);
	                }
	            }
	        }
	    }

	    view.forceRepaint.enable = true;
	    scroll.addScrollingHandler(checkSticky);
	    scroll.addScrollendHandler(checkSticky);

	    view.checkSticky = checkSticky;
	}

	function Refresh(view) {
	    var that = this;
	    var scroll = view.scroll;

	    var refreshElement = doc.createElement('div');
	    refreshElement.className = 'refresh';
	    refreshElement.style.cssText = 'display: none; position: absolute; top: 0; left: 0; width: 0; height: 0; ' + cssPrefix + 'transform: translateZ(9px)';
	    if (scroll.axis === 'y') {
	        refreshElement.style.width = '100%';
	    } else {
	        refreshElement.style.height = '100%';
	    }

	    var enable = false;
	    Object.defineProperty(this, 'enable', {
	        get: function get() {
	            return enable;
	        },
	        set: function set(v) {
	            enable = v;
	            if (!!enable) {
	                if (!refreshElement.parentNode) {
	                    scroll.viewport.appendChild(refreshElement);
	                }
	                refreshElement.style.display = 'block';
	            } else {
	                refreshElement.style.display = 'none';
	            }
	        }
	    });

	    Object.defineProperty(this, 'element', {
	        get: function get() {
	            return refreshElement;
	        },
	        set: function set(v) {
	            setHTMLElement(refreshElement, v);
	        }
	    });

	    Object.defineProperty(this, 'offset', {
	        set: function set(v) {
	            if (scroll.axis === 'y') {
	                refreshElement.style.top = v + 'px';
	            } else {
	                refreshElement.style.left = v + 'px';
	            }
	        }
	    });

	    var width = 0;
	    Object.defineProperty(this, 'width', {
	        set: function set(v) {
	            width = v;
	            if (scroll.axis === 'x') {
	                refreshElement.style.width = width + 'px';
	                refreshElement.style[stylePrefix + 'Transform'] = 'translateX(' + -width + 'px) translateZ(9px)';
	            }
	        }
	    });

	    var height = 0;
	    Object.defineProperty(this, 'height', {
	        set: function set(v) {
	            height = v;
	            if (scroll.axis === 'y') {
	                refreshElement.style.height = height + 'px';
	                refreshElement.style[stylePrefix + 'Transform'] = 'translateY(' + -height + 'px) translateZ(9px)';
	            }
	        }
	    });

	    var processingHandler;
	    Object.defineProperty(this, 'processingHandler', {
	        get: function get() {
	            return processingHandler;
	        },
	        set: function set(v) {
	            processingHandler = v;
	        }
	    });

	    var refreshHandler;
	    Object.defineProperty(this, 'refreshHandler', {
	        get: function get() {
	            return refreshHandler;
	        },
	        set: function set(v) {
	            refreshHandler = v;
	        }
	    });

	    var isRefresh;

	    scroll.addScrollingHandler(function (e) {
	        if (!enable || isRefresh) return;

	        var offset = scroll.axis === 'y' ? scroll.getScrollTop() : scroll.getScrollLeft();
	        offset = Math.min(offset, 0);

	        if (scroll.axis === 'y') {
	            refreshElement.style[stylePrefix + 'Transform'] = 'translateY(' + -(height + offset) + 'px) translateZ(9px)';
	        } else {
	            refreshElement.style[stylePrefix + 'Transform'] = 'translateX(' + -(width + offset) + 'px) translateZ(9px)';
	        }

	        if (offset < 0) {
	            processingHandler && processingHandler(-offset);
	        }
	    });

	    function pullingAnimation(callback) {
	        var refreshOffset = getTransformOffset(refreshElement)[scroll.axis];
	        var refreshDiff = 0 - refreshOffset;
	        var elementOffset = getTransformOffset(scroll.element)[scroll.axis];
	        var elementDiff = (scroll.axis === 'y' ? height : width) - elementOffset;

	        var anim = new animation(400, cubicbezier.ease, 0, function (i1, i2) {
	            refreshElement.style[stylePrefix + 'Transform'] = 'translate' + scroll.axis.toUpperCase() + '(' + (refreshOffset + refreshDiff * i2) + 'px) translateZ(9px)';
	            scroll.element.style[stylePrefix + 'Transform'] = 'translate' + scroll.axis.toUpperCase() + '(' + (elementOffset + elementDiff * i2) + 'px)';
	        });

	        anim.onend(callback);

	        anim.play();
	    }

	    function reboundAnimation(callback) {
	        var refreshOffset = getTransformOffset(refreshElement)[scroll.axis];
	        var refreshDiff = -(scroll.axis === 'y' ? height : width) - refreshOffset;
	        var elementOffset = getTransformOffset(scroll.element)[scroll.axis];
	        var elementDiff = -elementOffset;

	        var anim = new animation(400, cubicbezier.ease, 0, function (i1, i2) {
	            refreshElement.style[stylePrefix + 'Transform'] = 'translate' + scroll.axis.toUpperCase() + '(' + (refreshOffset + refreshDiff * i2) + 'px) translateZ(9px)';
	            scroll.element.style[stylePrefix + 'Transform'] = 'translate' + scroll.axis.toUpperCase() + '(' + (elementOffset + elementDiff * i2) + 'px)';
	        });

	        anim.onend(callback);

	        anim.play();
	    }

	    scroll.addEventListener('pulldownend', function (e) {
	        if (!enable || isRefresh) return;
	        isRefresh = true;

	        var offset = scroll.getBoundaryOffset();
	        if (offset > (scroll.axis === 'y' ? height : width)) {
	            scroll.disable();
	            pullingAnimation(function () {
	                if (refreshHandler) {
	                    refreshHandler(function () {
	                        reboundAnimation(function () {
	                            scroll.refresh();
	                            scroll.enable();
	                            isRefresh = false;
	                        });
	                    });
	                } else {
	                    reboundAnimation(function () {
	                        scroll.refresh();
	                        scroll.enable();
	                        isRefresh = false;
	                    });
	                }
	            });
	        } else {
	            reboundAnimation(function () {
	                isRefresh = false;
	            });
	        }
	    }, false);
	}

	function Update(view) {
	    var that = this;
	    var scroll = view.scroll;

	    var updateElement = doc.createElement('div');
	    updateElement.className = 'update';
	    updateElement.style.cssText = 'display: none; position: absolute; bottom: 0; right: 0; width: 0; height: 0; ' + cssPrefix + 'transform: translateZ(9px)';
	    if (scroll.axis === 'y') {
	        updateElement.style.width = '100%';
	    } else {
	        updateElement.style.height = '100%';
	    }

	    var enable = false;
	    Object.defineProperty(this, 'enable', {
	        get: function get() {
	            return enable;
	        },
	        set: function set(v) {
	            enable = v;
	            if (!!enable) {
	                if (!updateElement.parentNode) {
	                    scroll.viewport.appendChild(updateElement);
	                }
	                updateElement.style.display = 'block';
	            } else {
	                updateElement.style.display = 'none';
	            }
	        }
	    });

	    Object.defineProperty(this, 'element', {
	        get: function get() {
	            return updateElement;
	        },
	        set: function set(v) {
	            setHTMLElement(updateElement, v);
	        }
	    });

	    Object.defineProperty(this, 'offset', {
	        set: function set(v) {
	            if (scroll.axis === 'y') {
	                updateElement.style.bottom = v + 'px';
	            } else {
	                updateElement.style.right = v + 'px';
	            }
	        }
	    });

	    var width = 0;
	    Object.defineProperty(this, 'width', {
	        set: function set(v) {
	            width = v;
	            if (scroll.axis === 'x') {
	                updateElement.style.width = width + 'px';
	                updateElement.style[stylePrefix + 'Transform'] = 'translateX(' + width + 'px) translateZ(9px)';
	            }
	        }
	    });

	    var height = 0;
	    Object.defineProperty(this, 'height', {
	        set: function set(v) {
	            height = v;
	            if (scroll.axis === 'y') {
	                updateElement.style.height = height + 'px';
	                updateElement.style[stylePrefix + 'Transform'] = 'translateY(' + height + 'px) translateZ(9px)';
	            }
	        }
	    });

	    var processingHandler;
	    Object.defineProperty(this, 'processingHandler', {
	        get: function get() {
	            return processingHandler;
	        },
	        set: function set(v) {
	            processingHandler = v;
	        }
	    });

	    var updateHandler;
	    Object.defineProperty(this, 'updateHandler', {
	        get: function get() {
	            return updateHandler;
	        },
	        set: function set(v) {
	            updateHandler = v;
	        }
	    });

	    var isUpdating;
	    scroll.addScrollingHandler(function (e) {
	        if (!enable) return;

	        var offset = scroll.axis === 'y' ? scroll.getScrollTop() : scroll.getScrollLeft();
	        var maxOffset = scroll.axis === 'y' ? scroll.getMaxScrollTop() : scroll.getMaxScrollLeft();
	        offset = Math.max(offset, maxOffset);

	        if (scroll.axis === 'y') {
	            updateElement.style[stylePrefix + 'Transform'] = 'translateY(' + (maxOffset - offset + height) + 'px) translateZ(9px)';
	        } else {
	            updateElement.style[stylePrefix + 'Transform'] = 'translateX(' + (maxOffset - offset + width) + 'px) translateZ(9px)';
	        }

	        if (isUpdating) return;

	        if (offset - maxOffset < (scroll.axis === 'y' ? height : width) * 0.7) {
	            processingHandler && processingHandler(offset - maxOffset);
	        } else {
	            if (updateHandler) {
	                isUpdating = true;
	                updateHandler(function () {
	                    if (scroll.axis === 'y') {
	                        updateElement.style[stylePrefix + 'Transform'] = 'translateY(' + height + 'px) translateZ(9px)';
	                    } else {
	                        updateElement.style[stylePrefix + 'Transform'] = 'translateX(' + width + 'px) translateZ(9px)';
	                    }
	                    scroll.refresh();
	                    isUpdating = false;
	                });
	            }
	        }
	    });
	}
	module.exports = ScrollView;

/***/ },

/***/ 226:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"arrow":"refreshloading__arrow___2JjZb","down":"refreshloading__down___18oJb","up":"refreshloading__up___3Wqw-","text":"refreshloading__text___1dGxY"};

/***/ },

/***/ 227:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"scroll-view":"scrollview__scroll-view___216JS"};

/***/ },

/***/ 344:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _factory = __webpack_require__(11);

	var _factory2 = _interopRequireDefault(_factory);

	var _pageview = __webpack_require__(46);

	var _pageview2 = _interopRequireDefault(_pageview);

	var _scrollview = __webpack_require__(224);

	var _scrollview2 = _interopRequireDefault(_scrollview);

	var _underscore = __webpack_require__(187);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _listTpl = __webpack_require__(384);

	var _listTpl2 = _interopRequireDefault(_listTpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(372);
	_factory2.default.create('carport.list', function () {
	  var scrollView;
	  var pageIndex = 1;
	  var dataCache = {};
	  var plugin = lib.util.init({
	    toast: {
	      duration: 3000
	    },
	    dialog: {
	      title: '提示',
	      content: '恭喜成功了',
	      buttons: [{
	        display: "确定",
	        action: function action() {
	          this.hide();
	        }
	      }, {
	        display: '取消',
	        action: function action() {
	          this.hide();
	        }
	      }]
	    }
	  });
	  //初始化滚动组件
	  function _initScroller(opts) {
	    var stylePrefix = 'webkit';
	    scrollView = new _scrollview2.default({
	      useFrameAnimation: true,
	      useElementRect: true
	    });
	    // 懒加载的用法
	    scrollView.lazyload.realtime = true;
	    scrollView.lazyload.handler = function (el) {
	      el.style[stylePrefix + 'Transition'] = 'background-color 1.5s ease 0, color 1.5s ease-out 0, border-bottom-color 1.5s ease-in 0';
	      //el.style.backgroundColor = '#A8BD04';
	      el.style.color = '#FFF';
	      el.style.borderBottomColor = '#EEE';
	    };
	    scrollView.lazyload.enable = true;
	    scrollView.lazyload.realtime = true;
	    scrollView.lazyload.handler = function (el) {
	      el.style[stylePrefix + 'Transition'] = 'background-color 1.5s ease 0, color 1.5s ease-out 0, border-bottom-color 1.5s ease-in 0';
	      //el.style.backgroundColor = '#A8BD04';
	      el.style.color = '#FFF';
	      el.style.borderBottomColor = '#EEE';
	    };
	    scrollView.lazyload.enable = true;
	    // 吸顶的用法
	    scrollView.sticky.enable = true;
	    // 如果要用下拉刷新，请去掉下面的注释
	    scrollView.pullRefresh.handler = function (done) {
	      pageIndex = 1;
	      var params = opts.beforeAjax() || {};
	      params.pageSize = opts.pageSize;
	      params.pageIndex = pageIndex;
	      _makeAjax(opts.api, params, opts.containerEl, function (data, pages, container, isEmpty, emptyInfo) {
	        renderData(data, pages, container, isEmpty, emptyInfo);
	        scrollView.pullUpdate.enable = true;
	        done();
	      });
	    };
	    scrollView.pullRefresh.enable = true;
	    scrollView.pullUpdate.handler = function (done) {
	      pageIndex += 1;
	      var params = opts.beforeAjax() || {};
	      params.pageSize = opts.pageSize;
	      params.pageIndex = pageIndex;
	      _makeAjax(opts.api, params, opts.containerEl, function (data, pages, container, isEmpty, emptyInfo) {

	        if (pages.totalPages == pages.currentPage) {
	          var div = document.createElement('div');
	          div.className = "empty";
	          div.innerHTML = '<center>没有数据了</center>';
	          renderData(data, pages, container, false, div);
	          scrollView.pullUpdate.enable = false;
	        } else {
	          renderData(data, pages, container, false, null);
	        }
	        done();
	      });
	    };
	    scrollView.pullUpdate.enable = true;

	    scrollView.content = document.querySelector(opts.containerEl);
	    document.body.appendChild(scrollView.root);
	    scrollView.init();
	    return scrollView;
	  }
	  function _getKey(item) {
	    return item.parkNo + '-' + item.preType;
	  }
	  function _makeAjax(api, data, container, cb) {
	    plugin.Loading.show();
	    $.ajax({
	      url: api,
	      dataType: "json",
	      type: "post",
	      data: data,
	      success: function success(data) {
	        if (data.isOk) {
	          var pages = data.data.pages;
	          var carports = data.data.parks;
	          if (carports.length > 0) {
	            _underscore2.default.each(carports, function (item) {
	              var key = _getKey(item);
	              dataCache[key] = item;
	            });
	            cb(carports, pages, container, true, null);
	          } else {
	            cb([], {}, container, true, '暂无数据');
	          }
	        } else {
	          cb([], {}, container, true, '暂无数据');
	        }
	      }
	    });
	  }
	  function renderData(data, pages, container, isEmpty, emptyInfo) {
	    var $container = $(container);
	    if (isEmpty) {
	      $(container).empty();
	    }

	    var templateHtml = (0, _listTpl2.default)({
	      data: data
	    });

	    if (emptyInfo) {
	      $container.append(emptyInfo);
	    } else {
	      $container.append(templateHtml);
	    }
	    scrollView.refresh();
	    plugin.Loading.hide();
	  }

	  function _initData(opts) {
	    var params = opts.beforeAjax() || {};
	    params.pageSize = opts.pageSize;
	    params.pageIndex = pageIndex;
	    _makeAjax(opts.api, params, opts.containerEl, renderData);
	  }

	  function _bindEvent(opts) {
	    $(opts.containerEl).delegate('.carport-item', 'click', function (e) {
	      var parkNo = $(this).data('parkno');
	      var preType = $(this).data('pretype');
	      var key = _getKey({
	        parkNo: parkNo,
	        preType: preType
	      });
	      var parkInfo = dataCache[key];
	      opts.onClick && opts.onClick(parkInfo);
	    });
	  }

	  return {
	    init: function init(opts) {
	      this.opts = opts;
	      pageIndex = opts.pageIndex || 1;
	      _initScroller(opts);
	      _initData(opts);
	      _bindEvent(opts);
	    }
	  };
	});

/***/ },

/***/ 372:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 384:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "	<li class=\"carport-item\" data-parkno=\""
	    + alias4(((helper = (helper = helpers.parkNo || (depth0 != null ? depth0.parkNo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parkNo","hash":{},"data":data}) : helper)))
	    + "\" data-pretype=\""
	    + alias4(((helper = (helper = helpers.preType || (depth0 != null ? depth0.preType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"preType","hash":{},"data":data}) : helper)))
	    + "\" data-id=\""
	    + alias4(((helper = (helper = helpers.parkId || (depth0 != null ? depth0.parkId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parkId","hash":{},"data":data}) : helper)))
	    + "\">\r\n		<div class=\"carport-img\" lazyload=\"true\" data-image=\""
	    + alias4(((helper = (helper = helpers.parkPic || (depth0 != null ? depth0.parkPic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parkPic","hash":{},"data":data}) : helper)))
	    + "\">\r\n		</div>\r\n		<div class=\"carport-wrap\">\r\n			<h3>"
	    + alias4(((helper = (helper = helpers.parkName || (depth0 != null ? depth0.parkName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parkName","hash":{},"data":data}) : helper)))
	    + "</h3>\r\n			<div class=\"carport-info\">\r\n				<span class=\"carport-type\">"
	    + alias4(((helper = (helper = helpers.preTypeName || (depth0 != null ? depth0.preTypeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"preTypeName","hash":{},"data":data}) : helper)))
	    + "</span>\r\n				<span class=\"carport-num\">空位"
	    + alias4(((helper = (helper = helpers.voidNum || (depth0 != null ? depth0.voidNum : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"voidNum","hash":{},"data":data}) : helper)))
	    + "</span>\r\n			</div>\r\n			<div class=\"carport-desc\">\r\n				"
	    + alias4(((helper = (helper = helpers.feeDesc || (depth0 != null ? depth0.feeDesc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"feeDesc","hash":{},"data":data}) : helper)))
	    + "\r\n			</div>\r\n			<div class=\"carport-desc2\">\r\n				"
	    + alias4(((helper = (helper = helpers.notes || (depth0 != null ? depth0.notes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"notes","hash":{},"data":data}) : helper)))
	    + "\r\n			</div>\r\n		</div>\r\n	</li>\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "<ul class=\"carport-list\">\r\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</ul>";
	},"useData":true});

/***/ }

/******/ });