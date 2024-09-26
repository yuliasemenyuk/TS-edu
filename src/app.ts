//Decorator factory
//Now we can accept arguments - logString that will be reurned by inner decorator function
function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (target: Function) {
    console.log(logString);
    console.log(target);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function (constructor: any) {
    console.log("Rendering template");
    const hoohkEl = document.getElementById(hookId);
    const p = new constructor();
    if (hoohkEl) {
      hoohkEl.innerHTML = template;
      hoohkEl.querySelector("h1")!.textContent = p.name;
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
