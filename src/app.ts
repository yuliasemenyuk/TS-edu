const names: Array<string> = ["Max", "James"]; //string[]
// names[0].split(' ');

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Done");
  }, 2000);
});

promise.then(data => {
    data.split(" ")
})