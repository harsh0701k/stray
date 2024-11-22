const config = require('../config');

function checkPermissions(req, res, next) {
  const project_uuid = config.project_uuid;
  const requiredHeader = 'X-Project-UUID';
  const headerValue = req.headers[requiredHeader.toLowerCase()];

  if (headerValue && headerValue === project_uuid) {
    next();
  } else {
    res.status(403).send({ error: 'Stop right there, criminal scum! Your project UUID is invalid or missing.' });
  }
}

module.exports = checkPermissions;