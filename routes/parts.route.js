const router = require('express').Router();
const collection = require('../database/db').Part;

router.route('/parts')
  .get((req, res, next) => {
    console.log('Get: ', req.body);
    collection.find({}, (err, parts) => {
      if (err) return next(err);
      res.json(parts);
    })
  })
  .post((req, res, next) => {
    console.log('Post: ', req.body);
    const part = {
      name: req.body.name,
      cpu: req.body.cpu,
      engine: req.body.engine,
      type: req.body.type
    };

    collection.create(part, (err, part) => {
      console.log(part);
      if (err) {
        console.log(err);
        next(err);
      }
      res.sendStatus(201);
    });
  });

router.route('/parts/:id')
  .get((req, res, next) => {
    console.log('Get: ', req.body);
    console.log('Get params: ', req.params);
    const id = Object.assign({}, req.params);
    collection.findOne(id, (err, part) => {
      if (err) {
        console.log(err);
        next(err);
      }
      // No Robot Found
      if (0 === part.length) next(new Error('No Part Found!'));
      console.log('Get part: ', part);
      res.json(part);
    });
  })
  .put((req, res, next) => {

    console.log('Put-Body: ', req.body);
    console.log('Put-params: ', req.params);
    const id = Object.assign({}, req.params);
    console.log('Id: ', id);
    const part = {
      name: req.body.name,
      cpu: req.body.cpu,
      engine: req.body.engine,
      type: req.body.type
    };
    const options = {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    };

    collection.findOneAndUpdate(id, {$set: part}, options, (err, part) => {
      console.log(id);
      if (err) {
        console.log(err);
        next(err);
      }
      res.json(part);
    });

  })
  .delete((req, res, next) => {
    console.log('Del: ', req.body);
    console.log('Del: params: ', req.params);
    const id = Object.assign({}, req.params);

    collection.findOneAndDelete(id, (err, part) => {
      if (err) {
        console.log(err);
        next(err);
      }
      console.log('Get part: ', part);
      res.sendStatus(201);
    });
  });

module.exports = router;