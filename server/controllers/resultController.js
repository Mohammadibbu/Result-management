const mysql = require("mysql");
const path = require("path");

//mysql
const conn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_host,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
//index page
exports.HomePage = (req, res) => {
  res.render("index");
};
//result page

exports.result = (req, res) => {
  res.render("./results/result", { BodyBGColor: "rgb(67, 216, 204);" });
};

exports.addResult = (req, res) => {
  res.render("./results/addStudResult/addstudResult", {
    BodyBGColor: "rgb(67, 216, 204);",
  });
};
exports.addResultTODB = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) {
      console.error("Connection error:", err);
      res.status(500).send("Database connection failed");
      return;
    }

    // Destructuring and defaulting to zero for numeric fields if not provided
    const {
      regNo,
      semester,
      subject,
      st1 = 0,
      st2 = 0,
      endSem = 0,
      total = 0,
      result,
    } = req.body;

    // Ensure all numeric values are actually numbers
    const st1Num = parseFloat(st1) || 0;
    const st2Num = parseFloat(st2) || 0;
    const endSemNum = parseFloat(endSem) || 0;
    const totalNum = parseFloat(total) || 0;

    const query =
      "INSERT INTO Results (SEMESTER, register_number, subjectCode, ST1, ST2, EndSemester, Total, Result) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [semester, regNo, subject, st1Num, st2Num, endSemNum, totalNum, result],
      (err, result) => {
        connection.release();

        if (err) {
          console.error("Query error:", err);
          res.status(500).send(err.code);
        } else {
          res.send("Result Details Added Successfully.");
          res.redirect("/add-result");
        }
      }
    );
  });
};

exports.resultPage = (req, res) => {
  res.render("./results/resultPage", { BodyBGColor: "rgb(67, 216, 204);" });
};
//admin
exports.admin = (req, res) => {
  res.render("./adminLogin/adminLogin", { style: "index" });
};

exports.view = (req, res) => {
  // console.log(`req  :${req.user}`);
  if (req.user) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("select * from Students ", (err, rows) => {
        connection.release();
        if (!err) {
          res.render("manageStudents", {
            style: "managestud",
            data: rows,
            admin: req.user,
            BodyBGColor: "rgb(67, 216, 204);",
          });
        } else {
          console.log("Error in listing variable" + err);
        }
      });
    });
  } else {
    res.redirect("/admin");
  }
};

//adduser

exports.addstudent = (req, res) => {
  res.render("addstudent", {
    style: "adduser",
    BodyBGColor: "rgb(67, 216, 204);",
  });
};
//save
exports.save = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    const { regno, Dob, name, dept } = req.body;
    connection.query(
      "insert into Students (register_number,Dob,student_name,class) values(?,?,?,?)",
      [regno, Dob, name, dept],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("addstudent", {
            style: "adduser",
            msg: "Student Details Added Successfuly..",
            BodyBGColor: "rgb(67, 216, 204);",
          });
        } else {
          console.log(err.code);
          res.send(err.code);
        }
      }
    );
  });
};

//edit user
exports.editstudent = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    // get id from URL
    let id = req.params.id;

    connection.query(
      "select * from Students where register_number=? ",
      [id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("editstudent", {
            data: rows,
            style: "edituser",
            BodyBGColor: "rgb(67, 216, 204);",
          });
        } else {
          console.log("Error in listing variable" + err);
        }
      }
    );
  });
};

// update
exports.update = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    // get id from URL
    let id = req.params.id;
    let { regno, name, dept } = req.body;

    connection.query(
      "update Students set student_name=?,class=? where register_number=? ",
      [name, dept, id],
      (err, rows) => {
        connection.release();
        if (!err) {
          conn.getConnection((err, connection) => {
            if (err) throw err;
            // get id from URL
            let id = req.params.id;

            connection.query(
              "select * from Students where register_number=? ",
              [id],
              (err, rows) => {
                connection.release();
                if (!err) {
                  res.render("editstudent", {
                    data: rows,
                    msg: "Updated successfully..",
                    style: "edituser",
                    BodyBGColor: "rgb(67, 216, 204);",
                  });
                } else {
                  console.log("Error in listing variable" + err);
                }
              }
            );
          });
        } else {
          console.log("Error in listing variable" + err);
        }
      }
    );
  });
};
// //delete user
exports.deletestudent = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    const id = req.params.id;
    connection.query(
      "delete from Students where register_number=?",
      [id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.redirect("/admin/manage");
        } else {
          console.log("Error:" + err);
        }
      }
    );
  });
};
