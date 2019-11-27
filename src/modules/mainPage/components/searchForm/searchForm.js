angular.module('app').component('searchForm', {
  templateUrl: './modules/mainPage/components/searchForm/searchForm.html',
  controller: ['$scope', '$state', '$stateParams', ($scope, $state, $stateParams) => {
    $scope.value = $stateParams.query;
    $scope.handleSearch = function handleSearch(searchValue) {
      if (searchValue) {
        $state.go(`search`, {query: searchValue});
      }
    };
  }]
});
