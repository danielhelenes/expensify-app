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
  return (dispatch, getState) => { //this only works because of redux-thunk
    const uid = getState().auth.uid;
    const {
       description = '',
       note = '',
       amount = 0,
       createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
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



// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then((snapshot) => {
        dispatch(removeExpense({ id }));
      });
    };
  };


// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    });
  };
};


// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

//start set expenses

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => { //snapshots brings all objects, not arras. we need to convert the data into an array.
      const expenses = [];
        snapshot.forEach((childSnapshot) => { //childSnapshot are the current objects
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
       dispatch(setExpenses(expenses));
    });
  };
};
