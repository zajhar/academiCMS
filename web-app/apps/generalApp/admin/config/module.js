import adminPageTemplate from '../main/templates/admin.tpl.html';
import MainAdminController from '../main/controllers/MainAdminController';
import ManageAdminsController from '../admins/controllers/ManageAdminsController';
import adminAdmins from '../admins/templates/admin-admins.tpl.html';
import DashboardAdminController from '../dashboard/controllers/DashboardAdminController';
import adminDashboard from '../dashboard/templates/admin-dashboard.tpl.html';
import ManageAdminsServices from '../admins/services/ManageAdminsServices';
import ManageEmployeesController from '../employees/controlers/ManageEmployeesController';
import adminEmployees from '../employees/templates/admin-employees.tpl.html';
//import ManageEmployeesServices from '../employees/services/ManageEmployeesServices';
import ManageDepartmentsServices from '../departments/services/ManageDepartmentsServices';
import adminDepartments from '../departments/templates/admin-departments.tpl.html';
import ManageDepartmentsController from '../departments/controllers/ManageDepartmentsController';

StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function StateConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $urlRouterProvider.when('', '/dashboard');

    $stateProvider.state('admin', {
        url: '',
        abstract: true,
        template: adminPageTemplate,
        controller: 'MainAdminController',
        controllerAs: 'vm'
    }),
        $stateProvider.state('admin.dashboard', {
            url: '/dashboard',
            template: adminDashboard,
            controller: 'DashboardAdminController',
            controllerAs: 'vm'
        }),
        $stateProvider.state('admin.admins', {
            url: '/admins',
            template: adminAdmins,
            controller: 'ManageAdminsController',
            controllerAs: 'vm'
        }),
        $stateProvider.state('admin.employees', {
            url: '/employees',
            template: adminEmployees,
            controller: 'ManageEmployeesController',
            controllerAs: 'vm'
        }),
        $stateProvider.state('admin.departments', {
            url: '/departments',
            template: adminDepartments,
            controller: 'ManageDepartmentsController',
            controllerAs: 'vm'
        })
}



export default angular
    .module('academicms.config', [])
    .controller('MainAdminController', MainAdminController)
    .controller('ManageAdminsController', ManageAdminsController)
    .controller('DashboardAdminController', DashboardAdminController)
    .controller('ManageEmployeesController', ManageEmployeesController)
    .controller('ManageDepartmentsController', ManageDepartmentsController)
    .factory('ManageAdminsServices', ManageAdminsServices)
    .factory('ManageDepartmentsServices', ManageDepartmentsServices)
    .config(StateConfig)
    .name;

