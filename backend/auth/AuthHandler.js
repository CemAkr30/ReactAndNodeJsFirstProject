const { verifyToken } = require("./TokenService");

function authMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  // Muaf tutmak istediğiniz yolları burada kontrol edin
  if (req.path === '/user/register' || req.path === '/user/login') {
    return next(); // Muaf tutulan yol, işlemi devam ettir
  }

  if (!token) {
    return res.status(401).send("Unauthorized"); // Yetkilendirme hatası
  }

  try {
    const cleanedToken = token.replace("Bearer ", "");
    const result = verifyToken(cleanedToken).then(
      (result) => {
        if (result) {
          next();
        }else {
          return res.status(403).send("Invalid token"); // Geçersiz token
        }
      }
    );
  } catch (error) {
    console.log("geldim2") 
    return res.status(403).send("Invalid token"); // Geçersiz token
  }
}

module.exports = { authMiddleware };
