import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({ // we cannot use toBe here because {} === {} is always false. same for an array. weneed to use toEqual, that will compare properties of both objects.
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
});

test('should remove expenses from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});



test('should setup edit expense action object', () => {
  const action = editExpense( '123abc', { note: 'New note value' });
  expect(action).toEqual({ // we cannot use toBe here because {} === {} is always false. same for an array. weneed to use toEqual, that will compare properties of both objects.
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  })
});

test('should edit expenses from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  const updates = { amount: 21045 };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  });
});



test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

//should add expense to database and store
test('should add expense to database and store', (done) => { //done is passed to tell jest that we are waiting for an asyncronious function.
  const store = createMockStore({});
  const expenseData = {
    description: 'Rent',
    note: '',
    amount: 3000,
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => { //this id is the one generated by firebase
    expect(snapshot.val()).toEqual(expenseData);
    done();;
  });
});


//should add expense with defaults to database and store
test('should add expense with default values to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {};
  const defaultExpenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultExpenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => { //this id is the one generated by firebase
    expect(snapshot.val()).toEqual(defaultExpenseData);
    done();;
  });
});


test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});



// test('should setup add expense action object with default values', () => {
//   const expenseData = {};
//
//   const defaultData = {
//     description: '',
//     note: '',
//     amount: 0,
//     createdAt: 0
//   };
//
//   const action = addExpense(expenseData);
//
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense:{
//       ...defaultData,
//       id: expect.any(String) // important method expect.any(Number or String i.e)
//     }
//   });
// });

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
