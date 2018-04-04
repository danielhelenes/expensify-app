import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({ // we cannot use toBe here because {} === {} is always false. same for an array. weneed to use toEqual, that will compare properties of both objects.
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
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


test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'description',
    amount: 'amount',
    createdAt: 'createdAt',
    note: 'note'
  };

  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });

});

test('should setup add expense action object with default values', () => {
  const expenseData = {};

  const defaultData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense:{
      ...defaultData,
      id: expect.any(String) // important method expect.any(Number or String i.e)
    }
  });
});

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
