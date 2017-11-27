/**
 * Created by zajac on 02.01.2017.
 */
LandingController.$inject = ['$state'];

function LandingController($state) {
    const vm = this;
    vm.searchPhrase = '';

    vm.search = search;
    //---------------------------------------

    function search() {
        $state.go('^.search', {'phrase': vm.searchPhrase});
    }
}


export default LandingController;