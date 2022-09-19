//js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mysql = require("mysql2");
const myDatabaseAddressObject = {
  host: "localhost",
  port: "3306",
  user: "root",
  database: "myfuelmapdb",
  password: "admin",
};
//For Home Page
const homePageView = (req, res) => {
  getDataFromDatabase(myDatabaseAddressObject).then((data) => {
    res.render("homePage", { mass: data });
  });
};

const loginView = (req, res) => {
  res.render("login", {});
};

const registerView = (req, res) => {
  res.render("register", {});
};

//Post Request that handles Register
const registerUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const location = req.body.location;
  const password = req.body.password;
  const confirm = req.body.confirm;
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }
  //Confirm Passwords
  if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("email exists");
        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        //Validation
        const newUser = new User({
          name,
          email,
          location,
          password,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};
const loginUser = (req, res) => {
  const { email, password } = req.body;
  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
};
function showDataOnPage() {
  let dataFromDb = null;
  getDataFromDatabase(myDatabaseAddressObject)
    .then((data) => {
      //console.log(data);
    })
    .catch(function (err) {
      console.log(err); //Здесь будет ошибка в случае чего
    });
}
async function getDataFromDatabase(connectionParametersObject) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionParametersObject);
    connection.connect(function (err) {
      if (err) {
        return console.error("Ошибка: " + err.message);
      } else {
        console.log("Подключение к серверу MySQL успешно установлено");
      }
    });
    connection.query("SELECT * FROM refueling_list", (err, rows) => {
      if (err) throw err;
      console.log("Data received from Db:");
      //console.log(rows);
      resolve(rows);
    });

    connection.end();
  });
}

module.exports = {
  homePageView,
  loginView,
  registerView,
  registerUser,
  loginUser,
};
