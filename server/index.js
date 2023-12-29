const express = require("express");
const mongoose = require("mongoose");
// const routes = require("../Routes/route.js");
const routes = require("./Routes/route.js");
// const employeeRoutes = require("../Routes/employeeRoutes.js");
const employeeRoutes = require("./Routes/employeeRoutes.js");
const adminRoutes = require('./Routes/adminRoutes.js');
const customerRoutes = require('./Routes/customerRoutes.js');
const salesStaffRoutes = require('./Routes/salesStaffRoutes.js');
const email = require('./Routes/email.js');

const cors = require('cors')
require("dotenv").config();

const app = express();
const mongoString = process.env.DATABASE_URL;

//App Routes Connections
app.use(express.json());
app.use(cors())
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

//Database Connection
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

//Routes Connections
app.use('/api/employee', employeeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/salestaff', salesStaffRoutes);
// app.use('/api/email', email);
