const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");
const studresultmanageController = require("../controllers/studentResultmanage");
const adminController = require("../controllers/adminController");

//index
router.get("/", resultController.HomePage);
//Admin Page
router.get("/admin", resultController.admin);
//admin Panel
router.get(
  "/admin/adminPanel",
  adminController.isLoggedIn,
  resultController.adminPanel
);

//view all records
router.get("/admin/manage", adminController.isLoggedIn, resultController.view);

//add new records

router.post("/admin/addstudent", resultController.save);

// edit User

router.post("/admin/editstudent", resultController.update);
// delete user
router.get(
  "/admin/deletestudent/:id",
  adminController.isLoggedIn,
  resultController.deletestudent
);

//result page
router.get("/result/PGresult", resultController.result);
router.get("/result/PGresultPage", resultController.resultPage);
//delet student result
router.get("/admin/deletestudentResult/:id",adminController.isLoggedIn, studresultmanageController.deletestudentResult);

//auth admin
router.post("/auth/adminLogin", adminController.adminLoginAuth);

// Route to display the add result form
// router.get(
//   "/admin/add-result",
//   adminController.isLoggedIn,
//   resultController.addResult
// );
router.post("/add-result", resultController.addResultTODB);

//get results
router.post("/result/get-results", resultController.getresult);

//student result manage

router.get(
  "/admin/manageresultview/:id",
  adminController.isLoggedIn,
  studresultmanageController.manageresultview
);

//update student result

router.post(
  "/admin/edit-result",
  studresultmanageController.updateStudentResult
);

module.exports = router;
