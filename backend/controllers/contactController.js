const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");

// @desc Get all Contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler ( async (req, res) => {
    const contacts = await contactModel.find();
    if (!contacts) {
        res.status(404);
        throw new Error("No contacts found");
    }
    res.status(200).json(contacts)
});

// @desc Create Contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler( async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const contact = await contactModel.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact);
});

// @desc Get a Contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler( async(req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found with that id');
    }
    res.status(200).json(contact);
});

// @desc Update a Contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler( async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found with that id');
    }

    const update = await contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(update);
});

// @desc Delete a Contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler( async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found with that id');
    }
    const deleteContact = await contactModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteContact);
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};