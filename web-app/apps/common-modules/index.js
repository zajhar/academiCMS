//import '../vendor/angular/angular';
import './vendor/angular-ui-router/angular-ui-router';
import './vendor/angular-ui-bootstrap/ui-bootstrap-tpls';
import './vendor/angular-animate/angular-animate.min';
import './vendor/angular-busy2/index';
import './vendor/jquery/jquery.min';
import './vendor/ng-file-upload/index';


//----------
import RedirectServices from './services/RedirectServices';
import AuthenticationServices from './services/AuthenticationServices';
import ManageDepartmentsServices from './services/ManageDepartmentsServices';
import ConfirmModalDirective from './directives/confirmModal/ConfirmModalDirective';
import InterceptorConfig from './config/InterceptorConfig';
import ResponseInterceptor from './interceptors/ResponseInterceptor';
import ErrorServices from './services/ErrorServices';
import AngularBusyConfig from './config/AngularBusyConfig';
import ManageEmployeesServices from './services/ManageEmployeesServices';
import DashTileComponent from './components/dashTileComponent/DashTileComponent';
import EmployeeItemComponent from './components/employeeItem/EmployeeItemComponent';
import ProfileManageServices from './services/ProfileManageServices';
import ManageNewsServices from './services/ManageNewsServices';
import ManageSubjectsServices from './services/ManageSubjectsServices';

import '../../styles/_main-app.scss';

export default angular
    .module('academicms.common', [
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'angular-busy',
        'ngFileUpload'
    ])
    .factory('AuthenticationServices', AuthenticationServices)
    .factory('RedirectServices', RedirectServices)
    .directive('confirmModal', ConfirmModalDirective)
    .component('dashTile', DashTileComponent)
    .component('employeeItem', EmployeeItemComponent)
    .config(['$locationProvider', $locationProvider => {
        $locationProvider.hashPrefix('')
    }])
    .config(['$urlRouterProvider', $urlRouterProvider => $urlRouterProvider.otherwise("/")])
    .config(InterceptorConfig)
    .config(AngularBusyConfig)
    .factory('ResponseInterceptor', ResponseInterceptor)
    .factory('ErrorServices', ErrorServices)
    .factory('ProfileManageServices', ProfileManageServices)
    .factory('ManageEmployeesServices', ManageEmployeesServices)
    .factory('ManageDepartmentsServices', ManageDepartmentsServices)
    .factory('ManageNewsServices', ManageNewsServices)
    .factory('ManageSubjectsServices', ManageSubjectsServices)
    .name;



