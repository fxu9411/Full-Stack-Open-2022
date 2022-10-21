const logger = require("./logger");
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Invalid Token'
    })
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  // logger.info(request)
  const authorization = request.get('Authorization')
  if (request.method === 'POST' || request.method === 'DELETE') {
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    } else {
      return response.status(401).json({
        error: 'Invalid Token'
      })
    }
  }
  next();
}

const userExtractor = async (request, response, next) => {
  // logger.info(request.token)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  if (user) {
    request.user = user
    // return request
  } else {
    return response.status(401).json({
      error: 'Invalid User'
    })
  }
  next();
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
