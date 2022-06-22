"use strict";
//--------------------------------------------- Lexical this
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
//--------------------------------------------- Union Types
/**
 * @param input a command or an array of commands
 * @returns a single trimmed string
 */
function formatCommandline(input) {
    var line = "";
    if (typeof input === "string") {
        line = input.trim();
    }
    else {
        line = input.map(function (x) { return x.trim(); }).join(" ");
    }
    return line;
}
console.log(formatCommandline("hello")); // 'hello'
console.log(formatCommandline(["hello ", " world "])); // 'hello world'
console.log(formatCommandline(1337)); // Error
/**
 * Takes a string and adds `padding` to the left.
 * If `padding` is a number, then that number of spaces is added to the left.
 * If `padding` is a string, then `padding` is appended to the left.
 */
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected number or string, got '".concat(padding, "'."));
}
padLeft("Hello world", 4); // '    Hello world'
padLeft("Hello world", "  "); // '  Hello world'
padLeft("Hello world", "---"); // '---Hello world'
padLeft("Hello world", false); // Error
