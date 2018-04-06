import expenses from '../tests/fixtures/expenses';
import numeral from 'numeral';

export default (expenses) => {
  return expenses // we broke into multiple lines so it's easier to read.
  .map((cur) => cur.amount)
  .reduce((sum, value) => sum + value, 0);
};




//first solution

// export default (expenses) => {
//   const arr = expenses.map((cur) => cur.amount);
//   const result = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//   return result;
// };
