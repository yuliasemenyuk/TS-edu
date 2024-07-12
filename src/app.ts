class Department {
  name: string;
  // only accesssible via method
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log("Department:" + this.name)
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees)
  }
};

const accounting = new Department("Accounting");

accounting.addEmployee('Max');
accounting.addEmployee('Lala');

// Not possible to add this way 'cause of 'private'
// accounting.employees[2] = "Anna"

//While for name it's still possible
accounting.name = "New Name"

accounting.describe();
accounting.printEmployeeInformation();

console.log(accounting);

// const accountingCopy = {name: "copy", describe: accounting.describe};

// accountingCopy.describe();
