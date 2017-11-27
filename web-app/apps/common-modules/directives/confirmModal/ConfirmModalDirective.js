/**
 * Created by zajac on 30.12.2016.
 */
import confirmModalTemplate from './templates/confirmModal.tpl.html';
import ConfirmModalController from './controllers/ConfirmModalController';

ConfirmModalDirective.$inject = ['$uibModal'];

function ConfirmModalDirective($uibModal) {
    return {
        restrict: 'A',
        scope: {
            confirmModal: '&'
        },
        link: onLink
    };

    function onLink(scope, element, attrs) {
        element.bind('click', onElementClick);

        function onElementClick(event) {
            if (attrs.cmBlocked === 'true') return;
            if (attrs.cmPropagation === 'false') event.stopPropagation();

            $uibModal.open({
                template: confirmModalTemplate,
                controller: ConfirmModalController,
                controllerAs: 'vm',
                backdrop: 'static',
                resolve: {
                    params: () => ({
                        title: attrs.cmTitle,
                        confirmModal: scope.confirmModal
                    })
                }
            });
        }
    }
}

export default ConfirmModalDirective;