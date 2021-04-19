import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Edit extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleArrayChange = this.handleArrayChange.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.handlePlotTypeChange = this.handlePlotTypeChange.bind(this)

  }

  componentDidMount() {
    axios.get(`/api/plots/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/plots/${this.props.match.params.id}`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/plots/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleArrayChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value.split(',') }
    this.setState({ formData })
  }

  handleCheckbox(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.checked }
    this.setState({ formData })
  }
  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen})
  }
  handlePlotTypeChange(e) {
    const formData = {...this.state.formData, plotType: e.target.value }
    this.setState({ formData, dropdownOpen: false })
  }

  render() {
    return (
      <section className="section edit-background">
        <div className="container">
          <div className="box tableBorder">
            <h2 className="title is-3 has-white-text">Plot details</h2>
            <p> Got some thing wrong? No worries bro, hakuna matata.. fix it here!</p>
          </div>
          <form className="container box tableBorder" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Plot Name</label>
              <input
                className="input"
                name="name"
                placeholder="eg: Jeffs rose Garden"
                value={this.state.formData.name || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <small className="help">{this.state.errors.name}</small>}
            </div>
            <br />
            <div className="columns">
              <div className="column field">
                <label className="label">Plot Street Address</label>
                <input
                  className="input"
                  type="string"
                  name="streetAddress"
                  placeholder="37 Root Street"
                  value={this.state.formData.streetAddress || ''}
                  onChange={this.handleChange}
                />
                {this.state.errors.streetAddress && <small className="help">{this.state.errors.streetAddress}</small>}
              </div>
              <div className="column field">
                <label className="label">Post Code</label>
                <input
                  className="input"
                  type="string"
                  name="postCode"
                  placeholder="W10 E64"
                  value={this.state.formData.postCode || ''}
                  onChange={this.handleChange}
                />
                {this.state.errors.postCode && <small className="help">{this.state.errors.postCode}</small>}
              </div>
              <div className="column field">
                <label className="label">Description</label>
                <input
                  className="input"
                  type="string"
                  name="description"
                  placeholder="A lovley private garden in South london. Looking to get help with growing cabbages and carrots..."
                  value={this.state.formData.description || ''}
                  onChange={this.handleChange}
                />
                {this.state.errors.description && <small className="help">{this.state.errors.description}</small>}
              </div>
            </div>
            <div>
              <div className="field">
                <label className="label">Description</label>
                <input
                  className="input"
                  type="string"
                  name="description"
                  placeholder="A lovley private garden in South london. Looking to get help with growing cabbages and carrots..."
                  value={this.state.formData.description || ''}
                  onChange={this.handleChange}
                />
                {this.state.errors.description && <small className="help">{this.state.errors.description}</small>}
              </div>
            </div>
            <br />
            <div className="field">
              <label className="label">Image</label>
              <input
                className="input"
                name="image"
                type="string"
                placeholder="Enter URL here"
                value={this.state.formData.image || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.image && <small className="help">{this.state.errors.image}</small>}
            </div>
            <br />
            <label className="label">Choose Plot Type:</label>
            <div className={`dropdown ${this.state.dropdownOpen ? 'is-active' : ''}`} onClick={this.toggleDropdown}>
              <div className="dropdown-trigger">
                <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>↓: {this.state.formData.plotType}</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <button type="button" className="dropdown-item" onClick={this.handlePlotTypeChange} value='Allotment'>Allotment</button>
                  <button type="button" className="dropdown-item" onClick={this.handlePlotTypeChange} value='Private Plot'>Private Plot</button>
                  <button type="button" className="dropdown-item" onClick={this.handlePlotTypeChange} value='Community Garden'>Community Garden</button>
                </div>
              </div>
            </div>
            {this.state.errors.plotType && <small className="help">{this.state.errors.plotType}</small>}





            <hr />
            <h2 className="subtitle is-4 has-text-white">Using the plot</h2>
            <div className="columns">
              <div className="column field">
                <label className="checkbox has-text-white">
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="slotsAvailable"
                    onChange={this.handleCheckbox}
                  /> Are there slots available?
                </label>
                {this.state.errors.slotsAvailable && <small className="help">{this.state.errors.slotsAvailable}</small>}
              </div>

              <div className="column field">
                <label className="checkbox has-text-white">
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="bioWasteAccepted"
                    onChange={this.handleCheckbox}
                  /> Do you accept Biowaste?</label>
                {this.state.errors.bioWasteAccepted && <small className="help">{this.state.errors.bioWasteAccepted}</small>}
              </div>

              <div className="column field">
                <label className="checkbox has-text-white">
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="costInvolved"
                    onChange={this.handleCheckbox}
                  /> Cost involved?</label>
                {this.state.errors.costInvolved && <small className="help">{this.state.errors.costInvolved}</small>}
              </div>

              <div className="column field">
                <label className="checkbox has-text-white">
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="Volunteer"
                    onChange={this.handleCheckbox}
                  /> Offer volunteering?</label>
                {this.state.errors.volunteer && <small className="help">{this.state.errors.volunteer}</small>}
              </div>
            </div>


            <div className="field">
              <label className="label">Number of Slots</label>
              <input
                className="input"
                type="number"
                name="numOfSlots"
                onChange={this.handleChange}
                value={this.state.formData.numOfSlots || ''}
                placeholder="add number of total slots"
              />
              {this.state.errors.numOfSlots && <small className="help">{this.state.errors.numOfSlots}</small>}
            </div>

            <div className="field">
              <label className="label">Cost per annum</label>
              <input
                className="input"
                type="number"
                name="costPerAnnum"
                onChange={this.handleChange}
                value={this.state.formData.costPerAnnum || ''}
                placeholder="£100"
              />
              {this.state.errors.costPerAnnum && <small className="help">{this.state.errors.costPerAnnum}</small>}
            </div>

            <div className="field">
              <label className="label">Conditions for use</label>
              <input
                className="input"
                type="string"
                name="conditionsForUse"
                onChange={this.handleChange}
                value={this.state.formData.conditionsForUse || ''}
                placeholder="put water"
              />
              {this.state.errors.conditionsForUse && <small className="help">{this.state.errors.conditionsForUse}</small>}
            </div>

            <div className="field">
              <label className="label">Facilities</label>
              <input
                className="input"
                type="string"
                name="facilities"
                value={this.state.formData.facilities || ''}
                onChange={this.handleChange}
                placeholder="irrigation, watercan, free pots etc..."
              />
              {this.state.errors.facilities && <small className="help">{this.state.errors.facilities}</small>}
            </div>

            <hr />
            <h2 className="subtitle is-4 has-text-white">Personal details</h2>
            <div className="columns">
              <div className="column field">
                <label className="label">Primary Contact Name </label>
                <input
                  className="input"
                  type="string"
                  name="primaryContactName"
                  onChange={this.handleChange}
                  placeholder="Mr Carrot"
                  value={this.state.formData.primaryContactName || ''}
                />
                {this.state.errors.primaryContactName && <small className="help">{this.state.errors.primaryContactName}</small>}
              </div>
              <div className="column field">
                <label className="label">Primary Contact Email </label>
                <input
                  className="input"
                  type="string"
                  name="primaryContactEmail"
                  onChange={this.handleChange}
                  placeholder="MrCarrot@gmail.com"
                  value={this.state.formData.primaryContactEmail || ''}
                />
                {this.state.errors.primaryContactEmail && <small className="help">{this.state.errors.primaryContactEmail}</small>}
              </div>
            </div>

            <button className="button">Submit</button>
          </form>

        </div>
      </section>
    )
  }
}

export default Edit
