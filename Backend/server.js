const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDatabase = require("./Config/database");
const express = require("express");

// Handling Uncaught Exceptions
const handlingUncaughtException = () => {
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
  });
};

// Handling Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise rejection");
    server.close(() => {
      process.exit(1);
    });
  });

handlingUncaughtException();

// Load environment variables
dotenv.config({ path: "Backend/Config/.env" });

const PORT = process.env.PORT || 4001;

// Connect to database
connectDatabase();

app.use(express.json());

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});


