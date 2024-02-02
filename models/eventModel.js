 import mongoose from "mongoose";
 import studentFormSchema from "./studentFormModel.js";
const eventSchema = new mongoose.Schema({
  clubId: {
    type: String, 
    // Assuming user ID is stored as ObjectId
    },
    clubName: {
      type: String, 
      // Assuming user ID is stored as ObjectId
      },
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  timings: {
    startTime: {
      type: Date,
     },
    endTime: {
      type: Date,
     }
  }
  ,
  chiefGuests: {
    type: [String], // Assuming an array of strings for chief guests' names
  },
  amount: {
    type: Number, // Assuming an array of strings for speaker names
  },
  status:{
    type:Boolean,
    default:false

  },
  eventPoster: {
    publicId: {
        type: String,
        required: true,
    },
    secureUrl: {
        type: String,
        required: true,
    }
  },
  requiredInfoOfStudent: {
    type: [String],
    default: ['name', 'email'], // Set default array with 'name' and 'email'
  },
  
    minSize :{
      type:Number,
      required:true
    },
    maxSize:{
      type:Number,
      required:true

    

  },

 registeredUserIds: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming user ID is stored as ObjectId
        ref: 'User', // Reference to the User model (adjust based on your actual User model)
       },
              studentFormData: studentFormSchema,

       qrCode: {
        type: String, // Assuming QR code is stored as a string
       },
       checkIn:{
        type:Boolean,
        default:false

       },
    },
  ],
},
{
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
