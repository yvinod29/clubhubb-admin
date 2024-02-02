// middleware.js
import jwt from 'jsonwebtoken';
import Club from '../models/adminModel.js';
import { verifyToken } from '../helpers/adminAuthHelper.js';

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
     
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decodedToken = verifyToken(token);
 
     const clubId= decodedToken.userId;
   
      const user = await Club.findById(clubId);
      if(!user){
        return res.status(404).json({message:"user not found"})

      }
       req.user=user
   
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};


