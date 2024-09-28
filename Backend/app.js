const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config({ path: "Backend/Config/.env" });

app.use(cors());

app.use(express.json());

module.exports = app;
