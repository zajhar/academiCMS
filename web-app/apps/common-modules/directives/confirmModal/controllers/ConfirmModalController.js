/**
 * Created by zajac on 30.12.2016.
 */
ConfirmModalController.$inject = ['$uibModalInstance', 'params'];

function ConfirmModalController($uibModalInstance, params) {
    var vm = this;
    vm.title = params.title || 'Czy jesteś pewny?';

    vm.ok = ok;
    vm.cancel = cancel;

    // ------------------------------------------------------------------------

    function ok() {
        params.confirmModal().then(() => {
            $uibModalInstance.close();
        });
    }

    function cancel() {
        $uibModalInstance.dismiss();
    }
}

export default ConfirmModalController;