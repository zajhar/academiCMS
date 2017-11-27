/**
 * Created by zajac on 05.01.2017.
 */
import employeeItemTemplate from './employeeItem-template.tpl.html';
import employeeItemComponentController from './EmployeeItemComponentController';

export default {
    template: employeeItemTemplate,
    transclude: true,
    bindings: {
        employee: '<'
    },
    controllerAs: 'vm',
    controller: employeeItemComponentController
};