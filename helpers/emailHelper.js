// emailHelper.js
import nodemailer from 'nodemailer';

const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'vinuureddy555@gmail.com', // Replace with your email
    pass: 'pwiz rvxa sots bcyy', // Replace with your email password
  },
};

const transporter = nodemailer.createTransport(emailConfig);

export const sendPasswordResetCodeEmail = async (email, resetCode) => {
  try {
    const mailOptions = {
      from: 'vinuureddy555@gmail.com', // Replace with your email
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${resetCode}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};