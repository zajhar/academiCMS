/**
 * Created by zajac on 05.02.2017.
 */

ManageNewsServices.$inject = ['$http'];

function ManageNewsServices($http) {
    return {
        list: () => $http.post('departments/list'),
        delete: (id) => $http.get(`departments/delete/`+id),
        addOrUpdate: (obj) => $http.post('departments/add',obj)
    }
}

export default ManageNewsServices;