import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      failure: false
    }
  }

  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  } 

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }
  
  onSubmit = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
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
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" onChange={this.onEmailChange} id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" onChange={this.onPasswordChange} id="password"/>
              </div>
            </fieldset>
            <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmit}/>
            </div>
            <div className="lh-copy mt3">
                <p href="#0" className="f6 link dim black db pointer" onClick={() => this.props.onRouteChange('register')}>Register</p>
            </div>
            {this.state.failure && 
            <div className="f6 red">
                <span>
                    <svg xmlns="https://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" fill="#e51c23">   
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path><path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                </span>
                {" Incorrect Email or Password"}
            </div>
            }
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;