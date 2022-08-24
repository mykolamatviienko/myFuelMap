const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("e don connect"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 3000;
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

// router.get("/", (req, res) => {
//   res.render("homePage");
// });

// make the server listen to requests
app.use("/", require("./routes/login"));
//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

//showDataOnPage();

function getDataFromDatabase(connectionParametersObject) {
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

function createDataTable(arrEl) {
  let table = document.querySelector(".my-tbody");
  const tableRowElem = document.createElement("tr");
  tableRowElem.innerHTML = `<th scope="row">${arrEl.serial_number}</th>`;
  table.appendChild(tableRowElem);
}

function showDataOnPage() {
  let dataFromDb = null;
  getDataFromDatabase(myDatabaseAddressObject)
    .then((data) => {
      dataFromDb = data;
      data.forEach((element) => {
        createDataTable(element);
      });
    })
    .catch(function (err) {
      console.log(err); //Здесь будет ошибка в случае чего
    });

  // arr.forEach((el) => {
  //   createDataTable(el);
  // });
}
