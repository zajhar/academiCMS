/**
 * Created by zajac on 09.01.2017.
 */

AdminAccountController.$inject = ['AuthenticationServices', 'ManageDepartmentsServices', 'ManageEmployeesServices', 'Upload', 'ProfileManageServices'];

function AdminAccountController(AuthenticationServices, ManageDepartmentsServices, ManageEmployeesServices, Upload, ProfileManageServices) {
    const vm = this;
    vm.form = {};

    getDepartments();
    getEmployeeInfo();

    vm.updateProfile = updateProfile;

//-----------------------------------------

    function getEmployeeInfo() {
        AuthenticationServices.logged.current().then(({data})=> {
            vm.form = data.employee;
        });
    }

    function getDepartments() {
        return ManageDepartmentsServices.list().then(({data})=> {
            vm.departments = data.list;
        })
    }

    function updateProfile() {
        Upload.upload({
            url: 'uploadAvatar',
            data: {file: vm.file}
        }).then(function (resp) {
            vm.form.avatarPath = resp.data.path;
            vm.progressPercentage = null;
            updateDataProfile();
        }, function (resp) {
        }, function (evt) {
            vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    function updateDataProfile() {
        return ProfileManageServices.update(vm.form).then(({data})=>{
            console.log(data);
        });
    }

}


export default AdminAccountController;