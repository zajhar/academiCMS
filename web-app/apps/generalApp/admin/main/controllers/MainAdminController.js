/**
 * Created by zajac on 28.12.2016.
 */
MainAdminController.$inject = ['$window', 'AuthenticationServices', 'RedirectServices'];

function MainAdminController($window, AuthenticationServices, RedirectServices) {
    const vm = this;

    vm.colapseMenu = colapseMenu;
    vm.logout = logout;

    getAdminDetails();
//-----------------------------------------

    function colapseMenu() {
        $window.innerWidth > 768 ? vm.isCollapsed = false : vm.isCollapsed = true;
    }

    function logout() {
        AuthenticationServices.authentication.logout().then(({data})=> {
            RedirectServices.to.index();
        });
    }

    function getAdminDetails() {
        AuthenticationServices.logged.admin().then(({data})=> {
            vm.adminDetails = data.admin;
        });
    }

}


export default MainAdminController;