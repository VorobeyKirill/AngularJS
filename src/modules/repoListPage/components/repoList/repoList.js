angular.module('app').component('repoList', {
    templateUrl: './modules/repoListPage/components/repoList/repoList.html',
    controller: ['$scope', '$stateParams', 'repoSearch', '$q', ($scope, $stateParams, repoSearch, $q) => {
      $scope.repoList = [];

      $q.when(repoSearch($stateParams.query, 1))
        .then((res) => {
            $scope.repoList = res.items;        
        });
    }]
});
