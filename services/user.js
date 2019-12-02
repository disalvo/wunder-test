angular
    .module('app')
    .factory("UserService", function($http, $q, API_URL) {
        return {
            Register: function(data) {
                return $http.post(`${API_URL}users`, data).then(
                    function(r) {
                        return r.data;
                    },
                    function(r) {
                        return $q.reject(r);
                    }
                );
            }
        }
})