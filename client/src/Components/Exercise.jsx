import React from 'react';
import { Link } from 'react-router-dom';


const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration} min</td>
    <td>{new Date(props.exercise.date).toLocaleDateString()}</td>
    <td className="table-actions">
      <Link className="btn btn-sm btn-outline-primary" to={'/edit/' + props.exercise._id}>Edit</Link>
      <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => props.deleteExercise(props.exercise._id)}>
        Delete
      </button>
    </td>
  </tr>
);


export default Exercise;