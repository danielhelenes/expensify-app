import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';



test('should render 0 expenses and 0 total if empty array', () => {
  const expenses = [];
  const total = getExpensesTotal(expenses);
  const wrapper = shallow(<ExpensesSummary expenses={expenses} total={total}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with 1 expenses', () => {
  const expenses = [{
    description: 'coffee',
    amount: 10
  }]
  const total = getExpensesTotal(expenses);
  const wrapper = shallow(<ExpensesSummary expenses={expenses} total={total}/>);
  expect(wrapper).toMatchSnapshot();
});



test('should render ExpensesSummary with multiple expenses', () => {
  const total = getExpensesTotal(expenses);
  const wrapper = shallow(<ExpensesSummary expenses={expenses} total={total}/>);
  expect(wrapper).toMatchSnapshot();
});



//snapshots
