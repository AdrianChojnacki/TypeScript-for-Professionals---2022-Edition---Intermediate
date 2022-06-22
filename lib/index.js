"use strict";
var Person = /** @class */ (function () {
    function Person(_age) {
        var _this = this;
        this.growOld = function () {
            _this._age++;
        };
        this._age = _age;
    }
    Person.prototype.age = function () {
        return this._age;
    };
    return Person;
}());
var person = new Person(0);
// person.growOld();
var growOld = person.growOld;
setTimeout(person.growOld, 1000);
growOld();
setTimeout(function () { return console.log("age: ", person.age()); }, 2000);
