const angular = require('angular');

describe('Testing component', () => {
    beforeEach(module('app', $provide => {

    }));

    beforeEach(inject($injector => {

    }));

    describe('testing template', () => {
        let element;
        let scope;
        let controller;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
        }));
    })
})