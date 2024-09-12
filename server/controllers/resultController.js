const { log } = require("console");
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

function formatDate(dateString) {
  //   console.log(dateString);
  if (dateString == null) {
    return "NOT FOUND";
  }
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

//index page
exports.HomePage = (req, res) => {
  res.render("index");
};
//result page

exports.result = (req, res) => {
  res.render("./results/result", { BodyBGColor: "rgb(67, 216, 204);" });
};

// exports.addResult = (req, res) => {
//   res.render("./results/addStudResult/addstudResult", {
//     BodyBGColor: "rgb(67, 216, 204);",
//   });
// };
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
          res.status(500).redirect(`/admin/manageresultview/${regNo}`);
        } else {
          // res.send("Result Details Added Successfully.");

          res.status(200).redirect(`/admin/manageresultview/${regNo}`);
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
//admin Panel
exports.adminPanel = (req, res) => {
  res.render("./adminLogin/adminPanel");
};
exports.view = (req, res) => {
  // console.log(`req  :${req.user}`);
  if (req.user) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("select * from Students ", (err, rows) => {
        connection.release();
        if (!err) {
          const stud_data = rows.map((item) => {
            return {
              ...item,
              Dob: formatDate(item.Dob),
            };
          });
          // console.log(stud_data);

          res.render("manageStudents", {
            data: stud_data,
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

//save ADD STUDENTS
exports.save = (req, res) => {
  const {
    register_number,
    addDob: Dob,
    student_name,
    class: department,
  } = req.body;

  if (!register_number || !student_name || !department) {
    return res.render("manageStudents", {
      error_msg: "Please fill in all required fields.",
    });
  }

  const query =
    "INSERT INTO Students (register_number,Dob, student_name, class) VALUES (?, ?,?,?)";
  conn.query(
    query,
    [register_number, Dob, student_name, department],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).render("manageStudents", {
          error_msg: "Server error. Please try again later.",
        });
      }
      res.redirect("/admin/manage?success=Student+added+successfully!");
      // Redirect to the manage students page
    }
  );
};

//edit user
// update
exports.update = (req, res) => {
  // console.log(req.body);
  const { register_number, student_name, dob, class: department } = req.body;

  if (!register_number || !student_name || !department || !dob) {
    return res.status(400).send("Please fill in all required fields.");
  }

  const query =
    "UPDATE Students SET student_name = ?, class = ? ,Dob=? WHERE register_number = ?";
  conn.query(
    query,
    [student_name, department, dob, register_number],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error. Please try again later.");
      }
      res.redirect("/admin/manage"); // Redirect to the manage students page
    }
  );
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

exports.getresult = (req, res) => {
  const registerNumber = req.body.regno;
  const dob = req.body.dob;
  console.log(registerNumber);
  // SQL query to get the results for the given register number
  const sql = `SELECT * FROM Results WHERE register_number = ?`;
  // SQL query to get the student's name
  const SQL_for_GetName = `SELECT student_name,Dob FROM Students WHERE register_number = ?`;

  conn.query(sql, [registerNumber], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Error fetching results");
    }

    // Check if results are found
    if (results.length === 0) {
      return res.status(404).send("No results found for the given details");
    }

    // Fetch student name after results are found
    conn.query(SQL_for_GetName, [registerNumber], (err, nameResult) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Error fetching student name");
      }

      // Render a result page with the queried results and student name
      res.render(path.join(__dirname, "../../views/results/resultPage.hbs"), {
        studentName: nameResult[0].student_name,
        DOB: formatDate(nameResult[0].Dob),
        SEMESTER: results[0].SEMESTER,
        data: results,
      });
      console.log("Results:", results);
    });
  });
};
