const asyncHandler = require('express-async-handler')
const Contact = require("../mondles/contactModles")

// @decs get all contacts
// @decs get /api/contacts
// @access private

const getContects = asyncHandler(async (req,res)=>{
    const contacts= await Contact.find({user_id: req.user_id});
    res.status(200).json(contacts)
})

// @decs get all contacts
// @decs get /api/contacts
// @access private

const createContect = asyncHandler(async(req,res)=>{
    // console.log(req.body)
    if(!req.body) throw new Error("Body is required")
    const {name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required")
    }
    const contact = await Contact.create({
        name,email,phone,user_id: req.user_id
    })
    res.status(201).json(contact)
})

// @decs get all contacts
// @decs get /api/contact/:id
// @access private

const getContect = asyncHandler(async (req,res)=>{
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

const updateContect = asyncHandler(async (req, res) => {
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
const deleteContect = asyncHandler(async (req,res)=>{
     const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not found');
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({"message":`Delete content ${req.params.id}`})
}   )

module.exports = {getContects,createContect,getContect,updateContect,deleteContect}