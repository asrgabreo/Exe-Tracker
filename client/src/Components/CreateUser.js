import React from 'react';
import Axios from '../Axios';

class CreateUser extends React.Component {
  state = {
    username: '',
    message: ''
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
        username: this.state.username
      };

      console.log(user);

      Axios.post('users/add', user)
        .then(response => {
          console.log(response.data);
          this.setState({
            message: response.data,
            username: ''
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            message: error.message,
            username: ''
          });
        });
    }
  };

  render = () => {
    return (
      <div className="container">
        <br />
        <div className="display-4">Create Your Account</div>
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
              <input
                type="text"
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
      </div>
    );
  };
}

export default CreateUser;
