/**
 * Created by zajac on 05.02.2017.
 */

ProfileManageServices.$inject = ['$http'];

function ProfileManageServices($http) {
    return {
        update: (obj) => $http.post('update', obj)
    }
}

export default ProfileManageServices;