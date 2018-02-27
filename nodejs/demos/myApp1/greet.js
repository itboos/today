const express = require('express');

module.exports = function(options = {}) {
  const router = express.Router();
  // get Controller
  const {service} = options;
  router.get('/greet', (req, res, next) => {
    console.log('req.query:', req.query);
    res.end(
      service.createGreeting(req.query.name || 'Stranger')
    );
  });
 
  return router;
}