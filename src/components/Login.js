import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Type: props.type,
    };
  }

  getValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.props[name](value); // Use the provided setter function from props
  };

  handleLogin = (event) => {
    event.preventDefault(); // Stops the reloading every time the button is clicked
    this.props.handleLogin(event); // Call the provided handleLogin function from props
  };

  render() {
    return (
      <div>
        <form className='loginForm'>
          <div>
            <h1 className='wlcText'>
              {this.state.Type} Portal <br /> Login
            </h1>
          </div>
          <div>
            <p>Create and Manage tickets!</p>
          </div>

          <div>
            <label></label>
            <input
              className='loginInput'
              type='text'
              onChange={this.getValue}
              name='setID' // Use the corresponding setter function name as the name attribute
            />
          </div>

          <div>
            <label></label>
            <input
              className='loginInput'
              type='password'
              onChange={this.getValue}
              name='setPassword' // Use the corresponding setter function name as the name attribute
            />
          </div>

          <button className='loginBtn' onClick={this.handleLogin}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
