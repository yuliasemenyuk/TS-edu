//Decorator
//executes when class is defined, not whenwe use class
function Logger(target: Function) {
    console.log('Logging...');
    console.log(target);
}
@Logger
class Person {
    name = "Max";

    constructor() {
        console.log("Creating person object...")
    }
}

const person = new Person()
console.log(person)