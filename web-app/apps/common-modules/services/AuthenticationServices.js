AuthenticationServices.$inject = ['$http'];

function AuthenticationServices($http) {
    const logged = {};
    return {
        authentication: {
            login: (obj) => $http.post('login/', obj),
            logout: () => $http.get('logout')
        },
        logged: {
            admin: () => $http.get('admin/current'),
            current: () => $http.get('current'),
            loggedUser: loggedUser
        }
    }

    function loggedUser() {
        $http.get('current').then(({data})=> {
            logged.userData = data.employee;
        });
    }
}

export default AuthenticationServices;