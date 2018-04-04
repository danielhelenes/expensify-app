import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => { //jest: lifecycle method. runs this callback function everytime before each test runs.
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() }; //push is an object
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
      expense={expenses[2]}
    />
  );
})


test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

//call spys with correct data for edit expense.

test('should call spys with correct data when form is submitted', () => {
  const editedData = {
    amount: 'amount_edited',
    description: 'description_edited'
  };
  wrapper.find('ExpenseForm').prop('onSubmit')(editedData); //didn't understand why he passed expenses[2] here. shouldn't have an id, should it?
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, editedData);
});



//call spys with correct data for remove expense.

test('should call spys with correct data when button is clicked', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[2].id});
});








//