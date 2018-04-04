import React from 'react';
import selectExpenses from '../selectors/expenses';
import { connect } from 'react-redux'; //connects your component to the redux store.



const HelpPage = (props) => {
console.log(props);
return (
  <div>This is from my help component</div>
);
}


const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(HelpPage);
