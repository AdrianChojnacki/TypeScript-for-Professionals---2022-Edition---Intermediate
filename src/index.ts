//--- Lexical this

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

//--- readonly modifier

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
