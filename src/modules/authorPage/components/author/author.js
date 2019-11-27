angular.module('app').component('author', {
  templateUrl: './modules/authorPage/components/author/author.html',
  controller: ['$scope', '$stateParams', '$q', 'authorSearch', ($scope, $stateParams, $q, authorSearch) => {
    $q.when(authorSearch($stateParams.query))
      .then((res) => {
        $scope.info = res;
      });
  }],
});
