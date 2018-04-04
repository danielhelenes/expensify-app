//since we don't have any jsx, we don't need to import react.

import uuid from 'uuid';

 export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note, // this is the same of note: note
    amount,
    createdAt
  }
})

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
})

// EDIT EXPENSES

export const editExpense = (id, updates) => ({ //we don't need defaults here.
  type: 'EDIT_EXPENSE',
  id,
  updates
});
