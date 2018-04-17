import { login, logout } from '../../actions/auth';

test('should call login', () => {
  const action = login('123abc');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: '123abc'
  })
});

test('should call logout', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  })
});
