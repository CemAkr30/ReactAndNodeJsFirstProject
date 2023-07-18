const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 1000,
  database: 'postgres',
  username: 'cakar',
  password: '1905'
});

const syncDatabase = async (force = false) => {
    try {
        await db.sync({force});
        console.log('sucess: authantication db')
    }catch(error){
        console.log('failed : ' + error);
    }
}


// Veritabanına bağlanın
db
  .authenticate()
  .then(() => {
    console.log('Veritabanına başarıyla bağlanıldı.');
  })
  .catch((err) => {
    console.error('Veritabanına bağlantı hatası:', err);
  });

db.didSync = syncDatabase();

module.exports = db;
