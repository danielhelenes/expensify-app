import React from 'react';
import { connect } from 'react-redux'; //connect to send this data to the store.
import ExpenseForm from './ExpenseForm';// ExpenseForm to get data from ExpenseForm and use the props. (dispatch, history, location, match, etc.... and expense!)
import { editExpense, removeExpense } from '../actions/expenses';


export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense); //can also use props.math.params.id
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.removeExpense({id: this.props.expense.id});
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense} //this props.expense is from the store. but ExpenseForm can access props.expense to get this value.
          onSubmit={this.onSubmit}
        />
        <button
          onClick={this.onRemove}
          >Remove
        </button>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => { //we do that to find the array that matches the id of props.match.parms.id
      return expense.id === props.match.params.id; //this will return true for when the condition is valid, and then add this to the expense.
    })
});

const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (expense) => dispatch(editExpense(expense)),
    removeExpense: (data) => dispatch(removeExpense(data)) //question - didnt understand why to pass props and data. 
})


export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
