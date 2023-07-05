import React from 'react';
import supabase from "../config/supabaseClient";

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


    handleLogin = async (event) => {
      event.preventDefault();
      const { ID, password, Type } = this.state;
    
      try {
        const { data, error } = await supabase
          .from(`${Type}Users`)
          .select('*')
          .eq(`${Type}Email`, ID);
    
        if (error) {
          throw error;
        }
    
        const user = data[0];
        console.log(user);

        if (user && user[`${Type}Password`] === password) {
          const redirectUrl = `/${Type.toLowerCase()}landingpage/${user[`${Type}ID`]}`;
          window.location.href = redirectUrl;
        } else {
          throw new Error('Invalid credentials');
        }
    
      } catch (error) {
        console.error('Login error:', error);
        window.alert(`Error: ${error.message}`);
      }
    };
    

    
    render(){
        return (
            <div>
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
