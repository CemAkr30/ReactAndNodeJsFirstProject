const db = require('../databaseConfig/db');
const User = require('../domain/User')
const { QueryTypes, where  , Op } = require('sequelize');
const { generateToken } = require("../auth/TokenService");

async function getUserAll() {
  try {
    const query = ' SELECT * FROM "User"';
    const result = await  db.query(query, { type: QueryTypes.SELECT });
    return result;
  } catch (err) {
     console.error('Error running native query:', err);
  } 
}

async function login(user){
    let message = "";
    const data = [];

    const email = user.email;
    const password = user.password;


    console.log("adsadadsad : " +user.email)

    const resultData = await User.findAll({
        where: {
            [Op.and]: [
                { email: email },
                { password: password }
              ]
        }
      });
      
      const userData = resultData.map(user => user.toJSON());

    if(userData.length>0){
        const token = await generateToken(userData);
        userData[0].token = token;
        //console.log(userData[0]);
        User.update(userData[0],{
            where: {
                id : userData[0].id
            }
        })
        data.push({message:"Success",data:userData[0]}); 
    }else{
        message = "Failed  Email : " + email + " or  Password :"  + password + " check";  
        data.push({message:message,data:""})
    }

    return data;
}

async function register(user){
    //console.log(user);
    const query = ' SELECT * FROM "User" WHERE email = ' + "'"+ user.email + "'";
    const result = await  db.query(query, { type: QueryTypes.SELECT });
    if(result.length>0){
        const data = {
            "data": [result[0]],
            "message":"Failed have user account",
            "status":"500",
            "token": ""
        }
        return data;
    }
    const token = await generateToken(user);
    user.token = token;
    this.save(user);
    const data = {
        "data": [user],
        "message":"Sucesss",
        "status":"200",
        "token": token
    }
    return data;
}

async function save(user) {
    try {
        const result = await User.create(user);
        return result;
      } catch (err) {
         console.error('Error running native query:', err);
      } 
}

async function update(id, updatedData) {
    try {
      const result = await User.update(updatedData, {
        where: { id: id }
      });
      const data = {
        "data": result,
        "message":"Saved Success",
        "status":"200"
    }
      return data;
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  }


module.exports = { getUserAll , save , update ,login, register};



