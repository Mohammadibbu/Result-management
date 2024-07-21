const mysql = require("mysql");
const { promisify } = require("util");
const JWT = require("jsonwebtoken");
//mysql
const conn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_host,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.adminLoginAuth = (req, res) => {
  //   console.log(req.body);
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
        console.log(result);
        if (result <= 0) {
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
            res.status(200).redirect("/admin/manage");
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
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
            return next();

            // console.log(result);
          }
          req.user = result[0];
          return next();
        }
      );
    }
  } catch (e) {
    console.log(e);
    return next();
  }
};
