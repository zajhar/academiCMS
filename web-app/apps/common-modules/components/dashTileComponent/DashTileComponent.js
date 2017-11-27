import dasTileTemplate from './dashTile-template.tpl.html';
import DashTileComponentController from './DashTileComponentController';

export default {
    template: dasTileTemplate,
    transclude: true,
    bindings: {
        title: '='
    },
    controllerAs: 'vm',
    controller: DashTileComponentController
};