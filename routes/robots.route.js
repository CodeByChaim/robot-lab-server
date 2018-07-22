const router = require('express').Router();
const collection = require('../database/db').Robot;

router.route('/robots')
  .get((req, res, next) => {
    console.log('Get: ', req.body);
    collection.find({}, (err, robots) => {
      if (err) return next(err);
      res.json(robots);
    })
  })
  .post((req, res, next) => {
    console.log('Post: ', req.body);
    const robot = {
      name: req.body.name,
      age: req.body.age,
      type: req.body.type
    };

    collection.create(robot, (err, robot) => {
      console.log(robot);
      if (err) {
        console.log(err);
        next(err);
      }
      res.sendStatus(201);
    });
  });

router.route('/robots/:id')
  .get((req, res, next) => {
    console.log('Get: ', req.body);
    console.log('Get params: ', req.params);
    const id = Object.assign({}, req.params);
    collection.findOne(id, (err, robot) => {
      if (err) {
        console.log(err);
        next(err);
      }
      // No Robot Found
      if (0 === robot.length) next(new Error('No Robot Found!'));
      console.log('Get robot: ', robot);
      res.json(robot);
    });
  })
  .put((req, res, next) => {

    console.log('Put: ', req.body);
    console.log('Body: ', req.body);
    const id = Object.assign({}, req.params);
    const robot = {
      name: req.body.name,
      age: req.body.age,
      type: req.body.type
    };
    const options = {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    };

    collection.findOneAndUpdate(id, {$set: robot}, options, (err, robot) => {
      console.log(id);
      if (err) {
        console.log(err);
        next(err);
      }
      res.json(robot);
    });

  })
  .delete((req, res, next) => {
    console.log('Del: ', req.body);
    console.log('Del: params: ', req.params);
    const id = Object.assign({}, req.params);

    collection.findOneAndDelete(id, (err, robot) => {
      if (err) {
        console.log(err);
        next(err);
      }
      console.log('Del robot: ', robot);
      res.sendStatus(201);
    });
  });

module.exports = router;