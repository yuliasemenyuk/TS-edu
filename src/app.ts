// const names: Array<string> = ["Max", "James"]; //string[]
// // names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Done");
//   }, 2000);
// });

// promise.then(data => {
//     data.split(" ")
// })

function merge<T extends {}, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: "Max" }, { age: 30 }));

const result = merge({ name: "Max" }, { age: 30 });
const result2 = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });

console.log(result.age);
console.log(result2);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(el: T): [T, string] {
  let descriptionText = "Got no value.";

  if (el.length === 1) {
    descriptionText = "Got 1 element";
  } else if (el.length > 1) {
    descriptionText = "Got " + el.length + " elements";
  }
  return [el, descriptionText];
}

console.log(countAndDescribe(["Hi there", ""]));

function extarctAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]
}

console.log(extarctAndConvert({name: "Anna"}, "name"));

//The difference between generic and union types is that
// in case of union types we don't define here that it is eather 
// array of string | number | boolean, array can have mixed types values
//while generic defines that we should have same type values
class DataStorage2 {
    private data: (string | number | boolean)[] = [];
    //this will cause an error on further methods as there are still string | number | boolean type
    //private data: (string[] | number[] | boolean[]) = [];

    addItem(item: string | number | boolean) {
        this.data.push(item)
    }

    removeItem(item: string | number | boolean) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
      return [...this.data]
    }
}

class DataStorage<T
//better specify only for primitives
// extends string | number | boolean
> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
      return [...this.data]
    }
}

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(33);
numberStorage.removeItem(10);
console.log(numberStorage.getItems());


const textStorage = new DataStorage<string>();
textStorage.addItem("Leo");

const objectStorage = new DataStorage<object>();
const idiObj = {name: "Idi"}
// objectStorage.addItem({name: "Idi"});
objectStorage.addItem(idiObj);
objectStorage.addItem({name: "Karl"});

//Actually it removes the last ellement of the array, 
//cause each object is a different 'cell' in memory, so indexOf is -1,
// and splice removes the last el, so additional check is added
//and we pass a referense to exact same obj
// objectStorage.removeItem({name: "Idi"});
objectStorage.removeItem(idiObj)
console.log(objectStorage.getItems())

interface CourseGoal {
    title: string;
    description: string;
    completeUtill: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
   let courseGoal: Partial<CourseGoal> = {};
   courseGoal.title = title;
   courseGoal.description = description;
   courseGoal.completeUtill = date;

   return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ["Max", "Sandra"];
//These methods dont's work due to Readonly
// names.push("Linda");
// names.pop();

