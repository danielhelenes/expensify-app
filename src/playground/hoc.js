//High ordered component - normal component that renders another component.

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>This info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {//WrappedComponent is a conventional name. we will pass the other component in. This is a regular function that returns the high ordered component!
  //we will pass props, and destructure props into the wrapped component call, so we have access to all props. below: this is the high ordered component!
  return (props) => (
    <div>
      {props.isAdmin && <p>This is confidencial!</p>}
      <WrappedComponent {...props}/>
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>You need to login first</p>}
    </div>
  )
}

// requireAuthentication

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


// ReactDOM.render(<AdminInfo isAdmin={false} info='These are the details'/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info='These are the details'/>, document.getElementById('app'));
