const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const host = 'localhost';
const port = '27017';
const database = 'robo';

// create schema
const PartSchema = mongoose.Schema({
  cpu: String,
  engine: String,
  id: Number,
  name: String,
  type: String
});

// create schema
const RobotSchema = mongoose.Schema({
  id: Number,
  age: Number,
  name: String,
  type: String,
  parts: [{
    partId: Number,
    condition: Number
  }]
});

// set connection
mongoose.connect('mongodb://' + host + ':' + port + '/' + database, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(database.toUpperCase() + ' database is connected!');
});

autoIncrement.initialize(db);
RobotSchema.plugin(autoIncrement.plugin, {
  model: 'Robot',
  field: 'id',
  startAt: 51,
  incrementBy: 2
});
RobotSchema.plugin(autoIncrement.plugin, {
  model: 'Part',
  field: 'id',
  incrementBy: 3
});

const Part = mongoose.model('Part', PartSchema);
const Robot = mongoose.model('Robot', RobotSchema);

module.exports = {Part, Robot};

