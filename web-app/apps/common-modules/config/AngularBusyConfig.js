/**
 * Created by zajac on 02.01.2017.
 */

AngularBusyConfig.$inject = ['angularBusyDefaults'];

function AngularBusyConfig(angularBusyDefaults) {
    angularBusyDefaults.message = 'asdsa';
   angularBusyDefaults.minDuration = 200;
}

export default AngularBusyConfig;
