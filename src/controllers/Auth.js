const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const otpGenerator = require("otp-generator");
const User = require("../models/user.models");
const OTP = require("../models/OTP");
const twilioConfig = require('../config/twilio');

exports.sendotp = async (req, res) => {
    try {
      const { phoneNumber } = req.body;
  
      const checkUserPresent = await User.findOne({ phoneNumber });
  
      if (checkUserPresent) {
              // Return 401 Unauthorized status code with error message
              return res.status(401).json({
                  success: false,
                  message: `User is Already Registered`,
              });
          }
  
      var otp = otpGenerator.generate(6, {
              upperCaseAlphabets: false,
              lowerCaseAlphabets: false,
              specialChars: false,
          });
  
      const otpDocument = new OTP({ phoneNumber,otp:otp });
      await otpDocument.save();
  
      return res.json({
           message: 'OTP generated and saved successfully' });
  
    }catch (error) {
          console.log(error.message);
          return res.status(500).json({ success: false, error: error.message });
      }
  }

  
exports.signup = async (req,res) =>{
    try{
        const {fullName,phoneNumber,otp,email} = req.body

        if(!fullName || !phoneNumber || !otp || !email){
            return res.status(403).send({
				success: false,
				message: "All Fields are required",
			})
        }
        
        const existingUser = await User.findOne({
            $or: [{ email }, { phoneNumber }],
          });
        
        if (existingUser) {
            return res.status(400).json({
              success: false,
              message: "User with the provided email or phone number already exists. Please sign in to continue.",
            });
          }

        const response = await OTP.find({ phoneNumber }).sort({ createdAt: -1 }).limit(1);

        if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

        

        const user = await User.create({
            fullName,
            phoneNumber,
            email,
            avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`,

        })

        return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
    }
    catch(error){
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});

    }
}


exports.login = async (req,res) =>{
       try{
        const{phoneNumber,otp} = req.body
        
       }
       catch(error){
        console.log(error.message);
		    return res.status(401).json({ success: false, error: error.message });
       }
}