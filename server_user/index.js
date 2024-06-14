const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoute");
require("dotenv").config();

const port = "8000";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/order", userRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
