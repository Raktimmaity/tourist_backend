// middleware/auth.js
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') return next();
    return res.status(403).json({ message: 'Forbidden' });
  };
  module.exports = { isAdmin };
  