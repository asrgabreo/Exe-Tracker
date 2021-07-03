const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require("path");
const app = express();

require('dotenv').config();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,application/json');
  next();
})

app.use(express.json());

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use(morgan("tiny"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.ATLAS_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true,useCreateIndex:true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    }))
    .catch((error) => console.log(error.message));
