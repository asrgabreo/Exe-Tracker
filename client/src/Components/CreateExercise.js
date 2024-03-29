import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from '../Axios';

class CreateExercise extends React.Component {
  state = {
    description: '',
    duration: '',
    date: new Date(),
    users: [],
    username: '',
    message: '',
    isLoading: false,
  };

  componentDidMount = () => {
    this.setState({isLoading: true});
    Axios.get('/users').then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username,
          isLoading: false,
        });
      }
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
        description: this.state.description,
        duration: this.state.duration,
        date: this.state.date
      };

      console.log(exercise);

      Axios.post('exercises/add', exercise)
        .then(response => {
          console.log(response.data);
          this.setState({
            message: response.data+`\nRedirecting....`,
            description: '',
            duration: '',
            date: new Date(),
            users: [],
            username: ''
          });
          window.location = '/';
        })
        .catch(error => {
          console.log(error);
          this.setState({
            message: error.message,
            description: '',
            duration: '',
            date: new Date(),
            users: [],
            username: ''
          });
        });
    }
  };

  render = () => {
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container">
        <br />
        <div className="display-4">Create Your Own Exercise</div>
        <br />
        <br />
        {this.state.message !== '' ? (
          <div className="alert" role="alert">
            {this.state.message}
          </div>
        ) : null}
        <br />
        <br />
        <div className="container">
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label>Username: </label>
              <select
                ref="userInput"
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
                type="text"
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDurationHandler}
              />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDateHandler}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Create Exercise Log"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default CreateExercise;
