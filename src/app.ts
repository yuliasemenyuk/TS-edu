//Decorator factory
//Now we can accept arguments - logString that will be reurned by inner decorator function
function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (target: Function) {
    console.log(logString);
    console.log(target);
  };
}

//Now decorator will be executed during cteation of instance of the class 
function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function<T extends {new(...args: any[]): {name: string}}> (originalConstructor: T) {
        //we're creating new class
    //new constructor function that based on the original one and keeps its original properties
    return class extends originalConstructor {
        constructor(..._: any[]) {
            //calling original constructor
            super();
            //new logic: we implement original class with new custom logic
            console.log("Rendering template");
            const hoohkEl = document.getElementById(hookId);
            if (hoohkEl) {
              hoohkEl.innerHTML = template;
              hoohkEl.querySelector("h1")!.textContent = this.name;
            }
        }
    }
  };
}

//Few decorators functions execute from bottom to up
@Logger("LOGGING...")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const person = new Person();
console.log(person);

//----------------------
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

function Log2(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor decorator");
  console.log(target, name, descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target, name, descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target, name, position);
}
class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive number");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

//Execution order: Property decorator - Accessor decorator - Parameter decorator - Method decorator
//-----------------------------------------------

//All Log1-4 decorators executes when class is defined,
//none of them executes during creating instances or call a method, etc
const p1 = new Product("Book", 20);
const p2 = new Product("Book2", 5);
