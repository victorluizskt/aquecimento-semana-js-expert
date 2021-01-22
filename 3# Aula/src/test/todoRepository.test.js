const { describe, it, before, afterEach } = require('mocha');
const { expect } = require('chai');
const TodoRepository = require('../src/todoRespository');
const { createSandbox } = require('sinon');

describe('todoRepository', () => {
    let sandbox;
    let todoRepository;

    before(() => {
        todoRepository = new TodoRepository();
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('methods signature', () => {
        it('should call insertOne from lokijs', () => {
            const functionName = 'insertOne';
            const expectedReturn = true;

            sandbox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectedReturn);

            const data = {name: 'Erick'}

            const result = todoRepository.create(data);
            expect(result).to.be.ok;
            expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok;
        });

        it('should call find from lokijs', () => {
            const mockDataBase = [
                {
                  name: 'XuxaDaSilva',
                  age: 90,
                  meta: { revision: 0, created: 1611314622302, version: 0 },
                  '$loki': 1
                }
            ];

            const functionName = 'find';
            const expectedReturn = mockDataBase;
            sandbox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectedReturn);

            const result = todoRepository.list();
            expect(result).to.be.deep.equal(expectedReturn);
            expect(todoRepository.schedule[functionName].calledOnce).to.be.ok;

        });
    })
})

