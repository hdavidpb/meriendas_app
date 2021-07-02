const db = require("../database");

const getAllMenu = (req, res) => {
  const SQL_GET = "SELECT * FROM meriendas_table";
  db.query(SQL_GET, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
};

const getAllMenuAvailable = (req, res) => {
  const GET_ALL_AVAILABLE = "SELECT * FROM meriendas_table WHERE available = 1";

  db.query(GET_ALL_AVAILABLE, (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

const addMenu = (req, res) => {
  const { price, description, title, source_img, uid } = req.body;

  const SQL_INSERT =
    "INSERT INTO meriendas_table (price, description,title,source_img,uid) VALUES (?,?,?,?,?)";
  db.query(
    SQL_INSERT,
    [price, description, title, source_img, uid],
    (err, resul) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

const deleteMenu = (req, res) => {
  const { uid } = req.params;

  const SQL_DELETE = `DELETE FROM meriendas_table WHERE uid = ?`;
  db.query(SQL_DELETE, uid, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const updateAvailableMenu = (req, res) => {
  const { id } = req.params;
  const { available } = req.body;
  const change = available === 1 ? 0 : 1;
  const SQL_UPDATE_AVAILABLE =
    "UPDATE meriendas_table SET available = ? WHERE id = ?";

  db.query(SQL_UPDATE_AVAILABLE, [change, id], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

const updateMenuSelected = (req, res) => {
  const { source_img, price, title, description } = req.body;
  const { uid } = req.params;
  const values = [source_img, price, title, description, uid];
  const SQL_UPDATE_SELECTED =
    "UPDATE meriendas_table SET source_img = ?, price = ? , title = ? , description = ? WHERE uid = ? ";
  db.query(SQL_UPDATE_SELECTED, [...values], (err, result) => {
    err && console.log(err);
  });
};
module.exports = {
  getAllMenu,
  addMenu,
  deleteMenu,
  updateAvailableMenu,
  updateMenuSelected,
  getAllMenuAvailable,
};
