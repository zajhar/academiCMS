/**
 * Created by zajac on 03.01.2017.
 */
/**
 * Created by zajac on 02.01.2017.
 */
EmployeeListController.$inject = ['ManageEmployeesServices', '$q', '$location', '$anchorScroll'];

function EmployeeListController(ManageEmployeesServices, $q, $location, $anchorScroll) {
    const vm = this;
    vm.getEmployees = getEmployees;

    $q.all([getEmployees()]).then(() => {
        prepareEmployeesToList()
    });
    //---------------------------------------
    function getEmployees() {
        return ManageEmployeesServices.list().then(({data}) => {
            console.log(data);
            vm.employees = data.list;
        });
    }

    function prepareEmployeesToList() {
        divideSurnames();
        groupEmployeesAlphabetical();
    }


    function divideSurnames() {
        vm.chars = [...new Set(vm.employees.map(v => {
            return v.lastName
                .slice(0, 1)
                .toUpperCase();
        }))].sort();
    }

    function groupEmployeesAlphabetical() {
        vm.groupedEmployees = Object.assign(...vm.chars.map(d =>
            ({
                [d]: vm.employees.filter(employee => {
                    return employee.lastName
                            .slice(0, 1)
                            .toUpperCase() === d;
                })
            })));
    }
}
export default EmployeeListController;