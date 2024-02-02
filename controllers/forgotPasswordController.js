import adminModel from '../models/adminModel.js';
import { sendPasswordResetCodeEmail } from '../helpers/emailHelper.js';

const generateResetCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
export const forgotPasswordController = async (req, res) => {
  try {
    const { clubEmail } = req.body;
    console.log(req.body)

    if (!clubEmail) {
      res.status(400).send({ message: "clubEmail is required" });
    }
    const admin = await adminModel.findOne({ clubEmail });

    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Generate a reset code, store it in the user document, and set an expiration time (e.g., 1 hour)
    const resetCode = generateResetCode();
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
    admin.resetCode = { code: resetCode, expiresAt: expirationTime };
    await admin.save();

    // Send the reset code to the user's email
    const emailSent = await sendPasswordResetCodeEmail(admin.clubEmail, resetCode);

    if (!emailSent) {
      return res.status(500).send({
        success: false,
        message: "Failed to send reset code email",
      });
    }

    res.status(200).send({
      success: true,
      message: "Reset code sent to your email. Use the code to reset your password.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
