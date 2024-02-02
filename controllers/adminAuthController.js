// authController.js
import jwt from "jsonwebtoken";
import Club from "../models/adminModel.js";
import { hashPassword, comparePasswords } from "../helpers/adminAuthHelper.js";
import { generateToken } from "../helpers/adminAuthHelper.js";
import cloudinary from "cloudinary";
// Set up multer for handling file uploads

export const registerAdmin = async (req, res) => {
  try {
    const {
      clubName,
      clubUsername,
      clubEmail,
      clubTitle,
      description,
      password,
      phoneNumber,
      teamMembers,
    } = req.fields;
    console.log(req.fields)

    // Check conditions for each field
    if (!clubName) {
      return res.status(400).json({ error: "Club name is required" });
    }

    if (!clubUsername) {
      return res.status(400).json({ error: "Club username is required" });
    }

    if (!clubEmail) {
      return res.status(400).json({ error: "Club email is required" });
    }

    if (!clubTitle) {
      return res.status(400).json({ error: "Club title is required" });
    }

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Add conditions for teamMembers if needed
{/*
if (!req.files.clubLogo) {
  return res.status(400).json({ error: "Club logo URL is required" });
}
*/}

    // Check if the club email is already registered
    const existingClub = await Club.findOne({ clubEmail });
    if (existingClub) {
      return res
        .status(400)
        .send({ message: "Club with this email already exists" ,success:false});
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    if (req.files.clubLogo){

    //  let clubLogoUploadResult;
    const clubLogoUploadResult = await cloudinary.uploader.upload(
      req.files.clubLogo.path,
      {
        folder: "club-logo", // Set the folder in Cloudinary where you want to store event posters
        // Add other Cloudinary upload options as needed
      }
    );
    const publicId=clubLogoUploadResult.public_id;
    const secureUrl =clubLogoUploadResult.secure_url;
    
     const clubLogo={
      secureUrl:secureUrl,
      publicId:publicId
     }
    }
    // Create a new Club
    const newClub = new Club({
      clubName,
      clubUsername,
      clubEmail,
      clubTitle,
      description,
      password: hashedPassword,
      phoneNumber,
      teamMembers,
      });

    // Save the club to the database
    await newClub.save();
 
    // Send success response with token
    res.status(201).send({ clubId: newClub._id,success:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error",success:false });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { clubEmail, password } = req.body;

    // Find the club by email
    const club = await Club.findOne({ clubEmail });

    // Check if the club exists
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    // Check if the password is valid
    const passwordMatch = await comparePasswords(password, club.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(club._id);

    // Send success response with token
    res.status(200)
    .json({ token, clubId: club._id ,success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
