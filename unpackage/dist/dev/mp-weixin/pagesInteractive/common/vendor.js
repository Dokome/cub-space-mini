(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesInteractive/common/vendor"],{

/***/ 147:
/*!*********************************************************************************!*\
  !*** C:/Users/Dokom/Desktop/cfkj/cub-space-mini/pagesInteractive/dataUpdate.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.__dataUpdate = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} // 加载数据
var __listDataAddHandle = function __listDataAddHandle(list, map) {
  // 请求新数据时清空列表
  list.forEach(function (item) {
    // 判断数据是否存在
    map.get(item.id) ? map.delete(item.id) : null;
    map.set(item.id, item);
  });
};

var __dataUpdate = {
  // 查询动态信息
  getNewsInfo: function getNewsInfo(options) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var data, result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _this.$http.request({
                  url: '/dynamicState/selectDynamicDetail',
                  method: 'POST',
                  data: {
                    dynamicId: options.id },

                  noToken: options.noToken }));case 2:data = _context.sent;

              result = data.data.data;
              _this.newsDetail = result;
              _this.currentTarget = result;
              _this.$forceUpdate();
              setTimeout(function () {
                _this.ifLoaddingShow = false;
              }, 800);case 8:case "end":return _context.stop();}}}, _callee);}))();
  },
  // 查询动态评论
  getNewComment: function getNewComment(options) {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var data, result;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:

              if (options.getNew) {
                _this2.currentPageNum = _this2.totalPage ? _this2.totalPage : 1;
              }if (!(

              _this2.currentPageNum > _this2.totalPage && !options.getNew)) {_context2.next = 4;break;}
              _this2.loadStatus = 'nomore';return _context2.abrupt("return");case 4:


              _this2.loadStatus = 'loading';_context2.next = 7;return (
                _this2.$http.request({
                  url: '/dynamicComment/selectCommentByDyIdAndPage',
                  method: 'POST',
                  data: {
                    pageNum: _this2.currentPageNum,
                    pageSize: 10,
                    parmas: {
                      dynamicId: options.id } },


                  noToken: options.noToken }));case 7:data = _context2.sent;


              result = data.data.data;
              if (data.data.code === 200) {
                _this2.currentPageNum++;
                _this2.totalPage = result.totalPage;
                _this2.dataTotalNum = result.total;
              }
              _this2.loadStatus = 'loadmore';
              if (_this2.totalPage === 0 || options.getNew || _this2.dataTotalNum < 10) {
                _this2.loadStatus = 'nomore';
              }

              __listDataAddHandle.call(_this2, result.list, _this2.newsCommentList);case 13:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  // 映射动态数据
  getNewsMapData: function getNewsMapData() {
    if (this.newsCommentList) {
      return _toConsumableArray(this.newsCommentList.values());
    }
  },
  // 请求更新数据
  scrollToBottom: function scrollToBottom() {
    this.getNewComment({ id: this.newsDetail.id, noToken: true, delay: 100 });
  } };exports.__dataUpdate = __dataUpdate;

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesInteractive/common/vendor.js.map