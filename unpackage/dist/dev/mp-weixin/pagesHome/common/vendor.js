(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesHome/common/vendor"],{

/***/ 118:
/*!************************************************************************!*\
  !*** C:/Users/Dokom/Desktop/cfkj/cub-space-mini/pagesHome/identify.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.__identify = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var __identify = {
  // 提交
  submit: function submit() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var isComplete, data;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              isComplete = [_this.realName, _this.phone, _this.vailid, _this.SID, _this.schoolId].every(function (item) {
                if (item.trim().length === 0) {
                  return false;
                }
                return true;
              });if (!
              isComplete) {_context.next = 9;break;}_context.next = 4;return (
                _this.$http.request({
                  url: '/umsConfirm/pushConfirm',
                  method: 'POST',
                  data: {
                    schoolId: _this.schoolId,
                    realName: _this.realName,
                    studentCode: _this.SID,
                    phone: _this.phone,
                    verificationCode: _this.vailid } }));case 4:data = _context.sent;if (!(


              data.data.code === 200)) {_context.next = 7;break;}return _context.abrupt("return",
              uni.reLaunch({
                url: '/pages/home/home' }));case 7:_context.next = 10;break;case 9:return _context.abrupt("return",



              uni.showToast({
                title: '请完善所有信息',
                icon: 'none' }));case 10:case "end":return _context.stop();}}}, _callee);}))();


  },
  // 学校更改
  confirm: function confirm(e) {
    this.school = e[0].label;
    this.schoolId = e[0].value;
  },
  // 获取认证状态
  getConfirmStatus: function getConfirmStatus() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var data, result;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _this2.$http.request({
                  url: '/umsAccount/getUserInfo',
                  method: 'GET' }));case 2:data = _context2.sent;

              result = data.data.data;
              _this2.confirmStatus = result.confirmStatus;
              setTimeout(function () {
                _this2.ifLoaddingShow = false;
              }, 500);case 6:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  // 发送验证码
  sendVerificationCode: function sendVerificationCode() {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var data;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:if (!
              _this3.vaildTimmer) {_context3.next = 2;break;}return _context3.abrupt("return");case 2:if (



              /^[1][3,4,5,7,8,9][0-9]{9}$/.test(_this3.phone)) {_context3.next = 4;break;}return _context3.abrupt("return",
              uni.showToast({
                title: '请填写正确的手机号',
                icon: 'none' }));case 4:_context3.next = 6;return (



                _this3.$http.request({
                  url: '/umsConfirm/sendVerificationCode',
                  method: 'POST',
                  data: {
                    phone: _this3.phone } }));case 6:data = _context3.sent;


              // 请求CD
              _this3.vaildTimmer = setInterval(function () {
                if (_this3.vaildTimeCount <= 1) {
                  clearTimeout(_this3.vaildTimmer);
                  _this3.vaildTimmer = null;
                  _this3.vaildTimeCount = 120;
                }
                _this3.vaildTimeCount--;
              }, 1000);case 8:case "end":return _context3.stop();}}}, _callee3);}))();
  },
  //获取所有的学校
  getAllSchool: function getAllSchool() {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var data, result, list;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                _this4.$http.request({
                  url: '/sysSchool/selectSchools',
                  method: 'GET' }));case 2:data = _context4.sent;

              result = data.data.data;
              list = result.map(function (_ref) {var id = _ref.id,name = _ref.name;
                return { value: id, label: name };
              });
              _this4.schoolList = list;case 6:case "end":return _context4.stop();}}}, _callee4);}))();
  } };exports.__identify = __identify;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 137:
/*!**********************************************************************!*\
  !*** C:/Users/Dokom/Desktop/cfkj/cub-space-mini/pagesHome/mynews.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.__mynews = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var __listDataAddHandle = function __listDataAddHandle(list, map) {
  // 请求新数据时清空列表
  list.forEach(function (item) {
    // 判断数据是否存在
    map.get(item.id) ? map.delete(item.id) : null;
    map.set(item.id, item);
  });
};

var __mynews = {
  // 动态数据映射
  getNewsMapData: function getNewsMapData() {
    if (this.newsDataList) {
      return _toConsumableArray(this.newsDataList.values());
    }
  },
  // 获取动态数据
  getMynewsData: function getMynewsData() {var _arguments = arguments,_this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options, data, result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {};if (!(
              _this.currentPageNum > _this.totalPage && !options.getNew)) {_context.next = 4;break;}
              _this.loadStatus = 'nomore';return _context.abrupt("return");case 4:


              _this.loadStatus = 'loading';_context.next = 7;return (
                _this.$http.request({
                  url: '/dynamicState/selectUmsDynamicList',
                  method: 'POST',
                  data: {
                    pageNum: _this.currentPageNum,
                    pageSize: 10,
                    parmas: {
                      userId: options.id } },


                  noToken: options.noToken }));case 7:data = _context.sent;


              result = data.data.data;
              if (data.data.code === 200) {
                _this.currentPageNum++;
                _this.totalPage = result.totalPage;
                _this.dataTotalNum = result.total;
              }

              _this.loadStatus = 'loadmore';
              if (_this.totalPage === 0 || options.getNew || _this.dataTotalNum < 10) {
                _this.loadStatus = 'nomore';
              }

              __listDataAddHandle.call(_this, result.list, _this.newsDataList);
              setTimeout(function () {
                _this.ifLoaddingShow = false;
              }, 500);case 14:case "end":return _context.stop();}}}, _callee);}))();
  },
  // 
  scrollToBottom: function scrollToBottom() {
    this.getMynewsData({ delay: 100, id: this.userId });
  },
  // 
  enterDetail: function enterDetail(id) {
    this.$api.routerHandle.goto("/pagesInteractive/newsdetail?id=".concat(id));
  },
  // 
  getUserInfo: function getUserInfo() {var _arguments2 = arguments,_this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var options, data;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:options = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {};_context2.next = 3;return (
                _this2.$http.request({
                  url: '/umsAccount/selectUmsHome',
                  method: 'POST',
                  data: {
                    userId: options.id } }));case 3:data = _context2.sent;


              _this2.userinfo = data.data.data;
              // 
              setTimeout(function () {
                _this2.ifLoaddingShow = false;
              }, 300);case 6:case "end":return _context2.stop();}}}, _callee2);}))();
  } };exports.__mynews = __mynews;

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesHome/common/vendor.js.map