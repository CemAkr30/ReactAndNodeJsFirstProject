const userService = require('../services/UserService');

module.exports = {
  login:  async (req, res) => {
    const userData = req.body;
    console.log("userData" + userData);
    const result = await userService.login(userData);
    res.send(result);
  },
  register:  async (req, res) => {
    const userData = req.body;
    const result = await userService.register(userData);
    res.send(result);
  },
  getUser: async (req, res) => {
    try {
      const result = await userService.getUserAll();
      res.send(result);
    } catch (err) {
      res.status(500).send('Error getting user');
    }
  },
  saveUser: async (req,res) => {
    const userData = req.body;
    const result = await userService.save(userData);
    res.send(result);
  },
  updateUser : async (req,res) => {
    const userId = req.params.id; // URL'den ID'yi alın
    const userData = req.body;
    const result = await userService.update(userId,userData);
    res.send(result);
  }
};