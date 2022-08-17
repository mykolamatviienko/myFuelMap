const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const PORT = 3000;
const mysql = require("mysql2");
const myDatabaseAddressObject = {
  host: "localhost",
  port: "3306",
  user: "root",
  database: "myfuelmapdb",
  password: "admin",
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

router.get("/", (req, res) => {
  res.render("homePage");
});

// make the server listen to requests
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

let temp = null;
getDataFromDatabase(myDatabaseAddressObject, temp);

function getDataFromDatabase(connectionParametersObject, dataFromDB) {
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

    dataFromDB = rows;
    console.log("Data received from Db:");
    console.log(rows);
  });
}
