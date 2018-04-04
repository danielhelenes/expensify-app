

console.log('working');

import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ADD EXPENSES
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
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

const editExpense = (id, updates) => ({
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


// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => {
        return expense.id !== action.id; /
      });

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
      return a.createdAt < b.createdAt ? 1: -1;
    }else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1: -1;
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


store.subscribe(() => {
  const state = store.getState();
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




//
