/**
 * Created by zajac on 05.01.2017.
 */

DashTileComponentController.$inject = [];

function DashTileComponentController() {
    const vm = this;
    vm.displayStatus = true;
    vm.showWindow = true;

    vm.showContent = showContent;
    vm.removeTile = removeTile;

    //-----------------------------

    function showContent() {
        vm.displayStatus = !vm.displayStatus;
    }

    function removeTile() {
        vm.showWindow = !vm.showWindow;
    }
}

export default DashTileComponentController;