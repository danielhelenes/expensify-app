// for this test we need to create a mock of the moment library.
import moment from 'moment';
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm  expense={expenses[1]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { } //we create this to prevent error in the test
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0); //since we are expecting an error, and an error in this case throws an error string with length greater than 0, we check the length of the string error.
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'New description'; // we pass a new value to target. we simulate/fake a value.
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New note'; // we pass a new value to target. we simulate/fake a value.
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set Amount on input change', () => {
  const value = '11.00'; // we pass a new value to target. we simulate/fake a value.
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set invalid amount on input change', () => {
  const value = '11.920'; // we pass a new value to target. we simulate/fake a value.
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy}/>);

  wrapper.find('form').simulate('submit', {
    preventDefault: () => { } //we create this to prevent error in the test
  });

  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({ // because we don't have id, we cannot pass {...expenses[1]}
    description: expenses[1].description,
    note: expenses[1].note,
    amount: expenses[1].amount,
    createdAt: expenses[1].createdAt
  });

});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now); //I'm calling onDateChangewith (now)
  expect(wrapper.state('createdAt')).toBe(now);
});


test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused }); //I'm calling onDateChangewith (now)
  expect(wrapper.state('calendarFocused')).toBe(focused);
});











































//
