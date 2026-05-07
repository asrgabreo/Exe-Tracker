const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find().sort({ username: 1 })
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: err.message }));
});

router.route('/add').post((req, res) => {
  const username = String(req.body.username || '').trim();

  if (username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
  }

  const newUser = new User({username});

  return newUser.save()
    .then(user => res.status(201).json({ message: 'User added!', user }))
    .catch(err => {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'That username is already taken.' });
      }

      return res.status(400).json({ message: err.message });
    });
});

module.exports = router;
