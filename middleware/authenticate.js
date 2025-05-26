const jwt = require('jsonwebtoken');

// Middleware to authenticate the user
const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Decoding the token and attaching user info to the request
    next();
  } catch (error) {
    return res.status(400).send('Invalid token');
  }
};

module.exports = authenticate;
