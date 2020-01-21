"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var Yamli =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Yamli, _React$Component);

  function Yamli() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Yamli);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Yamli)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      arabicOptions: [],
      selectedIndex: -1,
      searchText: ""
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "textChanged", function () {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.searchText;

      _this.props.textUpdated(text);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "local",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(text) {
        var _ref2, data, response;

        return _regenerator["default"].wrap(function _callee$(_context) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "arabic",
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(text) {
        var arabicOptions;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "containsArabic", function (text) {
      return /[\u0600-\u06FF\u0750-\u077F\ufb50-\ufc3f\ufe70-\ufefc]/.test(text);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "clear", function () {
      return _this.setState({
        searchText: "",
        arabicOptions: [],
        toReplace: undefined
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "selectWord", function (_ref4) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "keyDown", function (_ref5) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChange", function (_ref6) {
      var target = _ref6.target;

      _this.setState({
        searchText: target.value,
        selectedIndex: 0
      }, function () {
        return _this.textChanged();
      });

      _this.arabic(_lodash["default"].last(_lodash["default"].split(target.value, " ")));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClick", function (_ref7) {
      var target = _ref7.target;
      var selectionStart = target.selectionStart,
          selectionEnd = target.selectionEnd,
          value = target.value;
      if (selectionStart === selectionEnd && selectionStart > 0 && selectionStart < _lodash["default"].size(value)) _this.arabic(_this.findWordBySelection(value, selectionStart));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "findWordBySelection", function (word, selectionIndex) {
      var words = _lodash["default"].split(word.trim(), " ");

      var currentWord = 0;

      for (var i = 0; i < selectionIndex; i++) {
        var _char = word.trim().charAt(i);

        if (_char == " ") currentWord++;
      }

      return words[currentWord];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "render", function () {
      return _react["default"].createElement("div", {
        className: "yamli"
      }, _react["default"].createElement("div", {
        className: ""
      }, _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("input", (0, _extends2["default"])({
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
(0, _defineProperty2["default"])(Yamli, "defaultProps", {
  textUpdated: function textUpdated() {},
  wordConverted: function wordConverted() {},
  onEnter: function onEnter() {},
  onSpace: function onSpace() {},
  API_KEY: ""
});