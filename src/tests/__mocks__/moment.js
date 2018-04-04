// import moment from 'moment'; //doesn't work in this case. we need to call the real moment library.
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
}
