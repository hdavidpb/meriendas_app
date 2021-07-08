const db = require("../database");

const confirmOrder = (req, res) => {
  const {
    sede,
    menuId,
    price,
    menuName,
    jornada,
    idEmployed,
    employedName,
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
    employedName,
    entity,
    date,
    time,
    deliveredBy,
  ];
  const SQL_CONFIRM_ORDER =
    "INSERT INTO pedidos (sede, menu_id,precio,nombre_menu,jornada,nit_empleado,nombre_empleado,entidad,fecha,hora) VALUES (?,?,?,?,?,?,?,?,?,?)";

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

const updateDeliveredOrder = (req, res) => {
  const { state, user_nit } = req.body;
  const { id } = req.params;

  let SQL_UPDATE_DELIVERED = "UPDATE pedidos";
  if (state === "entregado")
    SQL_UPDATE_DELIVERED +=
      " SET estado = ? , entregado_por = ? , eliminado_por = null WHERE id = ?";

  if (state === "eliminado")
    SQL_UPDATE_DELIVERED +=
      " SET estado = ? , eliminado_por = ? , entregado_por = null WHERE id = ?";

  db.query(SQL_UPDATE_DELIVERED, [state, user_nit, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const updateDeliveredOrderAnular = (req, res) => {
  const { state } = req.body;
  const { id } = req.params;

  let SQL_UPDATE_DELIVERED = "UPDATE pedidos SET estado = ? WHERE id = ?";

  db.query(SQL_UPDATE_DELIVERED, [state, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = {
  confirmOrder,
  getAllOrdersFromDate,
  getAllEmployedOrders,
  updateDeliveredOrder,
  updateDeliveredOrderAnular,
};
