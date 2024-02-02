
 import mongoose from "mongoose";
  // Define the TeamMember schema
const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
 
   },
  pic: {
    type:String

 
  },
  role: {
    type: String,
    required:true
    },
});
// Define the Club schema with buffers for clubLogo and team member pic
const clubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,

   },
  clubUsername: {
    type: String,
     unique: true,
     required: true,

  },
  clubEmail: {
    type: String,
     unique: true,
     required: true,

    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  clubTitle: {
    type: String,
    required: true,

   },
  description: {
    type: String,
    required: true,

   },
  clubLogo: {
    
      publicId:{
        type:String,
       }
    ,
    secureUrl:{
      type:String,
     }

    },
    
  teamMembers: [teamMemberSchema],
  password: {
    type: String,
    required: true,

   },
  phoneNumber: {
    type: String,
     match: /^[0-9]{10}$/,
     required: true,

  },
  eventCreated: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventCreation', // Reference to the EventCreation model (adjust based on your actual model)
    }],
    default: [], // Default value is an empty array
  },
  resetCode: {
    code: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
  },
},
{
  timestamps: true,
});

// Create the Club model
const Club = mongoose.model('Club', clubSchema);

// Export both models
export default Club;
