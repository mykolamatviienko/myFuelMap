const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const PORT = 3000;

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
