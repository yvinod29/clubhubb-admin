// tokenHelper.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const generateToken = (userId) => {
    try {
      return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    } catch (error) {
      throw new Error('Error generating token');
    }
  };

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// authHelper.js

 
export const hashPassword = async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error('Error hashing password');
    }
  };

  export const comparePasswords = async (password, hashedPassword) => {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  };

 