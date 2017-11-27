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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65);


/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../common-modules/index\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _index2 = _interopRequireDefault(_index);

	var _module = __webpack_require__(66);

	var _module2 = _interopRequireDefault(_module);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by zajac on 09.01.2017.
	 */
	angular.module('academicms.admin', [_index2.default, _module2.default]);

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _adminMainTpl = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../main/template/admin-main.tpl.html\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _adminMainTpl2 = _interopRequireDefault(_adminMainTpl);

	var _AdminMainController = __webpack_require__(68);

	var _AdminMainController2 = _interopRequireDefault(_AdminMainController);

	var _AdminDashboardController = __webpack_require__(69);

	var _AdminDashboardController2 = _interopRequireDefault(_AdminDashboardController);

	var _adminDashboardTpl = __webpack_require__(70);

	var _adminDashboardTpl2 = _interopRequireDefault(_adminDashboardTpl);

	var _AdminAccountController = __webpack_require__(71);

	var _AdminAccountController2 = _interopRequireDefault(_AdminAccountController);

	var _adminAccountTpl = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../account/templates/admin-account.tpl.html\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _adminAccountTpl2 = _interopRequireDefault(_adminAccountTpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by zajac on 09.01.2017.
	 */
	StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function StateConfig($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise("/");

	    $stateProvider.state('admin', {
	        url: '/',
	        template: _adminMainTpl2.default,
	        controller: 'AdminMainController',
	        controllerAs: 'vm',
	        abstract: true
	    }), $stateProvider.state('admin.dashboard', {
	        url: '',
	        template: _adminDashboardTpl2.default,
	        controller: 'AdminDashboardController',
	        controllerAs: 'vm'
	    }), $stateProvider.state('admin.account', {
	        url: 'account',
	        template: _adminAccountTpl2.default,
	        controller: 'AdminAccountController',
	        controllerAs: 'vm'
	    });
	}

	exports.default = angular.module('academicms.config', []).controller('AdminMainController', _AdminMainController2.default).controller('AdminDashboardController', _AdminDashboardController2.default).controller('AdminAccountController', _AdminAccountController2.default).config(StateConfig).name;

/***/ },

/***/ 68:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by zajac on 09.01.2017.
	 */
	AdminMainController.$inject = ['AuthenticationServices', 'RedirectServices'];

	function AdminMainController(AuthenticationServices, RedirectServices) {
	    var vm = this;
	    vm.collapse = false;

	    vm.collapseNow = collapseNow;
	    vm.logout = logout;

	    getEmployeeInfo();
	    //-----------------------------------------


	    function collapseNow() {
	        vm.collapse = !vm.collapse;
	    }

	    function getEmployeeInfo() {
	        AuthenticationServices.logged.current().then(function (_ref) {
	            var data = _ref.data;

	            vm.employee = data.employee;
	            console.log(vm.employee);
	        });
	    }

	    function logout() {
	        AuthenticationServices.authentication.logout().then(function (_ref2) {
	            var data = _ref2.data;

	            RedirectServices.to.index();
	        });
	    }
	}

	exports.default = AdminMainController;

/***/ },

/***/ 69:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by zajac on 09.01.2017.
	 */
	AdminDashboardController.$inject = [];

	function AdminDashboardController() {
	  var vm = this;

	  //-----------------------------------------

	}

	exports.default = AdminDashboardController;

/***/ },

/***/ 70:
/***/ function(module, exports) {

	module.exports = "<h2 class=\"page-header\">Dashboard</h2>\r\n";

/***/ },

/***/ 71:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by zajac on 09.01.2017.
	 */

	AdminAccountController.$inject = [];

	function AdminAccountController() {
	  var vm = this;

	  //-----------------------------------------

	}

	exports.default = AdminAccountController;

/***/ }

/******/ });