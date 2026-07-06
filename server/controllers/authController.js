const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function safeCompare(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminUsername || !adminPassword || !jwtSecret) {
    return res.status(500).json({ message: 'Admin credentials are not configured on the server' });
  }

  if (!safeCompare(username, adminUsername) || !safeCompare(password, adminPassword)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ role: 'admin', username: adminUsername }, jwtSecret, {
    expiresIn: '12h',
  });

  res.json({ token, username: adminUsername });
};

exports.me = (req, res) => {
  res.json({ username: req.admin.username, role: req.admin.role });
};
