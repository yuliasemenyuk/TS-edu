//Decorator factory
//Now we can accept arguments - logString that will be reurned by inner decorator function
function Logger(logString: string) {
    return function(target: Function) {
        console.log(logString);
        console.log(target);
    }
}

//Now we should call decorator - () and it will return a decorator function
@Logger("LOGGING - PERSON")
class Person {
    name = "Max";

    constructor() {
        console.log("Creating person object...")
    }
}

const person = new Person()
console.log(person)