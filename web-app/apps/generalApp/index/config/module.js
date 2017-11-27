import mainPageTemplate from '../landing/templates/main-page.tpl.html';
import loginTemplate from '../login/templates/login.tpl.html';
import AuthenticationController from '../login/controllers/AuthenticationController';
import LandingController from '../landing/controllers/LandingController';
import SearchController from '../search/controllers/SearchController';
import searchTemplate from '../search/templates/index-search.tpl.html';
import EmployeeListController from '../employeeList/controllers/EmployeeListController';
import landingEmployeeListTemplate from '../employeeList/templates/landing-employeeList.tpl.html';

StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function StateConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('landing', {
        url: '/',
        controller: 'LandingController',
        controllerAs: 'vm',
        template: mainPageTemplate,
        abstract: true
    }),
        $stateProvider.state('landing.employeeList', {
            url: '',
            controller: 'EmployeeListController',
            controllerAs: 'vm',
            template: landingEmployeeListTemplate
        }),
        $stateProvider.state('landing.search', {
            url: 'search/?:phrase',
            controller: 'SearchController',
            controllerAs: 'vm',
            template: searchTemplate
        }),
        $stateProvider.state('login', {
            url: '/login?:errorType',
            template: loginTemplate,
            controller: 'AuthenticationController',
            controllerAs: 'vm'
        });
}

export default angular
    .module('academicms.config', [])
    .controller('AuthenticationController', AuthenticationController)
    .controller('LandingController', LandingController)
    .controller('SearchController', SearchController)
    .controller('EmployeeListController', EmployeeListController)
    .config(StateConfig)
    .name;