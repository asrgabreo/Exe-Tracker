import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExercisesList from './Components/ExercisesList';
import EditExercise from './Components/EditExercise';
import CreateExercise from './Components/CreateExercise';
import CreateUser from './Components/CreateUser';

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" exact component={EditExercise} />
      <Route path="/create" exact component={CreateExercise} />
      <Route path="/user" exact component={CreateUser} />
    </Router>
  );
}

export default App;
