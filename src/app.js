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
      name: 'search',
      url: '/search/{query}',
      template: '<search-form></search-form><repo-list></repo-list>'
  }

  $urlRouterProvider.otherwise('/');

  $stateProvider.state(mainPage);
  $stateProvider.state(authorPage);  
  $stateProvider.state(repoListPage);
});

app.factory('repoSearch', () => {
  const repoList = [];
  return async function (searchValue) {
    const responce = await fetch(`https://api.github.com/search/repositories?q=${searchValue}&page=1`);
    const data = await responce.json();
    data.items.map(el => repoList.push(el));
    return repoList;
  }
});
