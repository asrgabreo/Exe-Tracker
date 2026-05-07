const router = require('express').Router();
let Exercise = require('../models/exercise.model');

const parseExercisePayload = body => {
  const username = String(body.username || '').trim();
  const description = String(body.description || '').trim();
  const duration = Number(body.duration);
  const date = new Date(body.date);

  if (!username) {
    return { error: 'Username is required.' };
  }

  if (!description) {
    return { error: 'Description is required.' };
  }

  if (!Number.isFinite(duration) || duration <= 0) {
    return { error: 'Duration must be a positive number of minutes.' };
  }

  if (Number.isNaN(date.getTime())) {
    return { error: 'A valid date is required.' };
  }

  return { value: { username, description, duration, date } };
};

router.route('/').get((req, res) => {
  Exercise.find().sort({ date: -1, createdAt: -1 })
    .then(exercises => res.json(exercises))
    .catch(err => res.status(500).json({ message: err.message }));
});

router.route('/add').post((req, res) => {
  const { error, value } = parseExercisePayload(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  const newExercise = new Exercise(value);

  return newExercise.save()
    .then(exercise => res.status(201).json({ message: 'Exercise added!', exercise }))
    .catch(err => res.status(400).json({ message: err.message }));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found.' });
      }

      return res.json(exercise);
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => {
      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found.' });
      }

      return res.json({ message: 'Exercise deleted.' });
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

router.route('/update/:id').post((req, res) => {
  const { error, value } = parseExercisePayload(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  Exercise.findById(req.params.id)
    .then(exercise => {
      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found.' });
      }

      exercise.username = value.username;
      exercise.description = value.description;
      exercise.duration = value.duration;
      exercise.date = value.date;

      return exercise.save()
        .then(updatedExercise => res.json({ message: 'Exercise updated!', exercise: updatedExercise }))
        .catch(err => res.status(400).json({ message: err.message }));
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

module.exports = router;
