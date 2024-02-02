import Club  from '../models/adminModel.js';
import Event from '../models/eventModel.js'
import cloudinary from 'cloudinary';
// Controller to get information about the club
export const getClubInfo = async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateClubDetails = async (req, res) => {
    try {
      const updatedClub = await Club.findByIdAndUpdate(req.params.clubId, req.body, { new: true });
      res.status(200).json(updatedClub);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Controller to add a new member to the club
export const addNewMember = async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    const newMember = req.fields;
    const profilePic=req.files;
    if(profilePic){
        const picUploadResult = await cloudinary.uploader.upload(req.files.profilePic.path, {
            folder: 'team-members', // Set the folder in Cloudinary where you want to store event posters
            // Add other Cloudinary upload options as needed
          });
          newMember.pic=picUploadResult.secure_url;
    }
     club.teamMembers.push(newMember);
    await club.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClubLogo = async (req, res) => {
    try {
      // Find the club by ID
      let club = await Club.findById(req.params.clubId);
      if (!club) {
        return res.status(404).json({ error: "Club not found" });
      }
      // Check if there is an existing logo to delete
      if (club.clubLogo.publicId) {
        // If there is an existing publicId, delete the old image from Cloudinary
        await cloudinary.uploader.destroy(club.clubLogo.publicId);
      }
      // Upload the new club logo to Cloudinary
      const clubLogoUploadResult = await cloudinary.uploader.upload(
        req.files.newClubLogo.path,
        {
          folder: "club-logo", // Set the folder in Cloudinary where you want to store event posters
          // Add other Cloudinary upload options as needed
        }
      );
  
      // Update the club logo information in the database
      club.clubLogo.publicId = clubLogoUploadResult.public_id;
      club.clubLogo.secureUrl = clubLogoUploadResult.secure_url;
  
      // Save the updated club to the database
      await club.save();
  
      res.status(200).json({ message: "Club logo updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Controller to update member details in the club
export const updateMemberDetails = async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    const member = club.teamMembers.id(req.params.memberId);
    
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
   const updateTeamMember=req.fields;
   const pic=req.files.pic;
   if(pic){
    const picUploadResult = await cloudinary.uploader.upload(req.files.pic.path, {
        folder: 'team-members', 
      });
      updateTeamMember.pic=picUploadResult.secure_url;
   }

    member.set(updateTeamMember);
    await club.save();

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
    try {
      const club = await Club.findById(req.params.clubId);
  
      // Use Mongoose array filtering to remove the subdocument
      club.teamMembers = club.teamMembers.filter(member => member._id.toString() !== req.params.memberId);
  
      // Save the parent document
      await club.save();
  
      res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const getEventList=async(req,res)=>{
    try {
      const clubId=req.user._id;
      const club = await Club.findById(clubId);
      if (!club) {
        return res.status(404).json({ error: 'Club not found' });
      }
  
      // Assuming 'eventCreated' is an array of ObjectId values
      const eventIds = club.eventCreated;
  
      // Retrieve events based on the array of eventIds
      // Replace 'Event' with the actual model for your events
      const events = await Event.find({ _id: { $in: eventIds } });
       res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 
   

