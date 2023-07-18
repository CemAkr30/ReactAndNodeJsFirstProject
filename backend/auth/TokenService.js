const jwt = require('jsonwebtoken');

const secretKey = 'nodeJsTokenCekino';
const tokenExpiration = '1h'; // Token süresi (örneğin 1 saat)

async function generateToken(user) {
  const payload = { userId: user.id, email: user.email }; // Token içeriği
  const token = jwt.sign(payload, secretKey, { expiresIn: tokenExpiration });
  return token;
}

async function verifyToken(token) {
  try {
    jwt.verify(token, secretKey);
    return true;
  } catch (err) {
     return false;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
