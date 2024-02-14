const mongoose = require('mongoose');
const twilioConfig = require('../config/twilio');


const OTPSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// Define a pre-save hook to send OTP to the provided phone number before the document is saved
OTPSchema.pre('save', async function (next) {
  console.log('Pre-save hook triggered');

  // Check if the document is new (isNew returns true for new documents)
  if (this.isNew) {
    try {
      // Send OTP via Twilio SMS to the provided phone number
      await twilioConfig.sendOTP(this.phoneNumber, this.otp);
      console.log('OTP sent via Twilio to', this.phoneNumber);
    } catch (error) {
      console.error('Error sending OTP via Twilio:', error);
      throw error;
    }
  }

  // Continue the save process
  next();
});

const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;
