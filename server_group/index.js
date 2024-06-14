const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const groupRoutes = require("./src/routes/groupRoute");
const groupItemRoutes = require("./src/routes/groupItemRoute");
require("dotenv").config();

const port = "8001";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/order", groupRoutes);
app.use("/order", groupItemRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
