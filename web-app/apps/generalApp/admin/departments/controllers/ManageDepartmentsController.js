/**
 * Created by zajac on 02.01.2017.
 */
ManageDepartmentsController.$inject = ['ManageDepartmentsServices', '$scope'];

function ManageDepartmentsController(ManageDepartmentsServices, $scope) {
    const vm = this;
    vm.form = {};

    getDepartments();

    vm.addUpdateDepartment = addUpdateDepartment;
    vm.editDepartment = editDepartment;
    vm.deleteDepartment = deleteDepartment;
    vm.clearForm = clearForm;

    //-------------------------------

    function getDepartments() {
        vm.promise = ManageDepartmentsServices.list().then(({data}) => {
            vm.departments = data.list;
        })
    }

    function editDepartment(index) {
        angular.copy(vm.departments[index], vm.form);
    }

    function deleteDepartment(id) {
      return  ManageDepartmentsServices.delete(id).then(()=> {
           getDepartments();
        });
    }

    function addUpdateDepartment() {
     return ManageDepartmentsServices.addOrUpdate(vm.form).then(()=> {
            getDepartments();
            clearForm();
        });
    }

    function clearForm() {
        $scope.addEditDepartment.$setPristine();
        $scope.addEditDepartment.$setUntouched();
        vm.form = {};
    }
}


export default ManageDepartmentsController;