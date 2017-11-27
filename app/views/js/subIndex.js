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

	module.exports = __webpack_require__(73);


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../common-modules/index\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _index2 = _interopRequireDefault(_index);

	var _module = __webpack_require__(74);

	var _module2 = _interopRequireDefault(_module);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by zajac on 08.01.2017.
	 */
	angular.module('academicms.index', [_index2.default, _module2.default]);

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _MainIndexController = __webpack_require__(75);

	var _MainIndexController2 = _interopRequireDefault(_MainIndexController);

	var _mainTemplateTpl = __webpack_require__(76);

	var _mainTemplateTpl2 = _interopRequireDefault(_mainTemplateTpl);

	var _loginTpl = __webpack_require__(77);

	var _loginTpl2 = _interopRequireDefault(_loginTpl);

	var _AuthenticationController = __webpack_require__(78);

	var _AuthenticationController2 = _interopRequireDefault(_AuthenticationController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by zajac on 08.01.2017.
	 */
	StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function StateConfig($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise("/");

	    $stateProvider.state('landing', {
	        url: '/',
	        controller: 'MainIndexController',
	        controllerAs: 'vm',
	        template: _mainTemplateTpl2.default
	    }), $stateProvider.state('login', {
	        url: '/login?:errorType',
	        template: _loginTpl2.default,
	        controller: 'AuthenticationController',
	        controllerAs: 'vm'
	    });
	}

	exports.default = angular.module('academicms.config', []).controller('MainIndexController', _MainIndexController2.default).controller('AuthenticationController', _AuthenticationController2.default).config(StateConfig).name;

/***/ },

/***/ 75:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by zajac on 08.01.2017.
	 */
	MainIndexController.$inject = ['ManageEmployeesServices'];

	function MainIndexController(ManageEmployeesServices) {
	    var vm = this;
	    vm.collapse = false;

	    vm.collapseNow = collapseNow;

	    getEmployeeInfo();
	    //-----------------------------------------


	    function collapseNow() {
	        vm.collapse = !vm.collapse;
	    }

	    function getEmployeeInfo() {
	        ManageEmployeesServices.current().then(function (_ref) {
	            var data = _ref.data;

	            vm.employee = data.employee;
	            console.log(vm.employee);
	        });
	    }
	}

	exports.default = MainIndexController;

/***/ },

/***/ 76:
/***/ function(module, exports) {

	module.exports = "<div id=\"page-wrapper\" class=\"\">\r\n    <div class=\"collapse-button\" ng-show=\"!vm.collapse\">\r\n        <i ng-click=\"vm.collapseNow()\" class=\"fa fa-bars cursor-pointer\" aria-hidden=\"true\"></i>\r\n    </div>\r\n\r\n    <aside id=\"subIndex-sidebar\" ng-class=\"{active_sidebar:vm.collapse}\">\r\n        <div class=\"collapse-button-close\" ng-show=\"vm.collapse\">\r\n            <i ng-click=\"vm.collapseNow()\" class=\"fa fa-times cursor-pointer\" aria-hidden=\"true\"></i>\r\n        </div>\r\n        <div class=\"text-center\">\r\n            <div class=\"employee-avatar\" style=\"background-image:url('{{vm.employee.avatarPath}}');\"></div>\r\n            <h4 class=\"margin-top-15\"\r\n                ng-bind=\"vm.employee.academicTitle+' '+ vm.employee.firstName +' '+vm.employee.lastName\"></h4>\r\n\r\n            <p class=\"margin-bottom-0\" ng-bind=\"vm.employee.function\"></p>\r\n            <p class=\"margin-top-0\" ng-bind=\"vm.employee.department.shortcut\"></p>\r\n        </div>\r\n\r\n        <ul class=\"nav  nav-stacked\">\r\n            <li><a class=\"active\" href=\"#\"><i class=\"fa fa-home margin-right-10\" aria-hidden=\"true\"></i>\r\n                Strona główna</a></li>\r\n            <li><a href=\"#\"><i class=\"fa fa-newspaper-o  margin-right-10\" aria-hidden=\"true\"></i>\r\n                Newsy</a></li>\r\n            <li><a href=\"#\"><i class=\"fa fa-book  margin-right-10\" aria-hidden=\"true\"></i>\r\n                Przedmioty</a></li>\r\n            <li><a href=\"#\"><i class=\"fa fa-flask margin-right-10\" aria-hidden=\"true\"></i>\r\n                Publikacje</a></li>\r\n            <li><a href=\"#\"><i class=\"fa fa-address-book-o  margin-right-10\" aria-hidden=\"true\"></i>\r\n                Konsultacje / Kontakt</a></li>\r\n        </ul>\r\n    </aside>\r\n\r\n    <section id=\"subIndex-content\" ng-class=\"{active_content:vm.collapse}\">\r\n        <h2 class=\"page-header\">Witaj!</h2>\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-8\">\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\r\n                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip\r\n                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu\r\n                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia\r\n                deserunt mollit anim id est laborum.\"\r\n            </div>\r\n            <div class=\"col-sm-4 text-right employee-info\">\r\n                <h4 class=\"margin-top-0\" ng-bind=\"vm.employee.function\"></h4>\r\n                <p ng-bind=\"vm.employee.address\"></p>\r\n                <p class=\"ma\">Budynek: <span ng-bind=\"vm.employee.building\"></span>, Pokój: <span\r\n                        ng-bind=\"vm.employee.room\"></span></p>\r\n                <p class=\"ma\">Telefon: <span ng-bind=\"vm.employee.phoneNumber\"></span></p>\r\n                <p>Email: <span ng-bind=\"vm.employee.email\"></span></p>\r\n\r\n            </div>\r\n        </div>\r\n    </section>\r\n\r\n    <footer class=\"footer footer-subIndex navbar-static-bottom\">\r\n        <div class=\"container text-right\">\r\n            <a href=\"/admin\">Admin Panel</a>\r\n        </div>\r\n    </footer>\r\n\r\n</div>";

/***/ },

