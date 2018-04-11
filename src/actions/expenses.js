//since we don't have any jsx, we don't need to import react.

// what is happening before integrating with firebase:
// 1. component calls action generator
// 2. action generator returns object
// 3. component dispatches object
// 4. redux store changes

// 1. component calls action generator (component will call the function and not the object)
// 2. action generator returns a function (thunk has to be installed and imported)
// 3. component dispatches function
// 4. function runs

import uuid from 'uuid';
import database from '../firebase/firebase';

 export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});


export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => { //this only works because of redux-thunk
    const {
       description = '',
       note = '',
       amount = 0,
       createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};


/*
// action above is the same as the one below:
export const addExpense = (anything = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description: anything.description,
    note: anything.note, // this is the same of note: note
    amount: anything.amount,
    createdAt: anything.createdAt
  }
})*/


// REMOVE EXPENSES

export const removeExpense = ({id} = {}) => ({ //question: Why do we need the default here?
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT EXPENSES

export const editExpense = (id, updates) => ({ //we don't need defaults here.
  type: 'EDIT_EXPENSE',
  id,
  updates
});
