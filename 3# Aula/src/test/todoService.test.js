const { describe, it, before, afterEach } = require('mocha');
const { expect } = require('chai');
const TodoService = require('../src/todoService');
const { createSandbox } = require('sinon');

describe('todoServiceTodoService = require', () => {
    let sandbox;

    before(() => {
        sandbox = createSandbox();
    });

    describe('#list', () => {
        const mockDataBase = [
            {
              name: 'XuxaDaSilva',
              age: 90,
              meta: { revision: 0, created: 1611314622302, version: 0 },
              '$loki': 1
            }
        ];

        let todoService;

        beforeEach(() => {
            const dependencies = {
                todoRepository: {
                    list: sandbox.stub().returns(mockDataBase)
                }
            }
            todoService = new TodoService(dependencies);

        });

        it('should return data on a specific format', () => {
            const result = todoService.list();
            const [{ meta, $loki, ...expected }] = mockDataBase;
            expect(result).to.be.deep.equal([expected]);
        });
    
    });
})
    