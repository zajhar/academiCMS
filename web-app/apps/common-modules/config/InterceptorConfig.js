/**
 * Created by zajac on 02.01.2017.
 */
InterceptorConfig.$inject = ['$httpProvider'];

function InterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('ResponseInterceptor');
}

export default InterceptorConfig;