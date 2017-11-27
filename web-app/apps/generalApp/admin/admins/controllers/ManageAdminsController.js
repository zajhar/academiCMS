ManageAdminsController.$inject = ['ManageAdminsServices', '$scope'];

function ManageAdminsController(ManageAdminsServices, $scope) {
    const vm = this;
    vm.form = {};
    vm.getAdmins = getAdmins;
    vm.editAdminAccount = editAdminAccount;
    vm.addUpdateAdmin = addUpdateAdmin;
    vm.deleteAdmin = deleteAdmin;
    vm.clearForm = clearForm;


    getAdmins();
    //---------------------------------------

    function getAdmins() {
        vm.promise = ManageAdminsServices.list().then(({data}) => {
            vm.admins = data.list;
        })
    }

    function editAdminAccount(index) {
        angular.copy(vm.admins[index], vm.form);
    }

    function deleteAdmin(id) {
        return ManageAdminsServices.delete(id).then(()=> {
            getAdmins();
        });
    }

    function addUpdateAdmin() {
        return ManageAdminsServices.addOrUpdate({
            id: vm.form.id || null,
            username: vm.form.username,
            password: vm.form.password,
            email: vm.form.email
        }).then(()=> {
            getAdmins();
            clearForm();
        });
    }

    function clearForm() {
        $scope.addEditAdmin.$setPristine();
        $scope.addEditAdmin.$setUntouched();
        vm.form = {};
    }
}


export default ManageAdminsController;