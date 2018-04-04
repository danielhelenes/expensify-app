import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should setup default value to empty array', () => {
  const state = expensesReducer(undefined, {type: '@@INIT' });
  expect(state).toEqual([]);
});

// REMOVE EXPENSE TEST

test('should remove an expense', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[0].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove an expense if id is not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses); // or [...expenses]
});

// EDIT EXPENSE TEST

test('should edit an expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '1',
    updates: {
      description: 'bread'
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state[0].description).toBe('bread');
  //or
  // expect(state).toEqual([{...expenses[0], description: 'bread'}, expenses[1], expenses[2]])
});



test('should not edit an expense if expense is not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      description: 'bread'
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses)
});


// ADD EXPENSE TEST

test('should add expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      id: '4',
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  }

const state = expensesReducer(expenses, action);

expect(state).toEqual([...expenses, action.expense]);

})

//add expense
/*
test('should add expense', () => {

  const action = {
     type: 'ADD_EXPENSE',
     expense: {
       id: 'id2',
       description: 'description',
       note: 'note',
       amount: 'amount',
       createdAt: 'createdAt'
     }
  }

  const prevState = {
    id: 'id1',
    description: 'description',
    note: 'note',
    amount: 'amount',
    createdAt: 'createdAt'
  }

  const state = expensesReducer(undefined, action);

  expect(state.expense).toEqual([action.expense]);

});*/



//edit expense

//
// export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
//  type: 'ADD_EXPENSE',
//  expense: {
//    id: uuid(),
//    description,
//    note, // this is the same of note: note
//    amount,
//    createdAt
//  }
// })

//
//
//
// const expensesReducerDefaultState = [];
//
// export default (state = expensesReducerDefaultState, action) => {
//   switch (action.type) {
//     case 'ADD_EXPENSE':
//       return [...state, action.expense];
//     case 'REMOVE_EXPENSE':
//       return state.filter((expense) => {//this is the same as cur. we map through the cur object that state has. we look for the exact id inside of all the objects that has the same id of the one we are deleting, so we can delete it.
//         return expense.id !== action.id;
//       });
//
//     case 'EDIT_EXPENSE':
//     return state.map((expense) => { //this is the same as cur. we map through the cur object that state has. if the id of each cur object matches the id of the action object (the one we are editing), we return the cur object + the updates.
//       if (expense.id === action.id) {
//         return {...expense, ...action.updates}
//       }else { //for all the objects that have a different id than the one we are editing, we return the same object. nothing changes.
//         return expense;
//       }
//     });
//
//     default:
//       return state;
//   }
// };
