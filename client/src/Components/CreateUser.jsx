import React from 'react';
import Axios from '../Axios';

class CreateUser extends React.Component {
  state = {
    username: '',
    message: '',
    error: '',
  };


  onChangeUserNameHandler = event => {
    this.setState({
      username: event.target.value
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    if (this.state.username !== '') {
      const user = {
        username: this.state.username.trim()
      };

      Axios.post('users/add', user)
        .then(response => {
          this.setState({
            message: response.data.message,
            username: '',
            error: '',
          });
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
    return (
      <div className="container page-panel form-page">
        <div className="page-header">
          <div>
            <p className="eyebrow">People</p>
            <h1>New User</h1>
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
              <input
                type="text"
                minLength="3"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUserNameHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Create User"
                className="btn btn-primary"
              />
            </div>
          </form>
      </div>
    );
  };
}

export default CreateUser;
