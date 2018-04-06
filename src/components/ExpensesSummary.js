import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

//expense count = how many expenses are visible
// expenses total =  what's the total of visible expenses

export const ExpensesSummary = ({expenses, total}) => ( //I used props before. and then props.expenses.length = also possible.
  <div>
    <h2>Viewing {expenses.length === 1 ? `${expenses.length} expense`: `${expenses.length} expenses`} totalling {numeral(total / 100).format('$0,0.00')}</h2>
  </div>
);

// numeral(props.total / 100).format('$0,0.00')

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenses: visibleExpenses, //I could get visibleExpenses.length here. this would make things change in the component and test
    total: getExpensesTotal(visibleExpenses)
  }
}


export default connect(mapStateToProps)(ExpensesSummary);
