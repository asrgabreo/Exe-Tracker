import React from 'react';
import Axios from '../Axios';
import Exercise from './Exercise';

class ExercisesList extends React.Component {
  state = {
    exercises: [],
    isLoading: false,
    error: '',
  };
  componentDidMount = () => {
    this.setState({isLoading: true});
    Axios.get('/exercises')
      .then(response => {
        this.setState({
          exercises: response.data,
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

  exerciseList = () => {
    return this.state.exercises.map(currentexercise => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.onDeleteExerciseHandler}
          key={currentexercise._id}
        />
      );
    });
  };

  onDeleteExerciseHandler = id => {
    Axios.delete('/exercises/' + id)
      .then(() => {
        this.setState({
          exercises: this.state.exercises.filter(
            exercise => id !== exercise._id
          ),
          error: '',
        });
      })
      .catch(error => {
        this.setState({
          error: error.response && error.response.data ? error.response.data.message : error.message,
        });
      });
  };
  render = () => {
    if (this.state.isLoading) {
      return <div className="container page-panel"><p className="status-message">Loading exercises...</p></div>;
    }

    return (
      <div className="container page-panel">
        <div className="page-header">
          <div>
            <p className="eyebrow">Daily activity</p>
            <h1>Exercise Logs</h1>
          </div>
        </div>
        {this.state.error ? <div className="alert alert-danger" role="alert">{this.state.error}</div> : null}
        {this.state.exercises.length === 0 ? (
          <div className="empty-state">
            <h2>No exercises yet</h2>
            <p>Add a user, then create your first exercise log.</p>
          </div>
        ) : (
          <div className="table-responsive exercise-table">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.exerciseList()}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
}

export default ExercisesList;
