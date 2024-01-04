const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

const Employee = require("../models/employee.js");

//-----------------------------------------post--------------------------------------------------------------

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
  const { firstName, lastName, password, profileCreationDate, sale, id, email } = req.body;
  const makeReferal = 'MGNA' + id;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newEmployee = new Employee({ firstName, lastName, password: hashedPassword, profileCreationDate, sale, id, email,referalID: makeReferal });

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

router.post('/cpass/:id', async (req, res) => {
  const { id } = req.params
  const { currentPassword } = req.body;

  try {
    let employee;
    // Search for the employee by email or referalID
    employee = await Employee.findOne({ id: id })
    if (!employee) {
      // if  employee's Email didn't match find by referalID
      return res.status(400).json({ message: "Employee not found" })
    }

    //  authentication logic comparing hashed passwords
    // const hashedPassword = await bcrypt.hash(currentPassword, 10);
    console.log(req.body);
    const passwordMatch = await bcrypt.compare(currentPassword, employee.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'true', employee });

  } catch (error) {

    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });

  }
});


//Generate ------------------------------EMAIL + OTP------------------------------------------

router.post('/sendEmail/:id', async (req, res) => {
  const { id } = req.params;
  const { oldEmail } = req.body;

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString().substring(0, 6);
  };

  const otp = generateOTP();

  try {
    const result = await Employee.findOne({ id });
    await Employee.findByIdAndUpdate(result._id, { OTP: otp });

    // Check if the Employee update was successful
    if (!Employee) {
      return res.status(404).send({ message: 'Employee not found.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });


    const mailOptions = {
      from: process.env.EMAIL,
      to: oldEmail,
      subject: 'OTP for Verification',
      text: `Your OTP is: ${otp}`
    };

    // Send email with OTP
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error during email sending:', error);
        return res.status(500).send({ message: 'There was an error sending the email.', error: error.message });
      }
      return res.status(200).send({ message: 'OTP sent successfully.', otp });
    });

  } catch (error) {
    console.error('Error during OTP operation:', error);
    return res.status(500).send({ message: 'Internal server error', error: error.message });
  }
});


//-----------------------------------------GET--------------------------------------------------------------

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

//-----------------------------------------PUT--------------------------------------------------------------

// Update total sale based on referral ID
router.put("/updateEmail/:id", async (req, res) => {
  const { id } = req.params;
  // const { firstName, lastName, password, profileCreationDate, referalID, id, email } = req.body;
  const { oldEmail, newEmail } = req.body;
  try {

    const employee = await Employee.findOne({ id: id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (oldEmail === newEmail) {
      return res.status(404).json({ message: "Please enter a new Email" });
    }
    employee.email = newEmail;
    console.log(employee);
    // Save the updated employee data
    await employee.save();

    return res.status(200).json({
      message: "Employee Email updated successfully",
      employee: employee,
    });
  } catch (error) {
    console.error("Error during email update:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});




// OTP
router.post("/otp/:id", async (req, res) => {
  const { id } = req.params;
  const { OTP } = req.body;
  try {

    const employee = await Employee.findOne({ id: id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // const OTP_EXPIRATION_TIME = 5 * 60 * 1000
    // const currentTime = new Date();
    // const otpTime = new Date(employee.otpCreatedAt);
    // const isOtpExpired = currentTime - otpTime > OTP_EXPIRATION_TIME;

    // // OTP has expired
    // if (isOtpExpired) {
    //   return res.status(410).json({ message: "OTP has expired. Please request a new one." });
    // }
    // Update the  employee
    if (employee.OTP === +OTP) {
      console.log(employee);
      await employee.save();
      return res.status(200).json({

        message: "OTP matched successfully",
        employee: employee,
      });
    } else {
      // Incorrect OTP
      return res.status(401).json({ message: "OTP did not match" });
    }
  } catch (error) {
    console.error("Error during OTP update:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



//  Password
router.put("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  const { confirmPassword } = req.body;
  try {

    const employee = await Employee.findOne({ id: id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const hashedPassword = await bcrypt.hash(confirmPassword, 10);
    employee.password = hashedPassword;
    console.log(employee);

    // Save the updated employee data
    await employee.save();

    return res.status(200).json({
      message: "Employee updated successfully",
      employee: employee,
    });
  } catch (error) {
    console.error("Error during total sale update:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//-----------------------------------------DELETE--------------------------------------------------------------

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
