const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const orderRoutes = require("./src/routes/orderRoute");
const orderItemRoutes = require("./src/routes/orderItemRoute");
require("dotenv").config();

const port = "8002";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/order", orderRoutes);
app.use("/order", orderItemRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
