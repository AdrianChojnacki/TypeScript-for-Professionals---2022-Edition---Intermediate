//--------------------------------------------- Lexical this

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
