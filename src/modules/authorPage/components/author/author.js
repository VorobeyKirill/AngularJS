angular.module('app').component('author', {
  templateUrl: './modules/authorPage/components/author/author.html',
  controller: ['$scope', '$stateParams', '$q', 'searchService', ($scope, $stateParams, $q, searchService) => {
    $q.when(searchService.authorSearch($stateParams.query))
      .then(res => {
        $scope.info = res;
      });
  }],
});
