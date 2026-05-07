import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from '../Axios';

class EditExercise extends React.Component {
  state = {
    description: '',
    duration: '',
    date: new Date(),
    users: [],
    username: '',
    message: '',
    error: '',
    isLoading: false,
  };
  componentDidMount = () => {
    this.setState({ isLoading: true });

    Promise.all([
      Axios.get('exercises/' + this.props.params.id),
      Axios.get('/users/')
    ])
      .then(response => {
        this.setState({
          username: response[0].data.username,
          description: response[0].data.description,
          duration: response[0].data.duration,
          date: new Date(response[0].data.date),
          users: response[1].data.map(user => user.username),
          isLoading: false,
          error: '',
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error.response && error.response.data ? error.response.data.message : error.message,
        });
      });
  };

  onChangeUserNameHandler = event => {
    this.setState({
      username: event.target.value
    });
  };

  onChangeDescriptionHandler = event => {
    this.setState({
      description: event.target.value
    });
  };

  onChangeDurationHandler = event => {
    this.setState({
      duration: event.target.value
    });
  };

  onChangeDateHandler = date => {
    this.setState({
      date: date
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    if (
      this.state.username !== '' &&
      this.state.description !== '' &&
      this.state.duration !== '' &&
      this.state.date !== ''
    ) {
      const exercise = {
        username: this.state.username,
        description: this.state.description.trim(),
        duration: this.state.duration,
        date: this.state.date
      };

      Axios.post('exercises/update/' + this.props.params.id, exercise)
        .then(response => {
          this.setState({
            message: response.data.message,
            error: '',
            description: '',
            duration: '',
            date: new Date(),
            username: ''
          });
          this.props.navigate('/');
        })
        .catch(error => {
          this.setState({
            error: error.response && error.response.data ? error.response.data.message : error.message,
            message: '',
          });
        });
    }
  };

  render = () => {
    if (this.state.isLoading) {
      return <div className="container page-panel"><p className="status-message">Loading exercise...</p></div>;
    }

    return (
      <div className="container page-panel form-page">
        <div className="page-header">
          <div>
            <p className="eyebrow">Update log</p>
            <h1>Edit Exercise</h1>
          </div>
        </div>
        {this.state.message ? (
          <div className="alert alert-success" role="alert">
            {this.state.message}
          </div>
        ) : null}
        {this.state.error ? <div className="alert alert-danger" role="alert">{this.state.error}</div> : null}
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label>Username: </label>
              <select
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUserNameHandler}
              >
                {this.state.users.map(function(user) {
                  return (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Description: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescriptionHandler}
              />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input
                type="number"
                min="1"
                required
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDurationHandler}
              />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  className="form-control"
                  selected={this.state.date}
                  onChange={this.onChangeDateHandler}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Save Changes"
                className="btn btn-primary"
              />
            </div>
          </form>
      </div>
    );
  };
}

export default EditExercise;
