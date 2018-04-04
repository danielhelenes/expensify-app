import moment from 'moment';
import filtersReducer from '../../reducers/filters';

const filters = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
}

test('should setup filters value', () => {
  const state = filtersReducer(undefined, {type: '@@INIT' });
  expect(state).toEqual({ ...filters });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});

  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {...filters, sortBy: 'amount'};

  const action = {type: 'SORT_BY_DATE'}

  const state = filtersReducer(currentState, action);

  expect(state.sortBy).toBe('date');

});


test('should set text filters', () => {
  const text = 'Some text';
  const action = {
    type: 'TEXT_FILTER',
    text
  }

  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

//start date


test('should set startDate filters', () => {
  const startDate = moment(0);
  const action = {
    type: 'SET_START_DATE',
    startDate
  }
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(startDate); //we need to use toEqual because we are comparing moment which is an object

});

// end date.
test('should set endDate filters', () => {
  const endDate = moment(0);
  const action = {
    type: 'SET_END_DATE',
    endDate
  }
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate); //we need to use toEqual because we are comparing moment which is an object

});




//
// // Filters Reducer
// {...filters, sortBy: 'amount' }
//
// const filtersReducerDefaultState = {
//   text: '',
//   sortBy: 'date',
//   startDate: moment().startOf('month'),
//   endDate: moment().endOf('month')
// };
//
// export default (state = filtersReducerDefaultState, action) => {
//   switch (action.type) {
//     case 'TEXT_FILTER':
//       return {...state, text: action.text}; // we only return the objects with text = action.text
//     case 'SORT_BY_AMOUNT':
//       return {...state, sortBy: 'amount'};
//     case 'SORT_BY_DATE':
//       return {...state, sortBy: 'date'};
//     case 'SET_START_DATE':
//       return {...state, startDate: action.startDate};
//     case 'SET_END_DATE':
//       return {...state, endDate: action.endDate};
//
//     default:
//       return state;
//   }
// };
