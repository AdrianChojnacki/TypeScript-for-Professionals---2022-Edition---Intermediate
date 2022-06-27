//--------------------------------------------- Lexical this

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
