angular.module('app').component('repoList', {
    templateUrl: './modules/repoListPage/components/repoList/repoList.html',
    controller: ['$stateParams', 'repoSearch', '$scope', ($scope, $stateParams, repoSearch) => {
        repoSearch($stateParams.query);
    }]
});