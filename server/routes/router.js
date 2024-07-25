const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");
const adminController = require("../controllers/adminController");

//index
router.get("/", resultController.HomePage);
//Admin Page
router.get("/admin", resultController.admin);

//view all records
router.get("/admin/manage", adminController.isLoggedIn, resultController.view);

//add new records
router.get("/admin/addstudent", resultController.addstudent);
router.post("/admin/addstudent", resultController.save);

// edit User
router.get("/admin/editstudent/:id", resultController.editstudent);
router.post("/admin/editstudent/:id", resultController.update);
// delete user
router.get("/admin/deletestudent/:id", resultController.deletestudent);

//result page
router.get("/result/PGresult", resultController.result);
router.get("/result/PGresultPage", resultController.resultPage);

//auth admin
router.post("/auth/adminLogin", adminController.adminLoginAuth);

// Route to display the add result form
router.get("/add-result", resultController.addResult);
router.post("/add-result", resultController.addResultTODB);

module.exports = router;
