interface Named {
    readonly name: string;
}
interface Greetable extends Named {
  greet(phrase: string): void;
}

interface Another {

}

class Person implements Greetable, Another {
    name: string;
    age = 30;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string): void {
        console.log(phrase + " " + this.name);
    }
}

let user1: Greetable;
// let user1: Person;

user1 = new Person ("Max");
// user1.name = "Andrew" - doesn't work due to "readonly" in interface

user1.greet("Hi there, I'm");
console.log(user1);