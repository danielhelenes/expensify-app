import authReducer from '../../reducers/auth';
import expenses from '../fixtures/expenses';

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: '123abc'
  };
  const state = authReducer(expenses, action);
  expect(state.uid).toEqual(action.uid);
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ uid:'anything' }, action);
  expect(state).toEqual({});
});
