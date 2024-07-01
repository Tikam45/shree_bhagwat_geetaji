const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from this origin
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

require("./config/database").connect();

const routes = require("./routes/routes");
app.use("", routes);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
