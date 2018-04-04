import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper; // all these props are from the mapStateToProps and mapDispatchToProps (wrapper isn't and filter is being fetched from the fixture file. )

beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setTextFilter ={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
    />)
});

test('Should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should handle text changed', () => {
  const value = filters.text;
  wrapper.find('input').simulate('change', {
    target: {value}
  });

  expect(setTextFilter).toHaveBeenLastCalledWith(filters.text);
  expect(wrapper).toMatchSnapshot();
});

test('should sort by dates', () => {
  const value = altFilters.sortBy;
  wrapper.setProps({filters: altFilters});
  wrapper.find('select').simulate('change', {
    target: {value}
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const value = filters.sortBy;
  wrapper.find('select').simulate('change', {
    target: {value}
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const startDate = altFilters.startDate;
  const endDate = altFilters.endDate;
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate,endDate})
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const calendarFocused = 'startDate'; //this can be only null, start or enddate.
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
