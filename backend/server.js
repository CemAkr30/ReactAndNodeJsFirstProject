const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authMiddleware } = require("./auth/AuthHandler");
const app = express();
app.use(express.json());    
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true  // İsteğe güvenilirlik (credentials) için izin verildiğinden emin olun
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://example.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(authMiddleware);

  app.listen(5001, () => {
    console.log('Sunucu çalışıyor, http://localhost:5001 adresine gidin.');
  });

const userRoute = require('./routers/UserRouter');

app.use('/user',userRoute);





