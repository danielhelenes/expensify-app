// export a stateless functional component
// description, amount, createdAt
// use map in expenseList.js

import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


const ExpenseListItem = ({ id, description, amount, createdAt }) => (//props is not defined. console logs each expenses object with amount, createdat, etc... but not expenses in general  (it lists all the objects of items)
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
  </Link>
);

export default ExpenseListItem;



// -----------------------------//////////////// -----------------------------//////////////


//Same as above:
// const ExpenseListItem = (props) =>  ( //props is not defined. console logs each expenses object with amount, createdat, etc... but not expenses in general  (it lists all the objects of items)
//   <div>
//     <Link to={`/edit/${props.id}`}>
//       <h3>{props.description}</h3>
//     </Link>
//     <p>{props.amount} - {props.createdAt}</p>
//   </div>
// );

// MY SOLUTION => passing mapStateToProps!

// const ExpenseListItem = (props) => (
//   <div>
//     <h3>{props.description}</h3>
//     <h3>{props.id}</h3>
//     <p>{props.amount} - {props.createdAt}</p>
//     <button onClick={() => props.dispatch(removeExpense({id: props.id}))}>Remove</button>
//   </div>
// );
//
// const mapStateToProps = (state) => {
//   return {
//     expenses: state.expenses
//   }
// };
//
// export default connect(mapStateToProps)(ExpenseListItem);

// -----------------------------//////////////// -----------------------------//////////////
