class Person {
  private _age: number;
  constructor(_age: number) {
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
