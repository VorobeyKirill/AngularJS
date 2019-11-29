/**
 * @jest-environment jsdom
 */
const angular = require('angular');
const angularMocks = require('angular-mocks');


describe('Component: repoList', () => {
    let $compile;
    let $scope;
  
    beforeEach(() => {
      angular.mock.module('app');
    });
  
    beforeEach(angular.mock.inject(($rootScope, _$compile_) => {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    }));

    it('should have empty repoList', () => {
        expect($scope.repoList).toBeDefined();
        expect($scope.repoList).toBe([]);
    })
});