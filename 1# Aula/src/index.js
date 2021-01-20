// const EntityBase = require('./entityBase.js');

// console.log(new EntityBase({
//     name: 'Victor Luiz',
//     gender: 'Male'
// }).name);

// console.log(new EntityBase({
//     name: 'Xuxa da Silva',
//     gender: 'female'
// }).name);

/**
 * Assert é utilizado para testes de classes ou afins, 
 * podemos utilizar para testar certa classe: O throw utilizamos quando sabemos que vai dar erro
 * já o deepStrictEqual é quando ele vai passar.
 */
const assert = require('assert');
const Employee = require('./employee.js');
const Manager = require('./manager.js');
const Util = require('./util.js');

const GENDER = {
    male: 'male',
    female: 'female'
}

{
    const employee = new Employee({
        name: 'Xuxa da Sila',
        gender: GENDER.female
    })

    assert.throws(() => employee.birthYear, {message: 'you must define age first!!'})
}

const CURRENT_YEAR = 2021;
Date.prototype.getFullYear = () => CURRENT_YEAR;


{
    const employee = new Employee({
        name: 'Vitin',
        age: 21,
        gender: GENDER.male
    })

    assert.deepStrictEqual(employee.name, "Mr. Vitin");
    assert.deepStrictEqual(employee.age, undefined);
    assert.deepStrictEqual(employee.gender, undefined);
    assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40));
    assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32));

    const expectedBirthYear = 2000;
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear);
    
    // Não tem set, não vai mudar!!
    employee.birthYear = new Date().getFullYear() - 80;
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear);

    employee.age = 80;
    assert.deepStrictEqual(employee.birthYear, 1941);
    console.log('\n ------employee-----');
    console.log('employee.name', employee.name);
    console.log('employee.age', employee.age);
    console.log('employee.gender', employee.gender);
    console.log('employee.grossPay', employee.grossPay);
    console.log('employee.netPay', employee.netPay);
    
}

{
    const manager = new Manager({
        name: 'Mariazinha',
        age: 18,
        gender: GENDER.female
    })

    assert.deepStrictEqual(manager.name, "Ms. Mariazinha");
    assert.deepStrictEqual(manager.age, undefined);
    assert.deepStrictEqual(manager.gender, undefined);
    assert.deepStrictEqual(manager.birthYear, 2003);
    assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.40));
    assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000));
    assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32));

    console.log('\n----manager----');
    console.log('manager.name', manager.name);
    console.log('manager.age', manager.age);
    console.log('manager.gender', manager.gender);
    console.log('manager.birthYear', manager.birthYear);
    console.log('manager.grossPay', manager.grossPay);
    console.log('manager.bonuses', manager.bonuses);
    console.log('manager.netPay', manager.netPay);

}