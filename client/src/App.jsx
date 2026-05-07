import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import NavBar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExercisesList from './Components/ExercisesList';
import EditExercise from './Components/EditExercise';
import CreateExercise from './Components/CreateExercise';
import CreateUser from './Components/CreateUser';

function CreateExerciseRoute() {
  const navigate = useNavigate();

  return <CreateExercise navigate={navigate} />;
}

function EditExerciseRoute() {
  const navigate = useNavigate();
  const params = useParams();

  return <EditExercise navigate={navigate} params={params} />;
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ExercisesList />} />
        <Route path="/edit/:id" element={<EditExerciseRoute />} />
        <Route path="/create" element={<CreateExerciseRoute />} />
        <Route path="/user" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
