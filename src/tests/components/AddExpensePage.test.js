import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let onSubmit, history, wrapper;

beforeEach(() => { //jest: lifecycle method. runs this callback function everytime before each test runs.
  onSubmit = jest.fn();
  history = { push: jest.fn() }; //push is an object
  wrapper = shallow(<AddExpensePage addExpense={onSubmit} history={history}/>);

})


test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

//call spys with correct data.

test('should call spys with correct date when form is submitted', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(onSubmit).toHaveBeenLastCalledWith(expenses[1]);
});
