"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Yamli =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Yamli, _React$Component);

  function Yamli() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Yamli);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Yamli)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      arabicOptions: [],
      selectedIndex: -1,
      searchText: ""
    });

    _defineProperty(_assertThisInitialized(_this), "textChanged", function () {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.searchText;

      _this.props.textUpdated(text);
    });

    _defineProperty(_assertThisInitialized(_this), "local",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(text) {
        var _ref2, data, response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].get("\n       https://api.yamli.com/transliterate.ashx?word=".concat(text, "&account_id=000006&prot=https%3A&hostname=www.yamli.com&path=%2Farabic-keyboard%2F&build=5515&sxhr_id=4\n    "), {
                  headers: {
                    Authorization: "Bearer " + _this.props.API_KEY,
                    "Content-Type": "application/json"
                  }
                });

              case 2:
                _ref2 = _context.sent;
                data = _ref2.data;
                response = JSON.parse(data.replace("if (typeof(Yamli) == 'object') {Yamli.I.SXHRData.dataCallback(", "").replace(");};", ""));
                response.data = JSON.parse(response.data);
                return _context.abrupt("return", _lodash["default"].map(_lodash["default"].split(_lodash["default"].get(response, "data.r"), "|"), function (r) {
                  return r.substring(0, _lodash["default"].size(r) - 2);
                }));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "arabic",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(text) {
        var arabicOptions;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_lodash["default"].size(text) < 1 || _this.containsArabic(text))) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", _this.setState({
                  arabicOptions: [],
                  toReplace: undefined
                }));

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return _this.local(text);

              case 5:
                arabicOptions = _context2.sent;

                //console.log(arabicOptions);
                _this.setState({
                  arabicOptions: arabicOptions,
                  toReplace: text
                });

                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](2);
                if (process.env.NODE_ENV !== "production") console.error(_context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 9]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "containsArabic", function (text) {
      return /[\u0600-\u06FF\u0750-\u077F\ufb50-\ufc3f\ufe70-\ufefc]/.test(text);
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      return _this.setState({
        searchText: "",
        arabicOptions: [],
        toReplace: undefined
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectWord", function (_ref4) {
      var _ref4$index = _ref4.index,
          index = _ref4$index === void 0 ? _this.state.selectedIndex : _ref4$index,
          _ref4$onFinish = _ref4.onFinish,
          onFinish = _ref4$onFinish === void 0 ? function () {} : _ref4$onFinish;
      if (!_lodash["default"].size(_this.state.arabicOptions)) return onFinish(_this.state.searchText);
      if (index < 0) index = 0;
      var newWord = _this.state.arabicOptions[index];

      var searchText = _this.state.searchText.replace(_this.state.toReplace, newWord).trim();

      _this.setState({
        arabicOptions: [],
        searchText: searchText,
        toReplace: undefined
      }, function () {
        _this.textChanged();

        onFinish(searchText);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "keyDown", function (_ref5) {
      var keyCode = _ref5.keyCode;

      switch (keyCode) {
        case 38:
          // ArrowDown
          _this.setState({
            selectedIndex: _this.state.selectedIndex === 0 ? 0 : _this.state.selectedIndex - 1
          });

          return;

        case 40:
          // ArrowUp
          if (_this.state.selectedIndex < _lodash["default"].size(_this.state.arabicOptions)) _this.setState({
            selectedIndex: _this.state.selectedIndex + 1
          });
          return;

        case 13:
          // Enter
          _this.selectWord({
            onFinish: function onFinish(text) {
              _this.props.onEnter(text);

              if (_this.props.clearOnEnter) _this.clear();
            }
          });

          return;

        case 32:
          // space
          _this.selectWord({
            onFinish: _this.props.onSpace
          });

          return;

        case 27:
          // Escape
          _this.setState({
            toReplace: "",
            arabicOptions: []
          });

      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (_ref6) {
      var target = _ref6.target;

      _this.setState({
        searchText: target.value,
        selectedIndex: 0
      }, function () {
        return _this.textChanged();
      });

      _this.arabic(_lodash["default"].last(_lodash["default"].split(target.value, " ")));
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (_ref7) {
      var target = _ref7.target;
      var selectionStart = target.selectionStart,
          selectionEnd = target.selectionEnd,
          value = target.value;
      if (selectionStart === selectionEnd && selectionStart > 0 && selectionStart < _lodash["default"].size(value)) _this.arabic(_this.findWordBySelection(value, selectionStart));
    });

    _defineProperty(_assertThisInitialized(_this), "findWordBySelection", function (word, selectionIndex) {
      var words = _lodash["default"].split(word.trim(), " ");

      var currentWord = 0;

      for (var i = 0; i < selectionIndex; i++) {
        var _char = word.trim().charAt(i);

        if (_char == " ") currentWord++;
      }

      return words[currentWord];
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return _react["default"].createElement("div", {
        className: "yamli"
      }, _react["default"].createElement("div", {
        className: ""
      }, _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("input", _extends({
        type: "text",
        className: "form-control",
        onChange: _this.handleChange,
        id: "textbox",
        value: _this.state.searchText,
        placeholder: _this.props.placeholder
      }, _this.props.otherInputProps, {
        onKeyDown: function onKeyDown(k) {
          return _this.keyDown(k) && _this.props.otherInputProps.keyDown(k);
        },
        onSelect: _this.onClick,
        ref: function ref(e) {
          return _this.inputField = e;
        },
        autoComplete: "none"
      }))), _react["default"].createElement("div", {
        className: "suggestions"
      }, _react["default"].createElement("ul", null, _lodash["default"].map(_this.state.arabicOptions, function (word, i) {
        return _react["default"].createElement("li", {
          className: _this.state.selectedIndex === i ? "selected" : "",
          onMouseOver: function onMouseOver() {
            return _this.setState({
              selectedIndex: i
            });
          },
          onClick: function onClick() {
            return _this.selectWord({
              index: i
            });
          },
          key: i
        }, word);
      }))), _this.props.showText && _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-md"
      }, _react["default"].createElement("h4", null, _this.state.searchText)))));
    });

    return _this;
  }

  return Yamli;
}(_react["default"].Component);

exports["default"] = Yamli;

_defineProperty(Yamli, "defaultProps", {
  textUpdated: function textUpdated() {},
  wordConverted: function wordConverted() {},
  onEnter: function onEnter() {},
  onSpace: function onSpace() {},
  API_KEY: ""
});