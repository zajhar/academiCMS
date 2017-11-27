/**
 * Created by zajac on 03.01.2017.
 */
SearchController.$inject = ['ManageEmployeesServices', '$stateParams'];

function SearchController(ManageEmployeesServices, $stateParams) {
    const vm = this;

    vm.searchPhrase = $stateParams.phrase || '';
    vm.pageLimit = 10;

    vm.search = search;

    search();

    //---------------------------------------

    function search(page = 1) {
        ManageEmployeesServices.search({
            phrase: vm.searchPhrase,
            page: page,
            limit: vm.pageLimit
        }).then(({data})=> {
            vm.results = data.count;
            vm.searchResult = data.list;
        });
    }
}


export default SearchController;