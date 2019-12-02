const angular = require('angular');
global.AppModules = {};
require('../node_modules/angular-mocks/angular-mocks.js');
require('./app');

let tst;

global.fetch = jest.fn(url => {
    switch (url) {
        case ('https://api.github.com/search/repositories?q=test&page=1&per_page=20'): {
            tst = {
                json: jest.fn(() => {
                    return {
                        repos: [{}, {}, {}, {}, {}],
                        total_count: 50,
                        length: 2,
                    };
                })
            }
            break;
        }
        case ('author'): {
            tst = {
                json: jest.fn(() => {
                    return {
                        author_name: "name",
                        author_login: "login",
                        author_repos: 10,
                        length: 3,
                    };
                })
            }
            break;
        }
    }
    return Promise.resolve(tst);
});

const searchServiceConstructor = global.AppModules.searchService;
const searchService = new searchServiceConstructor();


describe('searchService', () => {
    beforeEach(() => {
    });

    it('search should call fetch', async function () {
        await searchService.repoSearch('test', 1);
        expect(global.fetch).toHaveBeenCalled();
    });

    it('search should call json', async function () {
        await searchService.repoSearch('test', 1);
        expect(tst.json).toHaveBeenCalled();
    });

    it('repoSearch should return object with two fields', async function () {
        const rslt = await searchService.repoSearch('test', 1);
        expect(rslt).toHaveLength(2);
    })

    it('repoSearch should return object with repos array', async function () {
        const rslt = await searchService.repoSearch('test', 1);
        expect(rslt).toHaveProperty('repos');
    })

    it('repoSearch should return object with total count of repos', async function () {
        const rslt = await searchService.repoSearch('test', 1);
        expect(rslt).toHaveProperty('total_count');
    })

    it('authorSearch should return object with two fields', async function () {
        const rslt = await searchService.authorSearch('author');
        expect(rslt).toHaveLength(3);
    })

    it('authorSearch should return object with login field', async function () {
        const rslt = await searchService.authorSearch('author');
        expect(rslt).toHaveProperty('author_login');
    })

    it('authorSearch should return object with name field', async function () {
        const rslt = await searchService.authorSearch('author');
        expect(rslt).toHaveProperty('author_name');
    })

    it('authors repos number should be more then 0', async function () {
        const rslt = await searchService.authorSearch('author');
        expect(rslt.author_repos).toBeGreaterThan(0);
    })
})