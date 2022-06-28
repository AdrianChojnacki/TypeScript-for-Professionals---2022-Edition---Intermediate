"use strict";
//--------------------------------------------- Lexical this
Object.defineProperty(exports, "__esModule", { value: true });
exports.point5 = void 0;
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
//--------------------------------------------- Strict Compiler Option
function add(first, second) {
    return second + first;
}
add(1, 2); // 3
var Point2 = /** @class */ (function () {
    function Point2(x, y) {
        this.x = x;
        this.y = y;
    }
    Point2.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
    };
    return Point2;
}());
// Create
var point2 = new Point2(0, 0);
// Use
point2.move(1, 3);
console.log(point2.x, point2.y); // 1, 3
var users = [
    { name: "Oby", age: 12 },
    { name: "Heera", age: 32 },
];
function getUserAge(name) {
    var user = users.find(function (user) { return user.name === name; });
    if (user == null) {
        throw new Error("User not found: ".concat(name));
    }
    return user.age;
}
//--------------------------------------------- Null versus Undefined
var notDefined = undefined;
var notPresent = null;
var Point3 = /** @class */ (function () {
    function Point3() {
    }
    return Point3;
}());
var center = new Point3();
center.x = 0;
// center.y = 0;
console.log(center.x, center.y); // 0, undefined
function logVowels(value) {
    console.log(value.match(/[aeiou]/gi));
}
logVowels("hello"); // ['e', 'o']
logVowels("sky"); // null
console.log(null == null); // true (of course)
console.log(undefined == undefined); // true (of course)
console.log(undefined == null); // true
console.log(false == null); // false
console.log(0 == null); // false
console.log("" == null); // false
var result = someBooleanOrNullOrUndefined();
if (result == null) {
    console.log("Null or Undefined", result); // null | undefined
}
if (result != null) {
    console.log("Boolean", result); // true | false
}
function decorate(value) {
    if (value == null) {
        return value;
    }
    return "-- ".concat(value.trim(), " --");
}
console.log(decorate("Hello")); // -- Hello --
console.log(decorate("Hello World   ")); // -- Hello World --
console.log(decorate(null)); // null
console.log(decorate(undefined)); // undefined
function contact(details) {
    console.log("Dear ".concat(details.name, ".\n  I hope you received our email at ").concat(details.email, ".\n  We will call you at ").concat(details.phone, " shortly."));
}
contact({
    name: "John",
    email: "howdy@example.com",
    phone: "1337",
});
var bruce = {
    name: "Bruce",
    email: "belt@example.com",
    phone: "911",
};
var alfred = {
    name: "Alfred",
    email: "alfred@example.com",
};
console.log(alfred.phone); // undefined
var Point4 = /** @class */ (function () {
    function Point4() {
    }
    return Point4;
}());
var point3 = new Point4();
console.log(point3.x); // undefined
point3.x = 0;
point3.x = undefined;
point3.x = null;
//--------------------------------------------- Non-null Assertion Operator
var Point5 = /** @class */ (function () {
    function Point5() {
    }
    return Point5;
}());
function initialize() {
    return { x: 0, y: 0 };
}
var point4 = initialize();
console.log("After initialized", point4.x, point4.y);
function sendEmail(email) {
    console.log("Sent email to", email);
}
function contact2(person) {
    if (person.email == null)
        throw new Error("Person ".concat(person.name, " is not contactable"));
    sendEmail(person.email);
}
exports.point5 = {
    x: 0,
    y: 0,
    z: 0,
};
// Our App
function handleRequest(req) {
    req.body;
    req.json;
}
//--------------------------------------------- never type
var fail = function (message) {
    throw new Error(message);
};
var sing = function () {
    while (true) {
        console.log("Never gonna give you up");
        console.log("Never gonna let you down");
        console.log("Never gonna run around and desert you");
        console.log("Never gonna make you cry");
        console.log("Never gonna say goodbye");
        console.log("Never gonna tell a lie and hurt you");
    }
};
var example = 123;
function area3(s) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else if (s.kind === "circle") {
        return Math.PI * Math.pow(s.radius, 2);
    }
    var _ensureAllCasesAreHandled = s;
    return _ensureAllCasesAreHandled;
}
