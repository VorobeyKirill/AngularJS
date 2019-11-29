angular.module('app').component('repoList', {
  templateUrl: './modules/repoListPage/components/repoList/repoList.html',
  controller: ['$scope', '$stateParams', 'repoSearch', '$q', '$state', ($scope, $stateParams, repoSearch, $q, $state) => {
    $scope.repoList = [];
    $scope.currentPage = parseInt($stateParams.page);
    $scope.lastPage;
    $q.when(repoSearch($stateParams.query, $stateParams.page))
      .then((res) => {
        $scope.repoList = res.items;
        if (res.total_count % 20 === 0) {
          $scope.lastPage = Math.floor(res.total_count / 20);
        } else {
          $scope.lastPage = Math.floor(res.total_count / 20) + 1;
        }
      });
    $scope.handleClick = (page) => {
      switch (page) {
        case ('Next'): {
          $scope.currentPage += 1;
          $state.go('search', { query: $stateParams.query, page: $scope.currentPage });
          break;
        }
        case ('Prev'): {
          $scope.currentPage -= 1;
          $state.go('search', { query: $stateParams.query, page: $scope.currentPage });
          break;
        }
        case ('...'): {
          break;
        }
        default: {
          if (+page) {
            $scope.currentPage = +page;
            $state.go('search', { query: $stateParams.query, page: $scope.currentPage });
          }
          break;
        }
      }
    };
  }],
});
