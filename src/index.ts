//--------------------------------------------- Lexical this

import { json } from "stream/consumers";
import { NumberLiteralType } from "typescript";

class Person {
  private _age: number;
  constructor(_age: number) {
    this._age = _age;
  }
  growOld = () => {
    this._age++;
  };
  age() {
    return this._age;
  }
}

const person = new Person(0);
// person.growOld();
const growOld = person.growOld;
setTimeout(person.growOld, 1000);
growOld();
setTimeout(() => console.log("age: ", person.age()), 2000);

//--------------------------------------------- readonly modifier

type Point = {
  readonly x: number;
  y: number;
};

const point: Point = {
  x: 0,
  y: 0,
};

// Variable assignment
point = { x: 1, y: 1 };

// Property assignment
point.x = 1;
point.y = 1;

// Property read
console.log(`(${point.x}, ${point.y})`);

class Animal {
  public readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const sheep = new Animal("sheep");
console.log(sheep.name); // Allow
sheep.name = "wolf"; // Disallow

//--------------------------------------------- Union Types

/**
 * @param input a command or an array of commands
 * @returns a single trimmed string
 */
function formatCommandline(input: string | string[]) {
  let line = "";
  if (typeof input === "string") {
    line = input.trim();
  } else {
    line = input.map(x => x.trim()).join(" ");
  }
  return line;
}

console.log(formatCommandline("hello")); // 'hello'
console.log(formatCommandline(["hello ", " world "])); // 'hello world'
console.log(formatCommandline(1337)); // Error

type Padding = number | string;

/**
 * Takes a string and adds `padding` to the left.
 * If `padding` is a number, then that number of spaces is added to the left.
 * If `padding` is a string, then `padding` is appended to the left.
 */
function padLeft(value: string, padding: Padding) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected number or string, got '${padding}'.`);
}

padLeft("Hello world", 4); // '    Hello world'
padLeft("Hello world", "  "); // '  Hello world'
padLeft("Hello world", "---"); // '---Hello world'
padLeft("Hello world", false); // Error

//--------------------------------------------- Literal Types

type CardinalDirection = "North" | "East" | "South" | "West";

let direction: CardinalDirection;

direction = "North";
direction = "n0r7h";
direction = "South";

function move(distanceMeters: number, direction: CardinalDirection) {
  console.log(`Moving ${distanceMeters} meters towards ${direction}`);
}

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice() {
  return (Math.floor(Math.random() * 6) + 1) as DiceValue;
}

if (rollDice() === 7) {
  throw new Error("Not possible!");
}

//--------------------------------------------- Type Narrowing

function padLeft2(value: string, padding: number | string) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected number or string, got '${padding}'`);
}

padLeft2("Hello world", 4); // '    Hello world'
padLeft2("Hello world", "  "); // '  Hello world'
padLeft2("Hello world", "---"); // '---Hello world'

class Cat {
  meow() {
    console.log("meow");
  }
}

class Dog {
  bark() {
    console.log("woof");
  }
}

type Animal2 = Cat | Dog;

function speak(animal: Animal2) {
  if (animal instanceof Cat) {
    animal.meow();
  }
  if (animal instanceof Dog) {
    animal.bark();
  }
}

type Square = {
  size: number;
};

type Rectangle = {
  width: number;
  height: number;
};

type Shape = Square | Rectangle;

function area(shape: Shape) {
  if ("size" in shape) {
    return shape.size * shape.size;
  }
  if ("width" in shape) {
    return shape.width * shape.height;
  }
}

area({ size: 2 }); // 4
area({ width: 2, height: 3 }); // 6

//--------------------------------------------- Discriminated Unions

type Circle = {
  kind: "circle";
  radius: number;
};

type Square2 = {
  kind: "square";
  size: number;
};

type Rectangle2 = {
  kind: "rectangle";
  width: number;
  height: number;
};
type Shape2 = Circle | Square2 | Rectangle2;

function area2(shape: Shape2) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
  if (shape.kind === "square") {
    return shape.size * shape.size;
  }
  if (shape.kind === "rectangle") {
    return shape.width * shape.height;
  }
}

type ValidationSuccess = {
  isValid: true;
  validatedValue: string;
};

type ValidationFailure = {
  isValid: false;
  errorReason: string;
};

type ValidationResult = ValidationSuccess | ValidationFailure;

function logResult(result: ValidationResult) {
  if (result.isValid) {
    console.log("Success, validated value:", result.validatedValue);
  }
  if (result.isValid === false) {
    console.log("Failure, error reason:", result.errorReason);
  }
}

//--------------------------------------------- Class Parameter Properties

class Person2 {
  constructor(public name: string, public age: number) {}
}

const adam = new Person2("Adam", 120000);
console.log(adam.name, adam.age); // 'Adam', 120000

//--------------------------------------------- Strict Compiler Option

function add(first: number, second: number) {
  return second + first;
}

add(1, 2); // 3

