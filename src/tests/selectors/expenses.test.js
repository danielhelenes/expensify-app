import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }

  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[2], expenses[1]]);

});


test('should filter by start date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };

  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[2], expenses[0]]);
});


test('should filter by end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  };

  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[0],expenses[1]]);
});



test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };

  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});



test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };

  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});




//
// export default (expenses, { text, sortBy, startDate, endDate }) => { //expenses = complete array of all expenses. instead of using filters, we just destructured.
//   return expenses.filter((expense) => {
//     const createdAtMoment = moment(expense.createdAt);
//
//     const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true; //see moment doc.
//     const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
//     const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
//
//     return startDateMatch && endDateMatch && textMatch; //if returns true, the item stays in the array.
//
//   }).sort((a, b) => {
//     if (sortBy === 'date') {
//       return a.createdAt < b.createdAt ? 1: -1; // 1 = b comes first. -1 = a comes first
//     }else if (sortBy === 'amount') {
//       return a.amount < b.amount ? 1: -1;
//     }
//   });
// };
//
//
//
//
























//
