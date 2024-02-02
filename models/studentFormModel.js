import mongoose from "mongoose";

const studentFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  rollNumber: {
    type: String,
   },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  acadamicYear: {
    type: String,
   },
   extraFields: {
    type: Map,
    of: String,
    default: {}, // Default value is an empty object
  },
});
export default  studentFormSchema;