angular.module('app').component('repoList', {
    templateUrl: './modules/repoListPage/components/repoList/repoList.html',
    controller: ['$scope', '$stateParams', 'repoSearch', '$q', ($scope, $stateParams, repoSearch, $q) => {
      $scope.repoList = [];
      $scope.pageCounter = 1;
      $q.when(repoSearch($stateParams.query, $stateParams.page))
        .then(res => {
            $scope.repoList = res.items;
        });
    }]
});
