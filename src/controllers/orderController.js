const db = require("../database");

const confirmOrder = (req, res) => {
  const {
    sede,
    menuId,
    price,
    menuName,
    jornada,
    idEmployed,
    entity,
    date,
    time,
    deliveredBy,
  } = req.body;
  const values = [
    sede,
    menuId,
    price,
    menuName,
    jornada,
    idEmployed,
    entity,
    date,
    time,
    deliveredBy,
  ];
  const SQL_CONFIRM_ORDER =
    "INSERT INTO pedidos (sede, menu_id,precio,nombre_menu,jornada,nit_empleado,entidad,fecha,hora) VALUES (?,?,?,?,?,?,?,?,?)";

  db.query(SQL_CONFIRM_ORDER, [...values], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

const getAllOrdersFromDate = (req, res) => {
  const { initialDate, finalDate } = req.body;
  const { nit } = req.params;

  const SQL_GET_ORDERS =
    "select * from pedidos WHERE nit_empleado = ? and (fecha BETWEEN  ? and ? )";

  db.query(SQL_GET_ORDERS, [nit, initialDate, finalDate], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

const getAllEmployedOrders = (req, res) => {
  const { initialDate, finalDate, nit, jornada, sede, state, menuName } =
    req.body;

  let values = [initialDate, finalDate];

  let SQL_GET_EMPLOYED_ORDERS =
    "select * from pedidos WHERE  (fecha BETWEEN  ? and ? )";

  if (nit)
    (SQL_GET_EMPLOYED_ORDERS += "and nit_empleado = ?"), values.push(nit);
  if (jornada)
    (SQL_GET_EMPLOYED_ORDERS += " and jornada = ?"), values.push(jornada);
  if (sede) (SQL_GET_EMPLOYED_ORDERS += " and sede = ?"), values.push(sede);
  if (state) (SQL_GET_EMPLOYED_ORDERS += " and estado = ?"), values.push(state);
  if (menuName)
    (SQL_GET_EMPLOYED_ORDERS += " and nombre_menu = ?"), values.push(menuName);

  console.log(SQL_GET_EMPLOYED_ORDERS);

  db.query(SQL_GET_EMPLOYED_ORDERS, [...values], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result.sql);
    }
  });
};

module.exports = {
  confirmOrder,
  getAllOrdersFromDate,
  getAllEmployedOrders,
};
