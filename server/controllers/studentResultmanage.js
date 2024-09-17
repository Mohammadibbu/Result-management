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

// Route to handle form submission and query results
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
exports.manageresultview = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    // get id from URL
    let registerNumber = req.params.id;
    const sql = `SELECT * FROM Results WHERE register_number = ?`;

    const SQL_for_GetName = `SELECT student_name,Dob FROM Students WHERE register_number = ?`;
    conn.query(sql, [registerNumber], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Error fetching results");
      }
      const DATA = results.map(packet => ({
        resultId: packet.result_id,
        semester: packet.SEMESTER,
        registerNumber: packet.register_number,
        subject: packet.subjectCode,
        ST1: packet.ST1,
        ST2: packet.ST2,
        endSemester: packet.EndSemester,
        total: packet.Total,
        result: packet.Result
      }));
      // console.log(DATA);
      
    

      // Fetch student name after results are found
      conn.query(SQL_for_GetName, [registerNumber], (err, nameResult) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).send("Error fetching student name");
        }

        // Render a result page with the queried results and student name
        // Check if results are found
        if (results.length === 0) {
          return res.render("Studentresultmanage", {
            register_number: registerNumber,
            studentName: nameResult[0].student_name,
            DOB: formatDate(nameResult[0].Dob),
            msg: "click add result ",
          });
          res.status(404).send("No results found for the given details");
        }
        res.render("Studentresultmanage", {
          register_number: registerNumber,
          studentName: nameResult[0].student_name,
          DOB: formatDate(nameResult[0].Dob),
          SEMESTER: results[0].SEMESTER,
          data: results,
        });
        // console.log("Results:", results);
        // console.log("Results:", nameResult);
      });
    });
  });
};

// POST route to update student result
exports.updateStudentResult = (req, res) => {
  const { register_number, subjectCode, ST1, ST2, EndSemester, Total, Result } =
    req.body;

  // SQL query to update the result
  const sql = `
      UPDATE Results
      SET ST1 = ?, ST2 = ?, EndSemester = ?, Total = ?, Result = ?
      WHERE register_number = ? AND subjectCode = ?
    `;

  conn.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      sql,
      [ST1, ST2, EndSemester, Total, Result, register_number, subjectCode],
      (err, results) => {
        connection.release();
        if (err) {
          console.error("Error executing query:", err);
          return res
            .status(500)
            .render(`/admin/manageresultview/${register_number}`, {
              error: "Error updating results",
            });
        }
        res.redirect(`/admin/manageresultview/${register_number}`); // Redirect to a specific page after updating
      }
    );
  });
};
//delete
exports.deletestudentResult = (req, res) => {
  conn.getConnection((err, connection) => {
    if (err) throw err;
    const id = req.params.id;
    console.log(id);
    
    connection.query(
      "delete from Results where register_number=?",
      [id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.redirect(`/admin/manageresultview/${id}`);
        } else {
          console.log("Error:" + err);
        }
      }
    );
  });
};