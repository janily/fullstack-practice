import React from 'react'

class Login extends React.Component {
  render() {
    return (
      <>
        <div className="login-wrapper">
          <div className="box login-box">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email" />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input className="input" type="password" placeholder="Password" />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Login
            </button>
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Login;

