/**
 * @name : TEST
 * @version : v0.0.0
 * @author : 
 */
'use strict';

if (!window.nc) window.nc = {};
if (!nc.PROJECT_NAME) nc.PROJECT_NAME = {};

(function ($) {
	'use strict';

	nc.PROJECT_NAME.util = {};

	var isDefined = function isDefined(obj) {
		var flag = true;
		if (obj === null || typeof obj === 'undefined') return false;
		return flag;
	};

	var trim = function trim(str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	};

	var getParseTmplObj = function getParseTmplObj(tmplStr) {
		var obj = {},
		    splitArr = tmplStr.split('{{{');

		var str, arr;
		for (var i = 0, max = splitArr.length; i < max; i++) {
			str = splitArr[i];
			if (str !== '') {
				arr = str.split('}}}');
				obj[nc.PROJECT_NAME.util.trim(arr[0])] = nc.PROJECT_NAME.util.trim(arr[1]);
			}
		}
		return obj;
	};

	var parseStrPropertiesToInt = function parseStrPropertiesToInt(_obj) {
		var obj = $.extend({}, _obj);
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				obj[key] = parseInt(obj[key], 10);
			}
		}
		return obj;
	};

	nc.PROJECT_NAME.util.isDefined = isDefined;
	nc.PROJECT_NAME.util.trim = trim;
	nc.PROJECT_NAME.util.getParseTmplObj = getParseTmplObj;
	nc.PROJECT_NAME.util.parseStrPropertiesToInt = parseStrPropertiesToInt;
})(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['Hello ', ' world ', ''], ['Hello ', ' world ', '']);

var _math = require('./lib/math');

var math = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require('./utils');
console.log('utils.multi(10, 10) :', utils.multi(10, 10));

/*
 * import
 */

console.log('import :', math.sum(math.pi, math.pi));

/*
 * block scope
 */

{
	var a = 10;
	var _b = 20;
	var tmp = a;
	a = _b;

	console.log('tmp :', tmp);
	console.log('b :', _b);

	console.log('a :', a);
}

/*
 * Arrows
 */
var evens = [2, 4, 6, 8, 10];
var odds = evens.map(function (v) {
	return v + 1;
});
console.log('odds :', odds);

var nums = evens.map(function (v, i) {
	return v + i;
});
console.log('nums :', nums);

var fives = [];
nums.forEach(function (v) {
	if (v % 5 === 0) fives.push(v);
});
console.log('fives :', fives);

/*
 * Class
 */

var Character = function () {
	function Character(name, job) {
		_classCallCheck(this, Character);

		this._name = name;
		this.job = job;
	}

	_createClass(Character, [{
		key: 'read',


		// public functions
		value: function read(bookTitle) {
			console.log('Character read this book :', bookTitle);
		}
	}, {
		key: 'name',
		get: function get() {
			return this._name;
		},
		set: function set(str) {
			this._name = str;
		}
	}]);

	return Character;
}();

var Boy = function (_Character) {
	_inherits(Boy, _Character);

	function Boy(name, job, country) {
		_classCallCheck(this, Boy);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Boy).call(this, name, job));

		_this.country = country;
		return _this;
	}

	// override public function


	_createClass(Boy, [{
		key: 'read',
		value: function read(bookTitle, writer) {
			_get(Object.getPrototypeOf(Boy.prototype), 'read', this).call(this, bookTitle);
			console.log('this book has written by this writer :', writer, this.country);
		}
	}]);

	return Boy;
}(Character);

var character = new Character('vuild', 'programmer');
character.read('hello world');
console.log('character.name :', character.name);

var boy = new Boy('dragmove', 'front-end developer', 'korea');
boy.read('hi extended boy', 'kim hyun seok');
console.log('boy.name :', boy.name);

/*
 * template strings
 */
{
	var tag = function tag(strings) {
		console.log(strings[0]); // Hello
		console.log(strings[1]); //  world
		console.log(arguments.length <= 1 ? undefined : arguments[1]); // a + b = 15
		console.log(arguments.length <= 2 ? undefined : arguments[2]); // a * b = 50
	};

	var name = 'Bob',
	    time = 'today';
	var tpl = 'Hello ' + name + ', how are you ' + time + '?';
	console.log('tpl :', tpl);

	var a = 5,
	    b = 10;

	tag(_templateObject, a + b, a * b);
}

/*
 * multiline console
 */
console.log('Hello,\nboy?');

/*
 * Default + Rest + Spread
 */
{
	var f1 = function f1(x) {
		var y = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];

		return x + y;
	};

	var f2 = function f2(x) {
		return x * (arguments.length - 1);
	};

	var f3 = function f3(x, y, z) {
		return x + y + z;
	};

	console.log('f1(3) === 15 :', f1(3) === 15);

	console.log(f2(3, 'hello', true) === 6);

	console.log(f3.apply(undefined, [1, 2, 3]) === 6);
}

