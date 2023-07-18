const db = require('./db');
const User = require('../domain/User');

const createOrUpdate = async (model) => {
    try {
        await model.sync();
        console.log("createorupdate");
    }catch(error){
        console.error("createorupdatte failed" + error);
    }
}

const syncAndSeed = async () => {
    try {
        await db.didSync.then(() => db.sync({alter: true})); 
        await createOrUpdate(User);
        console.log("tablolar güncelleştirildi")
    }catch(error){
        console.error("Error Db Connection" + error)
    }
}

syncAndSeed();