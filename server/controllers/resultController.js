const mysql = require("mysql");

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
      connection.query("select * from results ", (err, rows) => {
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
    const { regno, name, dept } = req.body;
    connection.query(
      "insert into results (REGNO,NAME,DEPT) values(?,?,? )",
      [regno, name, dept],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("addstudent", {
            style: "adduser",
            msg: "User Details Added Successfuly..",
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
      "select * from results where REGNO=? ",
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
      "update results set NAME=?,DEPT=? where REGNO=? ",
      [name, dept, id],
      (err, rows) => {
        connection.release();
        if (!err) {
          conn.getConnection((err, connection) => {
            if (err) throw err;
            // get id from URL
            let id = req.params.id;

            connection.query(
              "select * from results where REGNO=? ",
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
    connection.query("delete from results where REGNO=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.redirect("/admin/manage");
      } else {
        console.log("Error:" + err);
      }
    });
  });
};
