// 1. yarn add redux@3.7.2
// 2. import function createStore from redux library.using createStorewe can setup a function with parameters (the first one is the current state and we can set it to a default value object. in our case, count : 0). then we can use getState() in order to receive the returned value.
// 3. we will use store.dispatch() method to send the object we want to send to the store. in the store functionwe can access action.type via the action parameter to return whatever action we want based on that action.
// 4. action is an object that has a type (it can also have more properties). whe use store.dispatch to send this action object to the const store. we can then use action in the parameter and action.type to get the many type results the action object can have. TYPE IS MANDATORY
// 5. Watch for changes to the store. we use store.subscribe() that is a function that contains another function that is called everytime we have a change in the store.
// 6. we can unsubscribe (stop watching for changes) whenever we want by setting up a const unsibscribe = store.subscribe and then calling this function unsubscribe();

// 7. Action generators. function that returns action objects. it's better so you don't misspell anything. all of the action objects will be changed to action generators (functions). we can then pass parameters to this functions, that are objects. we don't need tio setup a const = {} and thne use i.e payload.incrementBy. with destructuring, we can use incrementBy directly on the object we pass in the function, also making use of a default value. when we call the function using dispatch, we send the object value to the store. instead of using payload.incrementBy because payload is an empty object payload = {}, we use incrementBy directly and don't even mention payload by doing: ({incrementBy} = {}).
//meaning => payload = {} , and then using payload.incrementBy is the same of {incrementBy} = {}. incrementBy is a property of an object that was not even defined.

// 8. Reducer concept = we take out all of the code inside store and pasted in a reducer called countReducer. Reducers are pure functions. the output is only determined by the input (what we pass in => state and action. nothing comes from the outside. everything comes from inside the function. nothing is changed outside the reducer.) nothing interacts with things from outside of the reducer function scope. In reducer we never change the parameters state and action.we will always return the state in a new object return { count: state.count etc...}



import { createStore } from 'redux';

// const incrementCount = (payload = {}) => ({
//   type: 'INCREMENT',
//   incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

// code below to the next level using destructuring:

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy //this is the same as incrementBy: incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({setBy = 10} = {}) => ({
    type: 'SET',
    setBy
});

const resetCount = () => ({
    type: 'RESET',
});

// Reducers

const countReducer = (state = { count: 0 }, action) => { //Remember => action is an object that was set up below with different types.
  switch(action.type) {
    case 'INCREMENT':
      return{
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET' :
      return {
        count: action.setBy
      }
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
};


const store = createStore(countReducer);

store.subscribe(() => {
  console.log(store.getState());
})

// Actions = object that gets sent to the store (increment, decrement, reset, etc...)

//I'd like to increment the count
//
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });


// INCREMENT
store.dispatch(incrementCount({ incrementBy: 5}));
store.dispatch(incrementCount());

// DECREMENT
store.dispatch(decrementCount({decrementBy: 20}));


//RESET
store.dispatch(resetCount());

//SET
store.dispatch(setCount({setBy: 100}));


// store.dispatch({
//   type: 'RESET'
// });
//
//
// store.dispatch({
//   type: 'DECREMENT',
//   decrementBy: 10
// });
//
// store.dispatch({
//   type: 'SET',
//   count: 101
// });
