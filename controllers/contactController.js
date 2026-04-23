const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

// @decs get all contacts
// @decs get /api/contacts
// @access private

const getContacts = asyncHandler(async (req,res)=>{
    const contacts= await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
})

// @decs get all contacts
// @decs get /api/contacts
// @access private


const createContacts = asyncHandler(async (req, res) => {
    // Ensure body exists (requires express.json() middleware)
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400);
        throw new Error("Request body is required");
    }

    const { name, email, phone } = req.body;

    // Validate mandatory fields
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields (name, email, phone) are required");
    }

    // Create the contact
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id // Ensure auth middleware is used before this route
    });

    res.status(201).json(contact);
});


// @decs get all contacts
// @decs get /api/contact/:id
// @access private

const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error('Contact Not found');
    }
    res.status(200).json(contact)
})  

// @decs get all contacts
// @decs get /api/contacts/:id
// @access private
// const updateContect =   asyncHandler(async (req,res)=>{
//      const contact = await Contact.findById(req.params.id)
//     if(!contact){
//         res.status(404);
//         throw new Error('Contact Not found');
//     }
//     const updatedContact = await Contact.findByIdAndUpdate(
//         req.params.id,
//         req.body.Contact,
//         {returnDocument:'after'}
//     );
//     res.status(200).json(updatedContact)
// })

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not found');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, // Changed from req.body.Contact to req.body
        { returnDocument: 'after', runValidators: true } 
    );

    res.status(200).json(updatedContact);
});

// @decs get all contacts
// @decs get /api/contacts
// @access private
const deleteContact = asyncHandler(async (req,res)=>{
     const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not found');
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({"message":`Delete contact ${req.params.id}`})
}   )

module.exports = {getContacts,createContacts,getContact,updateContact,deleteContact}