angular.module('app').component('repoList', {
    templateUrl: './modules/repoListPage/components/repoList/repoList.html',
    controller: ['$scope', '$stateParams', 'repoSearch', ($scope, $stateParams, repoSearch) => {
      repoSearch($stateParams.query).then((res) => {
        $scope.repoList = res;
      });
    }]
});
