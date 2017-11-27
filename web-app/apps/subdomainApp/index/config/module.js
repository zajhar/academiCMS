/**
 * Created by zajac on 08.01.2017.
 */
import MainIndexController from '../main/controllers/MainIndexController';
import mainIndexTemplate from '../main/templates/main-template.tpl.html';
import loginTemplate from '../login/templates/login.tpl.html';
import AuthenticationController from '../login/controllers/AuthenticationController';


StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function StateConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('landing', {
        url: '/',
        controller: 'MainIndexController',
        controllerAs: 'vm',
        template: mainIndexTemplate
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
    .controller('MainIndexController', MainIndexController)
    .controller('AuthenticationController', AuthenticationController)
    .config(StateConfig)
    .name;