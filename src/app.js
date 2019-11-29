const app = angular.module('app', ['ui.router']);

app.config(($stateProvider, $urlRouterProvider) => {
  const authorPage = {
    name: 'author',
    url: '/author?query',
    template: '<author></author>',
  };

  const mainPage = {
    name: 'main',
    url: '/',
    template: '<search-form></search-form>',
  };

  const repoListPage = {
    name: 'search',
    url: '/search?query&page',
    template: '<search-form></search-form>'
                + '<repo-list></repo-list>',
  };

  $urlRouterProvider.otherwise('/');

  $stateProvider.state(mainPage);
  $stateProvider.state(authorPage);
  $stateProvider.state(repoListPage);
});

app.service('searchService', function () {
  this.repoSearch = async (searchValue, page) => {
    const responce = await fetch(`https://api.github.com/search/repositories?q=${searchValue}&page=${page}&per_page=20`);
    const data = await responce.json();
    return data;
  }

  this.authorSearch = async url => {
    const responce = await fetch(url);
    const data = await responce.json();
    return data;
  }
});