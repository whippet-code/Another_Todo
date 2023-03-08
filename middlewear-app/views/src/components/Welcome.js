// Welcome component
// simple landing page with conditional rendering of two buttons to allow user to log in or for new user to register or a login signup form
// use state to determine what to render
// add listeners to buttons and depending upon which is clicked render the appropriate form

// need to think abou this to get correct rendering. On load should be two buttons. Then once a button is clicked the correct version of the form will be rendered. Need to use state to determine what to render

function Welcome(props) {
  return (
    <div className="welcome">
      <h3>Welcome</h3>
      <button>Log In</button>
      <button>Sign Up</button>
    </div>
  );
}

export default Welcome;
