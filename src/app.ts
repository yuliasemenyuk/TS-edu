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
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

//Universal type is number as intersection takes only common for union types
type Universal = Combinable & Numeric;