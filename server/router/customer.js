const express = require('express');
const router = express.Router();
const CustomerModel = require('../model/customer/customer');

// Create a new customer
router.post('/add', async (req, res) => {
    try {
       // Check if supplier with same name already exists for this company
              const existingSupplier = await Supplier.findOne({ 
                  company: companyId,
                  name: { $regex: new RegExp(name, 'i') }
              });
      
              if (existingSupplier) {
                  return res.status(400).json({
                      success: false,
                      message: "Supplier with this name already exists for your company"
                  });
              }
      
              // Create new supplier
              const newSupplier = new Supplier({
                  name,
                  contactEmail,
                  phone,
                  address,
                  company: companyId
              });
      
              await newSupplier.save();
      
              return res.status(201).json({
                  success: true,
                  message: "Supplier added successfully",
                  supplier: newSupplier
              });
      
          } catch (error) {
              console.error("Error adding supplier:", error);
              return res.status(500).json({
                  success: false,
                  message: "An error occurred while adding the supplier"
              });
          }
});

// Get all customers
router.get('/view', async (req, res) => {
    try {
        const customers = await CustomerModel.find().populate('company');
        res.status(200).json({ success: true, customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get a single customer
router.get('/view/:id', async (req, res) => {
    try {
        const customer = await CustomerModel.findById(req.params.id).populate('company');
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update a customer
router.put('/update/:id', async (req, res) => {
    try {
        const customer = await CustomerModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, message: 'Customer updated successfully', customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete a customer
router.delete('/delete/:id', async (req, res) => {
    try {
        const customer = await CustomerModel.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router; 