import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {},
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({ formData, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios
      .post('/api/login', this.state.formData)
      .then((res) => {
        Auth.setUser(res.data.user)
        Auth.setToken(res.data.token) // store the token in localStorage
        this.props.history.push('/plots') // redirect to the cheeses INDEX page
      })
      .catch(() => {
        Auth.removeToken() // remove the token from localStorage
        this.setState({ error: 'Invalid credentials' }) // display an error
      })
  }

  render() {
    return (
      <section className='section login-background'>
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <div className='box tableBorder'>
              <h2 className='title is-3 has-white-text'>Login</h2>
            </div>
            <div className='box tableBorder'>
              <div className='field'>
                <label className='label'>Email</label>
                <div className='control'>
                  <input
                    className='input'
                    type='email'
                    name='email'
                    placeholder='eg: greeny@gardensaremylife.co.uk'
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Password</label>
                <div className='control'>
                  <input
                    className='input'
                    type='password'
                    name='password'
                    placeholder='eg: ••••••••'
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error && (
                  <small className='help'>
                    {this.state.error}
                  </small>
                )}
              </div>
              <hr />
              <button className='button'>Submit</button>
            </div>
          </form>
        </div>
        <div className='afterlogin'></div>
      </section>
    )
  }
}

export default Login
