
// Notes: you can only resolve or reject a single time. you cannot run the command multiple times.
// you can only pass one argument to resolve/reject (can be an obj for example)

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'daniel',
      age: 27
    });
    // reject('Something went wrong!')
  },1500);
});

console.log('before');

promise.then((data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('this is my other promise');
      // reject('Something went wrong!')
    },1500);
  });
}).then((str) => { //if you return a new promise, you put then to the new promisse.
  console.log('does this run?', str);
}).catch((error) => { // catch can also be implicitely returned as the second argument of then.
  console.log('error: ', error);
});

console.log('after');
