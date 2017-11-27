ManageEmployeesServices.$inject = ['$http'];

function ManageEmployeesServices($http) {
    return {
        list: () => $http.post('employees/list'),
        listPaginated: (obj) => $http.post('employees/list', obj),
        addOrUpdate: (obj) => $http.post('employees/add', obj),
        delete: (id) => $http.get(`employees/delete/` + id),
        search: (obj) => $http.post('employees/search', obj),
        current: () => $http.get('current')
    }
}


export default ManageEmployeesServices;