/*
 * Iterator
 */
{
	var arr = ['a', 'b', 'c'];
	var iter = arr[Symbol.iterator]();

	console.log(iter.next()); // {value: 'a', done: false}
	console.log(iter.next()); // {value: 'b', done: false}
	console.log(iter.next()); // {value: 'c', done: false}
	console.log(iter.next()); // {value: undefined, done: true}

	// Arrays
	var _arr = ['a', 'b'];
	for (var _i = 0; _i < _arr.length; _i++) {
		var x = _arr[_i];
		console.log(x);
	}

	// Strings
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = 'a🐊'[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _x2 = _step.value;

			console.log(_x2);
		}

		// Map
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var map = new Map().set('a', 1).set('b', 2);
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var pair = _step2.value;

			console.log(pair);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	console.log('map.size :', map.size);
	console.log('map.get("b") :', map.get("b"));

	// Set
	var set = new Set().add('a').add('b');
	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = set[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var _x3 = _step3.value;

			console.log(_x3);
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	console.log('set.size :', set.size);
	console.log('set.has("a") :', set.has("a"));

	// Array like
	var arrayLike = { length: 2, 0: 'a', 1: 'b' };
	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = Array.from(arrayLike)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var _x4 = _step4.value;

			console.log('Array.from :', _x4);
		}

		// make iterator
	} catch (err) {
		_didIteratorError4 = true;
		_iteratorError4 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion4 && _iterator4.return) {
				_iterator4.return();
			}
		} finally {
			if (_didIteratorError4) {
				throw _iteratorError4;
			}
		}
	}

	var _fibonacci = _defineProperty({}, Symbol.iterator, function () {
		var pre = 0,
		    cur = 1;
		return {
			next: function next() {
				var _ref = [cur, pre + cur];
				pre = _ref[0];
				cur = _ref[1];

				return { done: false, value: cur };
			}
		};
	});

	var _iteratorNormalCompletion5 = true;
	var _didIteratorError5 = false;
	var _iteratorError5 = undefined;

	try {
		for (var _iterator5 = _fibonacci[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
			var n = _step5.value;

			if (n > 1000) break;
			console.log(n);
		}
	} catch (err) {
		_didIteratorError5 = true;
		_iteratorError5 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion5 && _iterator5.return) {
				_iterator5.return();
			}
		} finally {
			if (_didIteratorError5) {
				throw _iteratorError5;
			}
		}
	}
}

/*
 * Generators
 */
var fibonacci = _defineProperty({}, Symbol.iterator, regeneratorRuntime.mark(function _callee() {
	var pre, cur, temp;
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					pre = 0, cur = 1;

				case 1:
					temp = pre;

					pre = cur;
					cur += temp;
					_context.next = 6;
					return cur;

				case 6:
					_context.next = 1;
					break;

				case 8:
				case 'end':
					return _context.stop();
			}
		}
	}, _callee, this);
}));

var _iteratorNormalCompletion6 = true;
var _didIteratorError6 = false;
var _iteratorError6 = undefined;

try {
	for (var _iterator6 = fibonacci[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
		var n = _step6.value;

		if (n > 1000) break;
		console.log(n);
	}

	/*
  * Symbols
  */
} catch (err) {
	_didIteratorError6 = true;
	_iteratorError6 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion6 && _iterator6.return) {
			_iterator6.return();
		}
	} finally {
		if (_didIteratorError6) {
			throw _iteratorError6;
		}
	}
}

(function () {
	var key = Symbol('key');

	function MyClass(privateData) {
		this[key] = privateData;
	}

	MyClass.prototype = {
		doStuff: function doStuff() {
			return this[key];
			// ... this[key]...
		}
	};

	console.log((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol');

	var c = new MyClass('hello');
	console.log(c[key]);
})();

/*
 * Math + Number + String
 */
console.log('Number.EPSILON :', Number.EPSILON);
console.log('Number.isInteger(1) :', Number.isInteger(1));
console.log('Number.isInteger(Infinity) :', Number.isInteger(Infinity));

console.log('abcde'.includes('cd')); // true
console.log('abc'.repeat(3)); // abcabcabc

console.log([0, 0, 0, 0].fill(7, 1)); // [0, 7, 7, 7]
console.log([1, 2, 3].findIndex(function (x) {
	return x == 2;
}));

var keys = ['a', 'b', 'c'].keys();
console.log('keys.next() :', keys.next());

var vals = ['a', 'b', 'c'].values();
console.log('vals.next() :', vals.next());

/*
 * Object.assign
 */
{
	var obj = { a: 1 };
	var copy = Object.assign({}, obj);
	console.log('copy :', copy);

	var o1 = { a: 1 },
	    o2 = { b: 2 },
	    o3 = { c: 3 };

	var obj = Object.assign(o1, o2, o3);
	console.log(obj);
	console.log(o1); // target Object itself is changed.
}

/*
 * Promises
 */
function timeout() {
	var duration = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	console.log('timeout duration :', duration);
	return new Promise(function (resolve, reject) {
		setTimeout(resolve, duration);
	});
}

var p = timeout(3000).then(function () {
	return timeout(2000);
}).then(function () {
	throw new Error("hmm");
}).catch(function (err) {
	return Promise.all([timeout(100), timeout(200)]);
});

/*
 * Reflect - http://qnimate.com/es6-reflect-api-tutorial/
 */
var obj = { name: 'super-mario' };
var name = Reflect.get(obj, 'name');
console.log(name);

Reflect.set(obj, 'name', 'mario');
console.log(obj.name);