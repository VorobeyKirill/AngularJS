const app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  const authorPage = {
    name: 'author',
    url: '/author',
    template: '<author></author>'
  }

  const mainPage = {
    name: 'main',
    url: '/',
    template: '<search-form></search-form>'
  }

  const repoListPage = {
      name: 'repoList',
      url: '/repoList',
      template: '<search-form></search-form><repo-list></repo-list>'
  }

  $urlRouterProvider.otherwise('/');

  $stateProvider.state(mainPage);
  $stateProvider.state(authorPage);  
  $stateProvider.state(repoListPage);
});
