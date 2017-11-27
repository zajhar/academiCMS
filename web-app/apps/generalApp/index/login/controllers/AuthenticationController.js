AuthenticationController.$inject = ['AuthenticationServices', 'RedirectServices', '$state', 'ErrorServices'];

function AuthenticationController(AuthenticationServices, RedirectServices, $state, ErrorServices) {
    const vm = this;
    vm.logIn = logIn;

    $state.params.errorType ? callError($state.params.errorType) : null;
//-----------------------------------------

    function logIn() {
        AuthenticationServices.authentication.login(vm.loginData).then(({data}) => {
            checkLoginResult(data);
        });
    }

    function checkLoginResult(feedback) {
        feedback.success ? handleSuccess() : handleError(feedback.message);
    }

    function handleSuccess() {
        RedirectServices.to.admin();
    }

    function handleError(message) {
        vm.loginError = message;
    }

    function callError(error) {
        vm.responseError =  ErrorServices.getLabelByCode(error);
    }
}


export default AuthenticationController;