/**
 * Created by zajac on 31.12.2016.
 */
ManageDepartmentsServices.$inject = ['$http'];

function ManageDepartmentsServices($http) {
    return {
        list: () => $http.post('departments/list'),
        delete: (id) => $http.get(`departments/delete/`+id),
        addOrUpdate: (obj) => $http.post('departments/add',obj)
    }
}
export default ManageDepartmentsServices;