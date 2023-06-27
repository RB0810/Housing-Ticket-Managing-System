import React from 'react';

class Login extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        Type: props.type,
      }
    }

    state = {}
    
    getValue = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value})
    }

    handleLogin = (event)=>{
        event.preventDefault(); //stops the reloading everytime the button is clicked
        const email = this.state.email;
        const password = this.state.password;

        console.log(this.state)
    }
    
    render(){
        return (
            <div>
              {console.log(this.state)}
                <form className='loginForm'>

                  <div>
                    <h1 className='wlcText'>{this.state.Type} Portal <br/> Login</h1>
                  </div>

                  <div>
                    <p>Create and Manage tickets!</p>
                  </div>

                  <div>
                      <label></label>
                      <input className='loginInput' type = 'text' onChange={this.getValue} name='ID'/>
                  </div>
                
                  <div>
                      <label></label>
                      <input className='loginInput' type = 'password' onChange={this.getValue} name='password'/>
                  </div>

                  <button className='loginBtn' onClick = {this.handleLogin}>Login</button>
                </form>
            </div>
        )
    }
}
    
export default Login;
