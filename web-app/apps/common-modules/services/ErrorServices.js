/**
 * Created by zajac on 02.01.2017.
 */
ErrorServices.$inject = ['RedirectServices'];

    function ErrorServices(RedirectServices) {
        return {
            getLabelByCode,
            onAjaxCallError
        };

        function getLabelByCode(code) {
            const codes = {
                'Forbidden': 'To miejsce wymaga zalogowania!',
                'Unauthorized': 'Twoja sesja wygasła! Zaloguj się ponownie'
            };
            return codes[code] ? codes[code] : 'Wystąpił błąd';
        }

        function onAjaxCallError(data) {
            RedirectServices.to.login(data.data);
        }
}


export default ErrorServices;