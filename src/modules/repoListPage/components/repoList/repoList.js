angular.module('app').component('repoList', {
    templateUrl: './modules/repoListPage/components/repoList/repoList.html',
    controller: ['$stateParams', ($stateParams) => {
        console.log($stateParams.query);
    }]
});