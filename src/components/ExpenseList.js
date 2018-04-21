import React from 'react';
import { connect } from 'react-redux'; //connects your component to the redux store.
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// Unconnected component

export const ExpenseList = (props) => ( //didn't have console.
// console.log(props); //have access to expenses and dispatch

  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No expenses</span>
          </div>
        ) : (
            props.expenses.map((expense) => {//expense is the current obj you are mapping through.
              return <ExpenseListItem key={expense.id} {...expense} />; // this spread operator is actually composed of amount, description etc... that is actually the props used in ExpenseListItem as arguments. intead of the spread, we could have used id={expense.id} amount={expense.amount}
            })
          )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList); // we need to have this setup ('what information from the store we want to connect')('where we want this connection to go') because of their API. because we setup this connect call, expenseList will have access to the props of the object passed in mapStateToProps. this export default connects mapStateToProps with ExpenseList.
