abstract class Department {
  static fiscalYear = 2024;
  // private id: string;
  // private name: string;
  // only accesssible via method
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    //this.id = 'd1';
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  //"abstract" forces to overwrite method for all clases that inherits Department
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    //Cannot assign to 'id' because it is a read-only property
    // this.id ="d2"
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  // static id: string;
  constructor(id: string, public admins: string[]) {
    //'super' also before 'this'
    super(id, "IT");
    this.admins = admins;
  }

  describe() {
    console.log("IT department id:" + this.id)
  }
}

class AccountigDepartment extends Department {
  private lastReport: string;
  private static instance: AccountigDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please provide a value");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountigDepartment("d2", []);
    return this.instance
  }

  describe() {
    console.log("Accounting department id:" + this.id)
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  //overriding method
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    //Property 'employees' is private and only accessible within class 'Department'.
    // If changed to "protected" property becomes available not only in Department class
    // but also in any class that extends it
    this.employees.push(name);
  }
}

const it = new ITDepartment("d1", ["Max"]);
// const accounting = new AccountigDepartment("d2", []);
const accounting = AccountigDepartment.getInstance();
const accounting2 = AccountigDepartment.getInstance();

//same instance
console.log(accounting, accounting2);

it.addEmployee("Max");
it.addEmployee("Lala");

accounting.addEmployee("Max");
accounting.addEmployee("Viki");

// Not possible to add this way 'cause of 'private'
// accounting.employees[2] = "Anna"

//While for name it's still possible
it.name = "New Name";

it.describe();
it.printEmployeeInformation();

console.log(it);

accounting.mostRecentReport = "Daily report";

accounting.addReport("Test report");
console.log(accounting.mostRecentReport);

// accounting.printReports();
accounting.describe();

// const accountingCopy = {name: "copy", describe: accounting.describe};

// accountingCopy.describe();
const employee1 = Department.createEmployee("Lisa");
// The static members of a class are accessed using the class name and dot notation, without creating an object e.g. <ClassName>.<StaticMember>.
console.log(employee1, Department.fiscalYear);
