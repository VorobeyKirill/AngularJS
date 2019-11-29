angular.module('app').component('repoList', {
  templateUrl: './modules/repoListPage/components/repoList/repoList.html',
  controller: ['$scope', '$stateParams', 'repoSearch', '$q', ($scope, $stateParams, repoSearch, $q) => {
    $scope.repoList = [];
    $scope.currentPage = 1;
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
    $scope.searchForNewPage = () => {
      $q.when(repoSearch($stateParams.query, $scope.currentPage))
        .then((res) => {
          $scope.repoList = res.items;
        });
    };
    $scope.handleClick = (page) => {
      switch (page) {
        case ('Next'): {
          $scope.currentPage += 1;
          $scope.searchForNewPage();
          break;
        }
        case ('Prev'): {
          $scope.currentPage -= 1;
          $scope.searchForNewPage();
          break;
        }
        case ('...'): {
          break;
        }
        default: {
          if (+page) {
            $scope.currentPage = page;
            $scope.searchForNewPage();
          }
          break;
        }
      }
    };
  }],
});
