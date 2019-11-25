angular.module('app').component('searchForm', {
  templateUrl: './modules/mainPage/components/searchForm/searchForm.html',
  controller: ['$scope', '$state', ($scope, $state) => {
    $scope.handleSearch = function handleSearch(searchValue) {
      $state.go(`search`, {query: searchValue});
    };
  }]
});
