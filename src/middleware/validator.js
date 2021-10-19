'use strict';

module.exports = (req, res, next) => {
  if(!req.query.name){ next('name is not valid');}
  next();
};