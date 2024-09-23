//Same with interfaces
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

//ElevatedEmployee combines properties from two types as intersection works for objects
type ElevatedEmployee = Admin & Employee;

// interface ElevatedEmployee extends Admin, Employee {...}

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

//Universal type is number as intersection takes only common for union types
type Universal = Combinable & Numeric;

//Function overloads
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;

function add(a: Combinable, b: Combinable) {
  //*A type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  //*
  return a + b;
}

const result = add(1, " max");
result.split(" ");

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log("Name:" + emp.name);
//   //*Type guards
//   //typeof won't help anynore to check if emp has privileges property, so we need another check
//   if ("privileges" in emp) {
//     console.log("Privileges:" + emp.privileges);
//   }
//   if ("startDate" in emp) {
//     console.log("Started:" + emp.startDate);
//   }
// }

// printEmployeeInformation(e1);

// class Car {
//   drive() {
//     console.log("Driving...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("Driving a truck...");
//   }

//   loadCargo(amount: number) {
//     console.log("Loading cargo..." + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   //*A type guard for class
//   // if ('loadCargo' in vehicle) {
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(4);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);

// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case "bird":
//       speed = animal.flyingSpeed;
//       break;
//     case "horse":
//       speed = animal.runningSpeed;
//   }
//   console.log("Moving with speed:" + speed);
// }

// moveAnimal({ type: "bird", flyingSpeed: 10 });

// //Type Casting
// // 2 options:
// // const element = <HTMLInputElement>document.getElementById('message-output')!;
// const element = document.getElementById("message-output")! as HTMLInputElement;
// //+alternative:
// // const element = document.getElementById('message-output');
// // if (element) {
// //     (element as HTMLInputElement).value = "Hi, there"
// // }
// element.value = "Hi, there!";
