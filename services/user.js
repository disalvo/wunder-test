angular
    .module('app')
    .factory("UserService", function($http, $q, API_URL) {
        return {
            Register: function(data) {
                return $http.post(`${API_URL}users`, {data: data}).then(
                    function(r) {
                        return r;
                    },
                    function(r) {
                        return $q.reject(r);
                    }
                );
            }
        }
})