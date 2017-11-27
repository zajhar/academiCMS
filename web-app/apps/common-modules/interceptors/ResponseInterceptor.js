/**
 * Created by zajac on 02.01.2017.
 */
ResponseInterceptor.$inject = ['$log', '$q', 'ErrorServices'];

function ResponseInterceptor($log, $q, ErrorServices) {
    return {
        responseError: response => {
            switch (response.status) {

                case 403:
                    $log.log('FORBIDDEN', response);
                    ErrorServices.onAjaxCallError(response);
                    return $q.reject(response);
                    break;

                case 401:
                    $log.log('UNAUTHORIZED', response);
                    ErrorServices.onAjaxCallError(response);
                    return $q.reject(response);
                    break;
            }
            return response;
        }
    };

}

export default ResponseInterceptor;