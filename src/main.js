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

app.factory('repoSearch', () => async (searchValue, page) => {
  const responce = await fetch(`https://api.github.com/search/repositories?q=${searchValue}&page=${page}&per_page=20`);
  const data = await responce.json();
  return data;
});

app.factory('authorSearch', () => async (url) => {
  const responce = await fetch(url);
  const data = await responce.json();
  return data;
});

angular.module('app').component('author', {
  templateUrl: './modules/authorPage/components/author/author.html',
  controller: ['$scope', '$stateParams', '$q', 'authorSearch', ($scope, $stateParams, $q, authorSearch) => {
    $q.when(authorSearch($stateParams.query))
      .then((res) => {
        $scope.info = res;
      });
  }],
});

angular.module('app').component('searchForm', {
  templateUrl: './modules/mainPage/components/searchForm/searchForm.html',
  controller: ['$scope', '$state', '$stateParams', ($scope, $state, $stateParams) => {
    $scope.value = $stateParams.query;
    $scope.handleSearch = function handleSearch(searchValue) {
      if (searchValue) {
        $state.go('search', { query: searchValue, page: 1 });
      }
    };
  }],
});

angular.module('app').component('repoItem', {
  templateUrl: './modules/repoListPage/components/repoItem/repoItem.html',
  bindings: {
    info: '<',
  },
});

angular.module('app').component('repoList', {
  templateUrl: './modules/repoListPage/components/repoList/repoList.html',
  controller: ['$scope', '$stateParams', 'repoSearch', '$q', '$state', ($scope, $stateParams, repoSearch, $q, $state) => {
    $scope.repoList = [];
    $scope.currentPage = parseInt($stateParams.page);
    $scope.lastPage;
    $q.when(repoSearch($stateParams.query, $stateParams.page))
      .then((res) => {
        $scope.repoList = res.items;
        if (res.total_count % 20 === 0) {
          $scope.lastPage = Math.floor(res.total_count / 20);
        } else {
          $scope.lastPage = Math.floor(res.total_count / 20) + 1;
        }
      });
    $scope.handleClick = (page) => {
      switch (page) {
        case ('Next'): {
          $scope.currentPage += 1;
          $state.go('search', { query: $stateParams.query, page: $scope.currentPage });
          break;
        }
        case ('Prev'): {
          $scope.currentPage -= 1;
          $state.go('search', { query: $stateParams.query, page: $scope.currentPage });
          break;
        }
        case ('...'): {
          break;
        }
        default: {
          if (+page) {
            $scope.currentPage = +page;
            $state.go('search', { query: $stateParams.query, page: $scope.currentPage });
          }
          break;
        }
      }
    };
  }],
});
