angular.module('app').component('searchForm', {
  templateUrl: './modules/mainPage/components/searchForm/searchForm.html',
  controller: ['$scope', 'repoSearch', '$state', ($scope, repoSearch, $state) => {
    $scope.handleSearch = function handleSearch(searchValue) {
      $state.go(`search`, {query: searchValue});
    };
  }]
});
