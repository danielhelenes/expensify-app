//Important notes:
// 1. we installed: yarn add react-router-dom@4.2.2.  in react-router-dom there are two props = BrowserRouter and routes that we use. (can see the documentation)
// 2. route has to be inside of BrowserRouter and it has to have length of 1. so that's why we place a div to cluther routes inside.
// 3. set up different routes. to be able to see the route /create, we need to tweak the dev-server. because the browser tries to route through the server, not client-side route. we need to send back index.html for all routes. for that we created this in the webpack.config: historyApiFallback: true
// 4. exact means that the browser will look for the exact (as props) text we pass in. (exact={true})
// 5. import switch to run and stop when there is a match in the url.
// 6. import link to override the full page refresh behavior(link = event listenner)
// 7. Import NavLink => better for navs. Navlink also requires an exact property to not always show the dashboard
// 8. we moved all the code in this page to AppRouter.js, and we created a stateless function to be able to export it with all the route paths. We finished importing it here.
// 9. ReactRouter passes some props to the component that is inside of a <Route />. we used the prop.match.params.id to fetch an id from the url. this is only passed to the components that are inside of Route. Header for example is outside, and we therefore cannot pass this props. the idea is to will dinamically direct users to an id url and render the component that edits the expense with that id.
// 10. Provider will provide us the store to every component we want to have access to the store. to use provide, u just add a const that will return a jsx with the store as a prop in Provider and the AppRouter that is the core of your application.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore'; // configureStore can be any name. when we call a default we can name it whatever we like.
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
console.log('running well');

const store = configureStore(); // this is the same of createStore(combineReducers({reducers}).

const jsx = (
  <Provider store = {store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));

    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
















//
