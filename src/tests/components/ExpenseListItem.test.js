import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render expense list item correctly', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[1]}/>);
  expect(wrapper).toMatchSnapshot();

});











//
// const ExpenseListItem = ({ id, description, amount, createdAt, note }) =>  ( //props is not defined. console logs each expenses object with amount, createdat, etc... but not expenses in general  (it lists all the objects of items)
//   <div>
//     <Link to={`/edit/${id}`}>
//       <h3>{description}</h3>
//     </Link>
//     <p>{amount} - {createdAt} / {note && `/ ${note}`}</p>
//   </div>
// );
//
// export default ExpenseListItem;
