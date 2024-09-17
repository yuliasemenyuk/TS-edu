//Similar to abstract classes but no implementation details, 
//while abstract class can be a mixture of concrete implementation parts
//+ parts that should be overwriten
interface Greetable {
  name: string;
//   age: number;

  greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    age = 30;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string): void {
        console.log(phrase + " " + this.name);
    }
}

//let user1: Greetable;  - also works
let user1: Person;

user1 = new Person ("Max")

user1.greet("Hi there, I'm");
console.log(user1);