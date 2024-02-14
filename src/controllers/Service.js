const User = require("../models/consultant")
const Service = require("../models/service.models")




// Controller for creating a service
exports.createService = async (req, res) => {
    try {
        // Get consultant ID from request object
        const consultantId = req.user.id

        

        // Get all required fields from request body
        const { name, description, price, duration } = req.body;

        const consultant = await User.findById(consultantId,{role:"Consultant"})

       

        // Check if any of the required fields are missing
        if (!name || !description || !price || !duration) {
            return res.status(400).json({ success: false, message: "All fields are mandatory" });
        }

        // Create a new service with the given details
        const newService = await Service.create({
            name: name,
            description: description,
            price: price,
            duration: duration
            // Add availability slots here if needed
        })

        await User.findByIdAndUpdate(
            {
              _id: consultant._id,
            },
            {
              $push: {
                courses: newService._id,
              },
            },
            { new: true }
          )
        // Return the new service and a success message
        res.status(200).json({
            success: true,
            data: newService,
            message: "Service created successfully"
        });
    } catch (error) {
        // Handle any errors that occur during the creation of the service
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create service",
            error: error.message
        });
    }
}
