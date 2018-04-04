// 1. we will import combine reducers so we can create multiple smaller functions and combine them together.
// 2. before, we created the reducers inside the store. this will get messy if we have multiple reducers. so the solution is to create the reducers normally, and then a store that contains a combineReducers object inside with our reducers. each property relates to the properties of how we want our redux store to look like (in demoState). this way we can call multiple reducers at the same time, and separate them into different and complex reducers.
// 3. we will use uuid to generate a unique id. later on, this will come from the DB.

console.log('working');

import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ADD EXPENSES = function with default values. we use destructuring to pass these values in the parameter. this is the same of the ex. :
// const incrementCount = (payload = {}) => ({
//   type: 'INCREMENT',
//   incrementBy: payload.incrementBy
// });

const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note, // this is the same of note: note
    amount,
    createdAt
  }
})

// REMOVE EXPENSES

const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT EXPENSES

const editExpense = (id, updates) => ({ //we don't need defaults here.
  type: 'EDIT_EXPENSE',
  id,
  updates
});


// TEXT FILTER

const setTextFilter = (text = '') => ({
  type: 'TEXT_FILTER',
  text
});

//SORT_BY_DATE

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
})

//SORT_BY_AMOUNT

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
})
//SET_START_DATE

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})
//SET_END_DATE

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})


// Expenses Reducer ==> the reducer has in state a default value if the state is not set. when we dispatch addExpense to the store, that contains both reducers, the values of addExpense will be available via action.expense.

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => { // expense comes from the add expense object that was added previously. TRUE= don't do anything. FALSE remove item. instead of putting expense and expense.id below, we just destructured id. this is id of the state array we are filtering.
        return expense.id !== action.id; //we want to remove items with same id. so if expense.id === action.id, we want to remove item, so if the expense.id !== action.id is false (meaning they are equal), we delete the item from array.  (action.id is the one we called in dispatch)
      });

//////------------------------///////////////------------------------/////////

    // case 'EDIT_EXPENSE': //MY SOLUTION!!!
    // return state.map(({id}) => {
    //   if (id === action.id) {
    //     return {...state, ...action.updates}
    //   }else {
    //     return state;
    //   }
    // });

//////------------------------///////////////------------------------/////////


    case 'EDIT_EXPENSE':
    return state.map((expense) => { //why it's not action.expense???? question in the lesson
      if (expense.id === action.id) {
        return {...expense, ...action.updates}
      }else {
        return expense;
      }
    });

    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action ) => {
  switch (action.type) {
    case 'TEXT_FILTER':
      return {...state, text: action.text};
    case 'SORT_BY_AMOUNT':
      return {...state, sortBy: 'amount'};
    case 'SORT_BY_DATE':
      return {...state, sortBy: 'date'};
    case 'SET_START_DATE':
      return {...state, startDate: action.startDate};
    case 'SET_END_DATE':
      return {...state, endDate: action.endDate};

    default:
      return state;
  }
};

// get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

  return expenses.filter((expense) => { // this can also be named as current / cur ... we only want to show the items that match. so they all need to return true so array keep untouch..
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate ;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate ;;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1: -1; //most recent coming first (1 = b comes first)
    }else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1: -1; //most expensive coming first (1 = b comes first)
    }
  })

};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

//////------------------------///////////////------------------------/////////

// My code to filter - what are the desadvantages if doing like I did? question aked in lesson 97.

// store.subscribe(() => { // return a function everytime the status change.
//   const state = store.getState(); //getting the actual state with all the objects that have been added.
//   const visibleExpenses = getVisibleExpenses(
//     state.expenses.sort((a, b) => {
//       if (state.filters.sortBy === 'date') {
//         return b.createdAt - a.createdAt;
//       }else if(state.filters.sortBy === 'amount'){
//           return b.amount - a.amount;
//       }
//     }),
//     state.filters);
//   console.log(visibleExpenses);
// });

//////------------------------///////////////------------------------/////////


store.subscribe(() => { // return a function everytime the status change.
  const state = store.getState(); //getting the actual state with all the objects that have been added.
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 500, createdAt:50000})); //startDateMatch = false || true = true
const expenseTree = store.dispatch(addExpense({ description: 'Rent', amount: 20000, createdAt:1000})); //startDateMatch = false || true = true
const expenseTwo = store.dispatch(addExpense({ description: 'red', amount: 300, createdAt:10})); //startDateMatch = false || false = false (remove item)
// store.dispatch(removeExpense({ id:expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500, description: 'Cake' } ));
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter('re'));
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
// store.dispatch(setStartDate(-2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const compare = () => {
  const state = store.getState(); //getting the actual state with all the objects that have been added.
  state.map(({createdAt}) => {
    return createdAt.sort()
  });
};


const demoState = {
  expenses: [{
    id: 'daafaga',
    description: 'January Rent',
    note: 'This was the final payment for this address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
};



//Destructuring example
// const user = {
//   name: 'Jen',
//   age: 24
// }
// console.log({...user, location: 'Philadelphia', age: 28 });













//
