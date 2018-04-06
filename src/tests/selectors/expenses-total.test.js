import getExpensesTotal from '../../selectors/expenses-total';


test('should return 0 if no expenses', () => {
  const expense = [];
  const state = getExpensesTotal(expense);
  expect(state).toBe(0);
});

test('should correctly add up a single expense', () => {
  const expense = [{
    id: '1',
    description: 'Surf wax',
    note: '',
    amount: 100,
    createdAt: 0
  }];
  const state = getExpensesTotal(expense);
  expect(state).toBe(100);

})

test('should correctly add up a single expense', () => {
  const expense = [{
      id: '1',
      description: 'Surf wax',
      note: '',
      amount: 100,
      createdAt: 0
    },
    {
      id: '2',
      description: 'Surf board',
      note: '',
      amount: 10000,
      createdAt: 0
    },
    {
      id: '3',
      description: 'Surfshop',
      note: '',
      amount: 500000,
      createdAt: 0
    }

  ];
  const state = getExpensesTotal(expense);
  expect(state).toBe(expense[0].amount + expense[1].amount + expense[2].amount);

})
