const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Employee = require("../models/employee.js");

// Employee login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let employee;
    // Search for the employee by email or referalID
    employee = await Employee.findOne({ email })
    if (!employee) {
      // if  employee's Email didn't match find by referalID
      employee = await Employee.findOne({ referalID: email })

      if (!employee) {
        return res.status(400).json({ message: 'Email or referalID is incorrect' });
      }
    }

    // if (email) {
    //   employee = await Employee.findOne({ email });
    // } else if (referalID) {
    //   employee = await Employee.findOne({ referalID });
    // } else {
    //   return res.status(400).json({ message: 'Email or referalID is required' });
    // }

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    //  authentication logic comparing hashed passwords
    const passwordMatch = await bcrypt.compare(password, employee.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful', employee });

  } catch (error) {

    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });

  }
});

// Employee registeration
router.post("/register", async (req, res) => {

  //Getting the data
  const { firstName, lastName, password, profileCreationDate, sale, id } = req.body;
  const makeReferal = 'MGNA' + id;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newEmployee = new Employee({ firstName, lastName, password: hashedPassword, profileCreationDate, sale, id, referalID: makeReferal });

  //Try and Catch Exception
  try {

    const employee = await Employee.findOne({ firstName, lastName, id });
    if (employee) {
      return res.status(409).json({ message: "Employee already exists" });
    }

    await newEmployee.save();
    return res.status(201).json({ message: "Employee created successfully" });

  } catch (error) {

    console.error("Error during sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });

  }
});

//Get all the employees
router.get('/fetchemployees', async (req, res) => {
  try {
    // Fetch all employees from the MongoDB collection
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employee data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch a specific employee by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({ id: id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.json(employee);
  } catch (error) {
    console.error('Error fetching employee data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update total sale based on referral ID
router.put("/updateTotalSale/:referralId", async (req, res) => {
  const { referralId } = req.params;
  // const { firstName, lastName, password, profileCreationDate, referalID, id, email } = req.body;
  const { password, email } = req.body;
  try {
    // console.log(req.body);
    // Find the employee with the given referral ID
    const employee = await Employee.findOne({ referalID: referralId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update the  employee

    const hashedPassword = await bcrypt.hash(password, 10);
    employee.email = email
    employee.password = hashedPassword;
    // employee.firstName = firstName;
    // employee.lastName = lastName;
    // employee.profileCreationDate = profileCreationDate;
    // employee.id = id
    // employee.referalID = referalID

    console.log(employee);
    // employee.sale = updatedTotalSale;

    // Save the updated employee data
    await employee.save();

    return res.status(200).json({
      // message: "Total sale updated successfully",
      // employee: employee,

      message: "Employee updated successfully",
      employee: employee,
    });
  } catch (error) {
    console.error("Error during total sale update:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res
      .status(200)
      .json({
        message: "Employee deleted successfully",
        employee: deletedEmployee,
      });
  } catch (error) {
    console.error("Error during employee deletion:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
