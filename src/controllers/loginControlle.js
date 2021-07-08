const db = require("../database");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, nit, rol, entity, password } = await req.body;
  // let passwordHaash = await bcryptjs.hash(password, 8);
  const user = {
    name: name,
    nit: nit,
    rol: rol,
    entity: entity,
    password: password,
  };
  const token = jwt.sign({ user }, "privateToken");
  const values = [name, nit, rol, entity, password, token];
  const SQL_REGISTER =
    "INSERT INTO usuarios (name,nit,rol,entidad,password,token) VALUES (?,?,?,?,?,?) ";
  db.query(SQL_REGISTER, [...values], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

const authenticationUser = async (req, res) => {
  const { nit, password } = req.body;

  // let passwordHaash = await bcryptjs.hash(password, 8);
  // (!(await bcryptjs.compare(password, result[0].password)))
  // (await bcryptjs.compare(password, result[0].password))
  const SQL_AUTH = "SELECT * FROM usuarios WHERE nit = ? ";
  db.query(SQL_AUTH, [nit], async (err, result) => {
    if (err) {
      console.log(err);
      res.send({ msg: err });
      return;
    }
    if (result.length === 0) {
      res.send({ msg: "USUARIO INVALIDO" });
    } else if (password !== result[0].password) {
      res.send({ msg: "CONTRASEÑA INVALIDA" });
    } else if (password === result[0].password) {
      res.send(result);
    }
  });
};

const getRolUser = (req, res) => {
  const { nit } = req.body;

  SQL_GET_USER = "SELECT * FROM usuarios WHERE nit = ?";

  db.query(SQL_GET_USER, nit, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const getUserData = (req, res) => {
  const { token } = req.body;

  SQL_GET_USER = "SELECT * FROM usuarios WHERE token = ?";

  db.query(SQL_GET_USER, token, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = { registerUser, authenticationUser, getRolUser, getUserData };
