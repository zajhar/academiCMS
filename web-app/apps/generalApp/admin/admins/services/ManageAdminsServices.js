ManageAdminsServices.$inject = ['$http'];

function ManageAdminsServices($http) {
    return {
        list: () => $http.post('admin/list'),
        delete: (id) => $http.get(`admin/delete/${id}`),
        addOrUpdate: (obj) => $http.post('admin/add',obj)
    }
}


export default ManageAdminsServices;