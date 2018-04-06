import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

//expense count = how many expenses are visible
// expenses total =  what's the total of visible expenses

const ExpensesSummary = (props) => (
  <div>
    <h2>Viewing {props.expenses.length} expenses totalling {numeral(props.total / 100).format('$0,0.00')}</h2>
  </div>
);

// numeral(props.total / 100).format('$0,0.00')

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
    total: getExpensesTotal(selectExpenses(state.expenses, state.filters))
  }
}


export default connect(mapStateToProps)(ExpensesSummary);
