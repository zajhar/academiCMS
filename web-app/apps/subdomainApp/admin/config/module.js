/**
 * Created by zajac on 09.01.2017.
 */
import adminMainTemplate from '../main/template/admin-main.tpl.html';
import AdminMainController from '../main/controllers/AdminMainController';
import AdminDashboardController from '../dashboard/controllers/AdminDashboardController';
import adminDashboardTemplate from '../dashboard/templates/admin-dashboard.tpl.html';
import AdminAccountController from '../account/controllers/AdminAccountController';
import NewsController from '../news/controllers/NewsController';
import SubjectsController from '../subjects/controllers/SubjectsController';
import StaticPageController from '../staticPage/controllers/StaticPageController';
import adminAccountTemplate from '../account/templates/admin-account.tpl.html';
import newsTemplate from '../news/templates/admin-news.tpl.html';
import subjectsTemplate from '../subjects/templates/admin-subjects.tpl.html';
import staticPageTemplate from '../staticPage/templates/admin-staticPage.tpl.html';


StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function StateConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('admin', {
        url: '/',
        template: adminMainTemplate,
        controller: 'AdminMainController',
        controllerAs: 'vm',
        abstract: true
    }),
        $stateProvider.state('admin.dashboard', {
            url: '',
            template: adminDashboardTemplate,
            controller: 'AdminDashboardController',
            controllerAs: 'vm'
        }),
        $stateProvider.state('admin.account', {
            url: 'account',
            template: adminAccountTemplate,
            controller: 'AdminAccountController',
            controllerAs: 'vm'
        }),
    $stateProvider.state('admin.news', {
        url: 'news',
        template: newsTemplate,
        controller: 'NewsController',
        controllerAs: 'vm'
    }),
        $stateProvider.state('admin.subjects', {
            url: 'subjects',
            template: subjectsTemplate,
            controller: 'SubjectsController',
            controllerAs: 'vm'
        }),
        $stateProvider.state('admin.staticPage', {
            url: 'staticPage',
            template: staticPageTemplate,
            controller: 'StaticPageController',
            controllerAs: 'vm'
        });

}

export default angular
    .module('academicms.config', [])
    .controller('AdminMainController', AdminMainController)
    .controller('AdminDashboardController', AdminDashboardController)
    .controller('AdminAccountController', AdminAccountController)
    .controller('NewsController', NewsController)
    .controller('SubjectsController', SubjectsController)
    .controller('StaticPageController', StaticPageController)
    .config(StateConfig)
    .name;