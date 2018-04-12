//importnat: update doesn't update childs, only the root. we can provide ref as key and new value as a value.overcome: 'location/city'

//difference between promises (set, update...) and callback. callback can run infinite times. promises only runs once. you cannot tell the server to update you on changes with promises, because it only rejects or resolves it once.

//push add items with an auto generated id.

import * as firebase from 'firebase'; //import all the named exports and put in a variable called firebase

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// database.ref('notes/-L9TqkdDyYi1du3LO5fm').update({
//   body: 'buy food'
// });

// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//   console.log(Object.values(snapshot.val()));
// })
// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//   console.log(snapshot.val());
// })
//
// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//   const expenses = [];
//
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// })
//
// database.ref('expenses')
// .on('value',(snapshot) => {
//   const expenses = [];
//
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// })
//
// // Subscription when changed
// database.ref('expenses')
// .on('child_changed',(snapshot) => {
//   console.log(snapshot.ref, snapshot.val());
// });
//
//
// // Subscription when removing
// database.ref('expenses')
// .on('child_removed',(snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });
//
// // Subscription when added (different from removed and child_changed = gets called for added AND existing expenses)
// database.ref('expenses')
// .on('child_added',(snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });
//
//


// const expenses = {
//   description: 'coffee',
//   amount: 2,
//   createdAt: 0
// };






// database.ref('expenses').push(({
//   description: 'coffee',
//   amount: 2,
//   createdAt: 12415150
// }));
// database.ref('expenses').push(({
//   description: 'food',
//   amount: 20,
//   createdAt: 31310
// }));
// database.ref('expenses').push(({
//   description: 'car',
//   amount: 34222,
//   createdAt: 526260
// }));


// database.ref('notes').push({
//   title: 'To do note2',
//   body: 'This is my note2'
// })



//
// const firebaseNotes = {
//   notes: {
//     id_3131 : {
//       title: 'First note',
//       body: 'This is my note'
//     },
//     id_313312 : {
//       title: 'Second note',
//       body: 'This is my second note'
//     }
//   }
// }

// database.ref().set({
//   name: 'Daniel',
//   age: 27,
//   stressLevel: 6,
//   job: {
//     title: 'software dev',
//     company: 'Google'
//   },
//   location: {
//     city:'Lagos',
//     country:'Portugal'
//   }
// }).then(() => {
//   console.log('ok');
// }).catch((e) => {
//   console.log(e);
// });
//all these calls to the DB are assyncronous.  it doesn't mean that one line is completed before the next one starts. with promisses we will learn how/when the data change.

// database.ref('attributes').set({
//   height: 165,
//   weight: 56
// }).then(() => {
//   console.log('date changed');
// }).catch((e) => {
//   console.log('sometjing wrong duuude');
// });

// database.ref()
// .remove()
// .then(() => {
//   console.log(removed);
// }).catch((e) => {
//   console.log('error');
// })

// database.ref('isSingle').set(null); //another method to remove data

//
// const updates = {
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// }
//
// database.ref().update(updates);
//
// database.ref().once('value')
// .then((snapshot) => {
//   const val = snapshot.val();
//   console.log(val);
// })
// .catch((e) => {
//   console.log('Error fetching data', e);
// });
//
//
// //subscribing:
// const onValueChange = database.ref().on('value', (snapshot) => { // you receive all the changes for this data.
//   console.log(snapshot.val());
// }, (e) => { //catch
//   console.log('Error with data fetching', e);
// });
//
//
//
// setTimeout(() => {
//   database.ref('age').set(29);
// }, 3500);
//
// setTimeout(() => {
//   database.ref().off("value",onValueChange); //calling it again unsubscribes
// }, 7000);
//
// setTimeout(() => {
//   database.ref('age').set(30);
// }, 10500);
//
//
// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title}`);
// })
