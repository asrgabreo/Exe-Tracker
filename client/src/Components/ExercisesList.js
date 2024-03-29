import React from 'react';
import Axios from '../Axios';
import Exercise from './Exercise';

class ExercisesList extends React.Component {
  state = {
    exercises: [],
    isLoading: false,
  };
  componentDidMount = () => {
    this.setState({isLoading: true});
    Axios.get('/exercises').then(response => {
      if (response.data.length > 0) {
        this.setState({
          exercises: response.data,
          isLoading:false,
        });
      }
    });
  };

  exerciseList = () => {
    console.log(this.state.exercises)
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
      .then(response => {
        console.log(response.data);
      })
      .then(() => {
        this.setState({
          exercises: this.state.exercises.filter(
            exercise => id !== exercise._id
          )
        });
      });
  };
  render = () => {
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container">
        <br />
        <br />
        <div className="display-4">Exercise Lists</div>
        <br />
        <br />
        <table className="table">
          <thead className="thead-light">
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
    );
  };
}

export default ExercisesList;
