RedirectServices.$inject = ['$window'];

function RedirectServices($window) {
    return {
        to: {
            index: () => redirectOrRefresh(getDomain()),
            admin: () => redirectOrRefresh(getDomain() + '/admin'),
            login: data => redirectOrRefresh(getDomain() + (data ? `/#/login/?errorType=${data}` : '/#/login'))
        }
    }


    function redirectOrRefresh(url) {
        if ($window.location.href === url) {
            reload();
            return;
        }
        $window.location = url;
    }

    function refresh() {
        reload();
    }

    function reload() {
        $window.location.reload(true);
    }

    function getDomain() {
        const l = $window.location;
        return `${l.protocol}//${l.host}`;
    }
}

export default RedirectServices;