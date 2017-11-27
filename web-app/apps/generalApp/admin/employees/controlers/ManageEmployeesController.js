/**
 * Created by zajac on 30.12.2016.
 */
ManageEmployeesController.$inject = ['ManageEmployeesServices', 'ManageDepartmentsServices', '$scope', '$q', 'Upload'];

function ManageEmployeesController(ManageEmployeesServices, ManageDepartmentsServices, $scope, $q, Upload) {
    const vm = this;
    vm.form = null;
    vm.pageLimit = 20;
    vm.currentPage = 1;
    vm.results = 0;
    vm.editMode = false;

    vm.getEmployees = getEmployees;
    vm.deleteEmployee = deleteEmployee;
    vm.showEmployee = showEmployee;
    vm.showEditMode = showEditMode;
    vm.addUpdateEmployee = addUpdateEmployee;
    vm.clearForm = clearForm;
    vm.addNewEmployee = addNewEmployee;
    vm.deletePhoto = deletePhoto;
    vm.fileUpload = fileUpload;

    vm.promise = $q.all([
        getEmployees(),
        getDepartments()
    ]);


    //-------------------------------

    function getEmployees(page = 1) {

        vm.promise = ManageEmployeesServices.listPaginated({
            limit: vm.pageLimit,
            page: page
        }).then(({data})=> {
            vm.employees = data.list;
            vm.results = data.results;
        });
    }

    function deleteEmployee(id) {
        return ManageEmployeesServices.delete(id).then(()=> {
            getEmployees(vm.currentPage);
        });
    }

    function deletePhoto() {
        vm.form.avatarPath = null;
        vm.file = null;
    }

    function showEmployee(index) {
        vm.editMode = false;
        vm.form = {};
        angular.copy(vm.employees[index], vm.form);

    }

    function showEditMode() {
        getDepartments();
        vm.editMode = true;
    }

    function getDepartments() {
        return ManageDepartmentsServices.list().then(({data})=> {
            vm.departments = data.list;
        })
    }

    function fileUpload() {
        Upload.upload({
            url: 'employees/uploadAvatar',
            data: {file: vm.file}
        }).then(function (resp) {
            vm.form.avatarPath = resp.data.path;
            vm.progressPercentage = null;
            addUpdateEmployee();
        }, function (resp) {
        }, function (evt) {
            vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    function addUpdateEmployee() {
        return ManageEmployeesServices.addOrUpdate(vm.form).then(() => {
            clearForm();
            getEmployees();
        });
    }

    function clearForm() {
        vm.form = null;
        vm.editMode = false;
    }

    function addNewEmployee() {
        vm.form = {};
        showEditMode();
    }


}


export default ManageEmployeesController;