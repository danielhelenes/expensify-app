

import moment from 'moment';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';

// test('should set text filter', () => {
//   const action = setTextfilter('dummy text');
//
//   expect(action).toEqual({
//     type: 'TEXT_FILTER',
//     text: 'dummy text'
//   })
// })

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('should generate set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

test('should generate set text filter', () => {
  const text = 'dummy'
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'TEXT_FILTER',
    text
  });
});

test('should generate default value for text filter', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'TEXT_FILTER',
    text: ''
  });
});


test('should sort by date', () => {
  expect(sortByDate()).toEqual({
    type: 'SORT_BY_DATE',
  });
});


test('should sort by amount', () => {
  expect(sortByAmount()).toEqual({
    type: 'SORT_BY_AMOUNT',
  });
});

// //SORT_BY_DATE
//
// export const sortByDate = () => ({
//   type: 'SORT_BY_DATE',
// });
//
// //SORT_BY_AMOUNT
//
// export const sortByAmount = () => ({
//   type: 'SORT_BY_AMOUNT',
// });
