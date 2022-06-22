"use strict";
//--- Lexical this
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
var point = {
    x: 0,
    y: 0,
};
// Variable assignment
point = { x: 1, y: 1 };
// Property assignment
point.x = 1;
point.y = 1;
// Property read
console.log("(".concat(point.x, ", ").concat(point.y, ")"));
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var sheep = new Animal("sheep");
console.log(sheep.name); // Allow
sheep.name = "wolf"; // Disallow