/***/ 77:
/***/ function(module, exports) {

	module.exports = "<section id=\"login\" class=\" max-height\">\r\n    <div class=\"container max-height display-flex flexbox-center\">\r\n        <div>\r\n            <img ng-src=\"images/academicms-logo.png\">\r\n            <div class=\"well login-box \">\r\n\r\n                <form name=\"authenticationForm\" ng-submit=\"authenticationForm.$valid && vm.logIn()\" novalidate>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"email\">Email</label>\r\n                        <input type=\"email\" ng-model=\"vm.loginData.email\" class=\"form-control\" id=\"email\"\r\n                               name=\"email\" placeholder=\"Email\" autofocus required>\r\n                        <div class=\"validation-error\"\r\n                             ng-show=\"authenticationForm.$submitted && !authenticationForm.email.$valid\">\r\n                    <span ng-show=\"authenticationForm.email.$error.required\"\r\n                          ng-bind=\"'To pole jest wymagane!'\"></span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label for=\"password\">Hasło</label>\r\n                        <input type=\"password\" ng-model=\"vm.loginData.password\" class=\"form-control\" name=\"password\"\r\n                               id=\"password\"\r\n                               placeholder=\"Hasło\" required ng-minlength=\"8\">\r\n                        <div class=\"validation-error\"\r\n                             ng-show=\"authenticationForm.$submitted && !authenticationForm.password.$valid\">\r\n                    <span ng-show=\"authenticationForm.password.$error.required\"\r\n                          ng-bind=\"'To pole jest wymagane!'\"></span>\r\n                    <span ng-show=\"authenticationForm.password.$error.minlength\"\r\n                          ng-bind=\"'Hasło jest za krótkie!'\"></span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group validation-error\"\r\n                         ng-show=\"vm.loginError || vm.responseError\">\r\n                        <span ng-bind=\"vm.loginError\"></span>\r\n                        <span ng-bind=\"vm.responseError\"></span>\r\n                    </div>\r\n\r\n                    <div class=\"text-right\">\r\n                        <button type=\"submit\" class=\"btn btn-primary\">Wyślij</button>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <span ng-bind=\"vm.test\"></span>\r\n        </div>\r\n    </div>\r\n</section>\r\n\r\n\r\n";

/***/ },

/***/ 78:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	AuthenticationController.$inject = ['AuthenticationServices', 'RedirectServices', '$state', 'ErrorServices'];

	function AuthenticationController(AuthenticationServices, RedirectServices, $state, ErrorServices) {
	    var vm = this;
	    vm.logIn = logIn;

	    $state.params.errorType ? callError($state.params.errorType) : null;
	    //-----------------------------------------

	    function logIn() {
	        AuthenticationServices.authentication.login(vm.loginData).then(function (_ref) {
	            var data = _ref.data;

	            console.log(data);
	            checkLoginResult(data);
	        });
	    }

	    function checkLoginResult(feedback) {
	        feedback.success ? handleSuccess() : handleError(feedback.message);
	    }

	    function handleSuccess() {
	        RedirectServices.to.admin();
	    }

	    function handleError(message) {
	        vm.loginError = message;
	    }

	    function callError(error) {
	        vm.responseError = ErrorServices.getLabelByCode(error);
	    }
	}

	exports.default = AuthenticationController;

/***/ }

/******/ });