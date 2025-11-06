const express = require("express");
const app = express();
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());
const path = require("path");
require("dotenv").config();
require("./connection");

const frontendDist = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendDist));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});


const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const listRoutes = require('./routes/list');
app.use('/', listRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});