/**
 * Created by zajac on 09.01.2017.
 */
import common from '../../common-modules/index';
import config from './config/module';

angular
    .module('academicms.admin', [
        common,
        config
    ]);