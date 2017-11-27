/**
 * Created by zajac on 08.01.2017.
 */
MainIndexController.$inject = ['ManageEmployeesServices', 'AuthenticationServices'];

function MainIndexController(ManageEmployeesServices, AuthenticationServices) {
    const vm = this;
    vm.collapse = false;

    vm.collapseNow = collapseNow;

    getEmployeeInfo();
//-----------------------------------------


    function collapseNow() {
        vm.collapse = !vm.collapse;
    }

    function getEmployeeInfo() {
        ManageEmployeesServices.current().then(({data})=> {
           vm.employee = data.employee;
            console.log( vm.employee);
        });
      
    }

}


export default MainIndexController;