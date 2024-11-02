const mysql = require("mysql");
const { promisify } = require("util");
const JWT = require("jsonwebtoken");
const path = require("path");

//mysql
const conn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_host,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.adminLoginAuth = (req, res) => {
  // console.log(req.body);
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).render("./adminLogin/adminLogin", {
        msg: "Please enter Your username And Password",
      });
    }
    conn.query(
      "select * from adminDetails where username=?",
      [username],
      (error, result) => {
        // console.log(result);
        // console.log(`DB conn error :${error}`);
        if (result <= 0 || result === undefined) {
          return res.status(401).render("./adminLogin/adminLogin", {
            msg: "Invalid Credentials",
          });
        } else {
          if (password !== result[0].password) {
            return res.status(401).render("./adminLogin/adminLogin", {
              msg: "Invalid Password",
            });
          } else {
            const id = result[0].ID;
            const token = JWT.sign({ id: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });
            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("PHY123", token, cookieOptions);
            res.status(200).redirect("/admin/adminPanel");
          }
        }
      }
    );
  } catch (err) {
    console.log(`Line 55 adminController.js:${err}`);
  }
};

///is logged in
exports.isLoggedIn = async (req, res, next) => {
  //   req.name = "checkLogin";

  try {
    if (req.cookies.PHY123) {
      const decode = await promisify(JWT.verify)(
        req.cookies.PHY123,
        process.env.JWT_SECRET
      );
      //   console.log(decode);
      conn.query(
        "select * from adminDetails where id=?",
        [decode.id],
        (error, result) => {
          if (!result) {
            console.log(result);

            return next();
          }
          req.user = result[0];

          return next();
        }
      );
    } else {
      console.log("none");
      res.status(500).redirect("/admin");
      return next();
    }
  } catch (e) {
    console.log(`line 84${e}`);
    return next();
  }
};
exports.notificationview = (req, res) => {
  // Function to format the timestamp
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    // Get day, month, year, hours, and minutes
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure two digits

    // Convert to 12-hour format
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12"; // the hour '0' should be '12'

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }

  conn.query("SELECT * FROM notifications", (err, results) => {
    if (err) throw err;

    // Format each notification's timestamp
    const formattedResults = results.map((notification) => ({
      ...notification,
      created_at: formatTimestamp(notification.timestamp), // Assuming 'timestamp' holds the date
    }));

    res.render("./adminLogin/notification", {
      notifications: formattedResults,
    });
  });
};

exports.addnotification = (req, res) => {
  const { message } = req.body;
  const currentTime = new Date(); // Get the current time

  if (message) {
    conn.query(
      "INSERT INTO notifications ( timestamp,Notification) VALUES (?, ?)",
      [currentTime, message], // Insert message and current time
      (err) => {
        if (err) throw err;
        res.redirect("/admin/notifications");
      }
    );
  }
};

exports.deletenotification = (req, res) => {
  const { id } = req.body;
  conn.query(
    "DELETE FROM notifications WHERE Notification_ID = ?",
    [id],
    (err) => {
      if (err) throw err;
      res.redirect("/admin/notifications");
    }
  );
};
