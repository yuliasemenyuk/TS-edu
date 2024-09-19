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

function add(a: Combinable, b: Combinable) {
  //*A type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  //*
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name:" + emp.name);
  //*Type guards
  //typeof won't help anynore to check if emp has privileges property, so we need another check
  if ("privileges" in emp) {
    console.log("Privileges:" + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Started:" + emp.startDate);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //*A type guard for class
  // if ('loadCargo' in vehicle) {
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(4);
  }
}

useVehicle(v1);
useVehicle(v2);
