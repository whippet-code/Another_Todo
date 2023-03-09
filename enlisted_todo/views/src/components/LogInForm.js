// form component used for log in and sign up
// contitional rendering is used to determine which form is displayed, depending upon the props passed to the component

function LogInForm(props) {
  if (props.form === "logIn") {
    return <h5>Log In Form</h5>;
  } else {
    return <h5>Sign Up Form</h5>;
  }
}

export default LogInForm;
