class Department {
  // private id: string;
  // private name: string;
  // only accesssible via method
  private employees: string[] = [];

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

const accounting = new Department("d1","Accounting");

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
