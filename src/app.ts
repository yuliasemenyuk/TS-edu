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
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
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
    };
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
//TS will ignore return from Property decorator
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

//We can return something from Accessor decorator
function Log2(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log("Accessor decorator");
  console.log(target, name, descriptor);
  return {};
}

//We can return something from Accessor decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log("Method decorator");
  console.log(target, name, descriptor);
  return {};
}

//TS will ignore return from Parameter decorator
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

function Autobind(
  _: any,
  _2: string | Symbol | number,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      //this will refer to the object on which we originally defined the method
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return adjDescriptor;
}
class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
//if we're using event listener 'this' have not the same context as in case if
//we just call p.showMessage, so on click we've got undefined

//But with @Autobind on showMessage method it's fixed
button.addEventListener("click", p.showMessage);

//Vanilla JS OPTION TO FIX:
// button.addEventListener('click', p.showMessage.bind(p));

//--------------------------------
const registeredValidators: ValidatorConfig = {};
class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("Invalid input, please try again");
    return;
  }
  console.log(createdCourse);
});

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}
