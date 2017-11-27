/**
 * Created by zajac on 05.02.2017.
 */
ManageSubjectsServices.$inject = ['$http'];

function ManageSubjectsServices($http) {
    return {
        list: () => $http.post('departments/list'),
        delete: (id) => $http.get(`departments/delete/`+id),
        addOrUpdate: (obj) => $http.post('departments/add',obj)
    }
}

export default ManageSubjectsServices;