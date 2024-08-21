class Department {
  // private id: string;
  // private name: string;
  // only accesssible via method
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    //this.id = 'd1';
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`)
  }

  addEmployee(employee: string) {
    //Cannot assign to 'id' because it is a read-only property
    // this.id ="d2"
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees)
  }
};

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    //'super' also before 'this'
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountigDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports)
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
const accounting = new AccountigDepartment('d2', [])

it.addEmployee('Max');
it.addEmployee('Lala');

accounting.addEmployee('Max');
accounting.addEmployee("Viki");

// Not possible to add this way 'cause of 'private'
// accounting.employees[2] = "Anna"

//While for name it's still possible
it.name = "New Name"

it.describe();
it.printEmployeeInformation();

console.log(it);

accounting.addReport("Test report");
accounting.printReports();

// const accountingCopy = {name: "copy", describe: accounting.describe};

// accountingCopy.describe();
