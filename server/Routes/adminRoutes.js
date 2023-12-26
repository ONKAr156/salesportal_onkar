const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const admin = require("../models/admin");

const jwtSecret = "mynameissaurabhratnaparkhi";

function authenticateJWT(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

//Get all the Admins
router.get('/fetchadmin', async (req, res) => {
  try {
    // Fetch all employees from the MongoDB collection
    const admin = await Admin.find();
    res.json(admin);

  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get single admin
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // const admin = await Admin.findOne({ id: id });
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }

    return res.json(admin);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Admin login
router.post("/login", async (req, res) => {
  // const { firstName, lastName, password } = req.body;
  const { email, adminId, password } = req.body;

  try {
    let admin;
    // Search for the employee by email or referalID
    admin = await Admin.findOne({ email })
    if (!admin) {
      // if admin's Email didn't match find by referalID
      admin = await Admin.findOne({ adminId: email })

      if (!admin) {
        return res.status(400).json({ message: 'Email or referalID is incorrect' });
      }
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a JWT
    const token = jwt.sign({ adminId: admin._id }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", jwtTokenGiven: token, admin });

  } catch (error) {

    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });

  }

});

//Register Admin Route
router.post("/register", async (req, res) => {
  const { firstName, lastName, password, profileCreationDate, sale, id, adminId, } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ firstName, lastName, password: hashedPassword, profileCreationDate, sale, id, adminId });

  try {

    const admin = await Admin.findOne({ firstName, lastName });
    if (admin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    await newAdmin.save();
    res.status(201).json({ message: 'Successfully created admin' });

  } catch (error) {

    console.error("Error during sign-up:", error);
    res.status(500).json(error);

  }

});

// Update admin
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, password, profileCreationDate, sale, adminId, email } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { firstName, lastName, password: hashedPassword, profileCreationDate, sale, adminId, email },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error("Error during admin update:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete admin
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res
      .status(200)
      .json({ message: "Admin deleted successfully", admin: deletedAdmin });
  } catch (error) {
    console.error("Error during admin deletion:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
