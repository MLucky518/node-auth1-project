const db = require("../data/config");

module.exports = {
  getUsers,
  add,
  findById,
  findByUsername
};

function getUsers() {
  return db("users");
}


async function add(user){
  const [id] = await db("users").insert(user,"id");
  return findById(id);
}

function findByUsername(username){
  return db("users").where(username)
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}