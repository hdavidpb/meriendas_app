const express = require("express");
const { Router } = express;
const router = Router();

const SnackCtrl = require("../controllers/snaksController");
const LoginCtrl = require("../controllers/loginControlle");
const OrderCtrl = require("../controllers/orderController");

// ROUTES MERIENDA'S CONTROL
router.get("/getAllMenu", SnackCtrl.getAllMenu);
router.get("/get-all-menu-available", SnackCtrl.getAllMenuAvailable);
router.post("/addMenu", SnackCtrl.addMenu);
router.delete("/deleteMenu/:uid", SnackCtrl.deleteMenu);
router.put("/updateAvailable/:id", SnackCtrl.updateAvailableMenu);
router.put("/updateMenuSelected/:uid", SnackCtrl.updateMenuSelected);

// ROUTES USER'S CONTROL

router.post("/register-users", LoginCtrl.registerUser);
router.post("/auth", LoginCtrl.authenticationUser);
router.post("/get-rol", LoginCtrl.getRolUser);

//ROUTES ORDER'S CONTROL

router.post("/add-order", OrderCtrl.confirmOrder);
router.post("/get-orders/:nit", OrderCtrl.getAllOrdersFromDate);
router.post("/get-all-employed-orders", OrderCtrl.getAllEmployedOrders);

module.exports = router;
