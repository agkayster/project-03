import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()


    axios.post('/api/register', this.state.formData)
      .then(res => {
        toast.success(res.data.message)
        this.props.history.push('/login')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    return (
      <section className="section register-background">
        <div className="container">
          <div className="box tableBorder">
            <h2 className="title is-3 has-white-text">Register</h2>
            <p>Sign up here be a part of the London community that grows its own food!</p>
          </div>
          <div className="box tableBorder">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    name="username"
                    placeholder="eg: greenfingers"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.username && <small className="help">{this.state.errors.username}</small>}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="eg: greeny@gardensaremylife.co.uk"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.email && <small className="help">{this.state.errors.email}</small>}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password && <small className="help">{this.state.errors.password}</small>}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="passwordConfirmation"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.passwordConfirmation && <small className="help">{this.state.errors.passwordConfirmation}</small>}
              </div>
              <div className="field">
                <label className="label">Post Code</label>
                <div className="control">
                  <input
                    className="input"
                    name="postCode"
                    placeholder="ie: W10 6JJ"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.postCode && <small className="help">{this.state.errors.postCode}</small>}
              </div>
              <hr />
              <button className="button">Submit</button>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register
