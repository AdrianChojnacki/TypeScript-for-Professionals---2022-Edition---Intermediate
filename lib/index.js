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
var direction;
direction = "North";
direction = "n0r7h";
direction = "South";
function move(distanceMeters, direction) {
    console.log("Moving ".concat(distanceMeters, " meters towards ").concat(direction));
}
function rollDice() {
    return (Math.floor(Math.random() * 6) + 1);
}
if (rollDice() === 7) {
    throw new Error("Not possible!");
}
//--------------------------------------------- Type Narrowing
function padLeft2(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected number or string, got '".concat(padding, "'"));
}
padLeft2("Hello world", 4); // '    Hello world'
padLeft2("Hello world", "  "); // '  Hello world'
padLeft2("Hello world", "---"); // '---Hello world'
var Cat = /** @class */ (function () {
    function Cat() {
    }
    Cat.prototype.meow = function () {
        console.log("meow");
    };
    return Cat;
}());
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.bark = function () {
        console.log("woof");
    };
    return Dog;
}());
function speak(animal) {
    if (animal instanceof Cat) {
        animal.meow();
    }
    if (animal instanceof Dog) {
        animal.bark();
    }
}
function area(shape) {
    if ("size" in shape) {
        return shape.size * shape.size;
    }
    if ("width" in shape) {
        return shape.width * shape.height;
    }
}
area({ size: 2 }); // 4
area({ width: 2, height: 3 }); // 6
function area2(shape) {
    if (shape.kind === "circle") {
        return Math.PI * Math.pow(shape.radius, 2);
    }
    if (shape.kind === "square") {
        return shape.size * shape.size;
    }
    if (shape.kind === "rectangle") {
        return shape.width * shape.height;
    }
}
function logResult(result) {
    if (result.isValid) {
        console.log("Success, validated value:", result.validatedValue);
    }
    if (result.isValid === false) {
        console.log("Failure, error reason:", result.errorReason);
    }
}
//--------------------------------------------- Class Parameter Properties
var Person2 = /** @class */ (function () {
    function Person2(name, age) {
        this.name = name;
        this.age = age;
    }
    return Person2;
}());
var adam = new Person2("Adam", 120000);
console.log(adam.name, adam.age); // 'Adam', 120000
