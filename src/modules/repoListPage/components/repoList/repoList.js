angular.module('app').component('repoList', {
    templateUrl: './modules/repoListPage/components/repoList/repoList.html',
    controller: ['$scope', '$stateParams', 'repoSearch', '$q', ($scope, $stateParams, repoSearch, $q) => {
      $scope.repoList = [];
      $scope.pageCounter = 1;
      $scope.requestCounter = 1;
      $scope.reposStackCounter = [];
      $q.when(repoSearch($stateParams.query, $scope.requestCounter))
        .then(res => {
            $scope.repoList = res.items;
            $scope.requestCounter += 1;
            $q.when(repoSearch($stateParams.query, $scope.requestCounter))
            .then(res => {
                res.items.map(el => $scope.repoList.push(el));
                $scope.requestCounter += 1;
                while ($scope.repoList.length) {
                    $scope.reposStackCounter.push($scope.repoList.splice(0, 20));
                }
            });
        });
    }]
});
