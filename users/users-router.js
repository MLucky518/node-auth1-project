const router = require("express").Router();
const bcrypt = require("bcryptjs");
const users = require("../users/users-model");

router.get("/", async (req, res, next) => {
  try {
    const userList = await users.getUsers();
    if (!userList) {
      res.status(400).json({
        message: "error retrieving users",
      });
    } else {
      res.status(200).json(userList);
    }
  } catch (err) {}
});


module.exports = router;