class Point2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }
}

// Create
const point2 = new Point2(0, 0);

// Use
point2.move(1, 3);
console.log(point2.x, point2.y); // 1, 3

type User = {
  name: string;
  age: number;
};

const users: User[] = [
  { name: "Oby", age: 12 },
  { name: "Heera", age: 32 },
];

function getUserAge(name: string): number {
  const user = users.find(user => user.name === name);
  if (user == null) {
    throw new Error(`User not found: ${name}`);
  }
  return user.age;
}

//--------------------------------------------- Null versus Undefined

let notDefined: undefined = undefined;
let notPresent: null = null;

class Point3 {
  x: number;
  y: number;
}

const center = new Point3();
center.x = 0;
// center.y = 0;

console.log(center.x, center.y); // 0, undefined

function logVowels(value: string) {
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

const result = someBooleanOrNullOrUndefined();
if (result == null) {
  console.log("Null or Undefined", result); // null | undefined
}
if (result != null) {
  console.log("Boolean", result); // true | false
}

function decorate(value: string | null | undefined) {
  if (value == null) {
    return value;
  }
  return `-- ${value.trim()} --`;
}

console.log(decorate("Hello")); // -- Hello --
console.log(decorate("Hello World   ")); // -- Hello World --

console.log(decorate(null)); // null
console.log(decorate(undefined)); // undefined

//--------------------------------------------- Intersection types

type Point2D = {
  x: number;
  y: number;
};

type Point3D = Point2D & {
  z: number;
};

type Person3 = {
  name: string;
};

type Email = {
  email: string;
};

type Phone = {
  phone: string;
};

type ContactDetails = Person3 & Email & Phone;

function contact(details: ContactDetails) {
  console.log(`Dear ${details.name}.
  I hope you received our email at ${details.email}.
  We will call you at ${details.phone} shortly.`);
}

contact({
  name: "John",
  email: "howdy@example.com",
  phone: "1337",
});

//--------------------------------------------- Optional modifier

type Person4 = {
  name: string;
  email: string;
  phone?: string;
};

const bruce: Person4 = {
  name: "Bruce",
  email: "belt@example.com",
  phone: "911",
};

const alfred: Person4 = {
  name: "Alfred",
  email: "alfred@example.com",
};

console.log(alfred.phone); // undefined

class Point4 {
  x?: number | null;
  y?: number;
}

const point3 = new Point4();

console.log(point3.x); // undefined

point3.x = 0;
point3.x = undefined;
point3.x = null;

//--------------------------------------------- Non-null Assertion Operator

class Point5 {
  x: number;
  y: number;
}

function initialize(): Point5 {
  return { x: 0, y: 0 };
}

const point4 = initialize();
console.log("After initialized", point4.x, point4.y);

type Person5 = {
  name: string;
  email?: string | null | undefined;
};

function sendEmail(email: string) {
  console.log("Sent email to", email);
}

function contact2(person: Person5) {
  if (person.email == null)
    throw new Error(`Person ${person.name} is not contactable`);
  sendEmail(person.email!);
}

//--------------------------------------------- Interfaces

interface Point2D2 {
  x: number;
  y: number;
}

interface Point3D2 extends Point2D2 {
  z: number;
}

export const point5: Point3D2 = {
  x: 0,
  y: 0,
  z: 0,
};

//--------------------------------------------- Interface Declaration Merging

// Express Base
export interface Request {
  body: any;
}

// Express JSON
export interface Request {
  json: any;
}

// Our App
function handleRequest(req: Request) {
  req.body;
  req.json;
}

//--------------------------------------------- Types versus Interfaces

export interface InputProps {
  type: "text" | "email";
  value: string;
  onChange: (newValue: string) => void;
}

type InputOnChange = (newValue: string) => void;

type InputValue = string;

type InputType = "text" | "email";

export type InputProps2 = {
  type: InputType;
  value: InputValue;
  onChange: InputOnChange;
};

//--------------------------------------------- never type

const fail = (message: string) => {
  throw new Error(message);
};

const sing = function () {
  while (true) {
    console.log("Never gonna give you up");
    console.log("Never gonna let you down");
    console.log("Never gonna run around and desert you");
    console.log("Never gonna make you cry");
    console.log("Never gonna say goodbye");
    console.log("Never gonna tell a lie and hurt you");
  }
};

let example: never = 123;

type Square3 = {
  kind: "square";
  size: number;
};

type Rectangle3 = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Circle2 = {
  kind: "circle";
  radius: number;
};

type Shape3 = Square3 | Rectangle3 | Circle2;

function area3(s: Shape3) {
  if (s.kind === "square") {
    return s.size * s.size;
  } else if (s.kind === "rectangle") {
    return s.width * s.height;
  } else if (s.kind === "circle") {
    return Math.PI * s.radius ** 2;
  }
  const _ensureAllCasesAreHandled: never = s;
  return _ensureAllCasesAreHandled;
}
