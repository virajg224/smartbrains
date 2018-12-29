import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      failure: false
    }
  }

  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  } 

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }
  
  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  
  onSubmit = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
          this.setState({failure: false})
        } else {
          this.setState({failure: true})
        }
      })
  }

  render() {
    return (
      <article className="br3 ba bgb--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name" id="name" onChange={this.onNameChange} />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange} />
              </div>
            </fieldset>
            <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onSubmit} />
            </div>
            {this.state.failure && 
            <div className="f6 black pa3">
                <span>
                    <svg xmlns="https://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" fill="#e51c23">   
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path><path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                </span>
                {" Please enter valid information"}
            </div>
            }
          </div>
        </main>
      </article>
    );
  }
}

export default Register;