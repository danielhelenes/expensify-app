// 1. we can use destructuring to make it easier to call a property of an object. we can create several const in one line using destructuring.
// 2. we can rename the properties with the syntax : rename.
// 3. we can set a default value for properties using = default.


console.log('destructuring');

const person = {
  name: 'Daniel',
  age: 27,
  location: {
    city: 'Burgeau',
    temp: 15
  }
}

console.log({...person});

//
// const { name: firstName = 'Anonymous', age } = person ;
//
// console.log(`${firstName} is ${age}.`);
//
// const {city, temp: temperature} = person.location;
//
// if (city && temperature) {
//   console.log(`It's ${temperature} degrees on ${city}`);
// }
//
// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// };
//
//
// const {name: publisherName = 'Self-Published'} = book.publisher;
//
// console.log(publisherName);



// Arrays
//
// //1. we can also set default for array destructuring
//
// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania'];
//
// console.log(`You are in ${address[1]} ${address[2]}`);
//
// const [, city, state = 'New York'] = address;
//
//
// console.log(`You are in ${city} ${state}`);
//
//
// const item = ['Coffee (hot)', '$2,00', '$2,50', '$2,75']
//
// const [coffee, , medium] = item;
//
// console.log(`A medium ${coffee} costs ${medium}`);
//
// console.log(...item); //spread operator (my comment)



















//
