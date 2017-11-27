/**
 * Created by zajac on 09.01.2017.
 */
AdminMainController.$inject = ['AuthenticationServices', 'RedirectServices'];

function AdminMainController(AuthenticationServices, RedirectServices) {
    const vm = this;
    vm.collapse = false;

    vm.collapseNow = collapseNow;
    vm.logout = logout;

    getEmployeeInfo();
//-----------------------------------------


    function collapseNow() {
        vm.collapse = !vm.collapse;
    }

    function getEmployeeInfo() {
        AuthenticationServices.logged.current().then(({data})=> {
            vm.employee = data.employee;
            console.log( vm.employee);
            AuthenticationServices.logged.loggedUser();
        });
    }

    function logout() {
        AuthenticationServices.authentication.logout().then(({data})=> {
            RedirectServices.to.index();
        });
    }

}


export default AdminMainController;