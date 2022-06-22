"use strict";
class Person {
    _age;
    constructor(_age) {
        this._age = _age;
    }
    growOld() {
        this._age++;
    }
    age() {
        return this._age;
    }
}
const person = new Person(0);
person.growOld();
console.log("age: ", person.age());
