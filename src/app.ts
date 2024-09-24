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

function merge<T extends {}, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

console.log(merge({name: 'Max'}, {age: 30}));

const result = merge({name: 'Max'}, {age: 30});
const result2 = merge({name: 'Max', hobbies: ['Sports']}, {age: 30})

console.log(result.age);
console.log(result2.hobbies);