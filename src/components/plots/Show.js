import React from "react";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN,
});

import { Link } from "react-router-dom";

import Auth from "../../lib/Auth";
import Comment from "../common/Comment";

class PlotsShow extends React.Component {
  constructor() {
    super();
    this.state = {
      formData: {
        rating: 1,
        content: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/plots/${this.props.match.params.id}`)
      .then((res) => this.setState({ plot: res.data }));
  }

  handleStarClick(nextValue) {
    const formData = { ...this.state.formData, rating: nextValue };
    this.setState({ formData });
  }

  handleChange(e) {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value,
    };
    this.setState({ formData });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        `/api/plots/${this.props.match.params.id}/comments`,
        this.state.formData,
        {
          headers: { Authorization: `Bearer ${Auth.getToken()}` },
        }
      )
      .then((res) =>
        this.setState({ plot: res.data, formData: { rating: 1, content: "" } })
      );
  }

  handleDelete() {
    axios
      .delete(`/api/plots/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` },
      })
      .then(() => this.props.history.push("/api/plots"));
  }

  handleCommentDelete(e) {
    axios
      .delete(
        `/api/plots/${this.props.match.params.id}/comments/${e.target.id}`,
        {
          headers: { Authorization: `Bearer ${Auth.getToken()}` },
        }
      )
      .then((res) => this.setState({ plot: res.data }));
  }

  render() {
    console.log(this.state.plot);
    return (
      <section className="section show-background">
        <div className="container">
          {!this.state.plot && <h2 className="title is-2">Loading...</h2>}

          {this.state.plot && (
            <div className="box tableBorder">
              <header>
                <h1 className="title is-2">{this.state.plot.name}</h1>
                {Auth.isCurrentUser(this.state.plot.user) && (
                  <div className="buttons">
                    <Link
                      className="button"
                      to={`/plots/${this.state.plot._id}/edit`}
                    >
                      Edit
                    </Link>

                    <button
                      className="button is-danger"
                      onClick={this.handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </header>

              <div>
                <p>{this.state.plot.description}</p>
              </div>

              <hr />
              <div className="columns is-multiline">
                <div className="column is-half is-centered">
                  <img
                    className="ShowImage"
                    src={this.state.plot.image}
                    alt={this.state.plot.name}
                  />
                </div>

                <div className="column is-half is-centered">
                  <div className="table-container">
                    <table className="table tableBorder">
                      <tbody>
                        <tr>
                          <td>
                            <p>Plot Type:</p>
                          </td>
                          <td>
                            <p>{this.state.plot.plotType}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Facilities:</p>
                          </td>
                          <td>
                            <p>
                              {this.state.plot.facilities.map(
                                (facility) => facility + "    "
                              )}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Number of Slots:</p>
                          </td>
                          <td>
                            <p>{this.state.plot.numOfSlots}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>slots available?</p>
                          </td>
                          <td>
                            <p>
                              {this.state.plot.slotsAvailable ? "✅" : "❌"}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Bio-waste accepted?</p>
                          </td>
                          <td>
                            <p>
                              {this.state.plot.bioWasteAccepted ? "✅" : "❌"}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Costs involved?</p>
                          </td>
                          <td>
                            <p>{this.state.plot.costInvolved ? "✅" : "❌"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Volunteers needed?</p>
                          </td>
                          <td>
                            <p>{this.state.plot.volunteer ? "✅" : "❌"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Contact details:</p>
                          </td>
                          <td>{this.state.plot.primaryContactName}</td>
                        </tr>
                        <tr>
                          <td>
                            <p>Email:</p>
                          </td>
                          <td>
                            <p>{this.state.plot.primaryContactEmail}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Average Rating:</p>
                          </td>
                          <td>
                            <div>
                              <StarRatingComponent
                                name="Average rating"
                                editing={false}
                                renderStarIcon={() => (
                                  <span>
                                    <i className="fas fa-carrot"></i>
                                  </span>
                                )}
                                starCount={5}
                                starColor={"rgb(255,140,0)"}
                                emptyStarColor={"rgb(192,192,192)"}
                                value={this.state.plot.averageRating}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <hr />

              <div className="container">
                <div>
                  <h2 className="title is-3 has-white-text">Location</h2>
                  <p>{this.state.plot.streetAddress}</p>
                  <p> {this.state.plot.postCode}</p>
                </div>
                <br />

                <Map
                  style="mapbox://styles/mapbox/streets-v9"
                  scrollZoom={true}
                  containerStyle={{
                    height: "40vh",
                    width: "100%",
                  }}
                  center={[this.state.plot.longitude, this.state.plot.latitude]}
                >
                  <Marker
                    coordinates={[
                      this.state.plot.longitude,
                      this.state.plot.latitude,
                    ]}
                  >
                    <img
                      src={"../../assets/CarrotWave.gif"}
                      height="50"
                      width="50"
                    />
                  </Marker>
                  <ZoomControl isEnabled="true" />
                </Map>
              </div>
              <hr />
              <h2 className="title is-3 has-white-text">Comments</h2>
              <div className="column is-full">
                <div className="column is-full">
                  {this.state.plot.comments.map((comment) => (
                    <Comment
                      key={comment._id}
                      {...comment}
                      handleCommentDelete={this.handleCommentDelete}
                    />
                  ))}
                  {Auth.isAuthenticated() && (
                    <form onSubmit={this.handleSubmit}>
                      <hr />
                      <div className="table-container">
                        <table className="table is-fullwidth">
                          <tbody>
                            <tr>
                              <td>
                                <div className="field">
                                  <label className="label">
                                    <h3 className="commentUser">Comment</h3>
                                  </label>
                                  <textarea
                                    name="content"
                                    className="textarea"
                                    placeholder="Add a comment..."
                                    onChange={this.handleChange}
                                    value={this.state.formData.content}
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <h2>Rating: {this.state.formData.rating}</h2>
                                  <StarRatingComponent
                                    name="rating"
                                    renderStarIcon={() => (
                                      <span>
                                        <i className="fas fa-carrot"></i>
                                      </span>
                                    )}
                                    starCount={5}
                                    onStarClick={this.handleStarClick}
                                    starColor={"rgb(255,140,0)"}
                                    emptyStarColor={"rgb(192,192,192)"}
                                    value={this.state.formData.rating}
                                  />
                                </div>
                                <button className="button">Submit</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default PlotsShow;
