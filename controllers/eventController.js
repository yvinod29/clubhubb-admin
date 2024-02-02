// eventController.js
import cloudinary from "cloudinary";
import Event from "../models/eventModel.js";
import Club from "../models/adminModel.js";

export const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      title,
      startDate,
      endDate,
      chiefGuests,
      amount,
      status,
      minSize,
      maxSize
    } = req.fields;

    const minSizeNumber = parseInt(minSize, 10);
    const maxSizeNumber = parseInt(maxSize, 10);
    // Validate required fields
    const clubId = req.user._id;
    const clubName=req.user.clubName;
    // Replace this with the actual way you get the club ID from the authenticated user
    console.log(clubId);
    console.log(clubName);
    if (!eventName || !eventDescription || !title) {
      return res
        .status(400)
        .json({ error: "Required fields are missing in the request body" });
    }
    if (minSizeNumber <0 && maxSizeNumber>10){
      return res
        .status(400)
        .json({ error: "Min size and max size should be from range 1-7" });
    
    }

    // Upload event poster to Cloudinary
    const posterUploadResult = await cloudinary.uploader.upload(
      req.files.eventPoster.path,
      {
        folder: "event-posters", // Set the folder in Cloudinary where you want to store event posters
        // Add other Cloudinary upload options as needed
      }
    );
    const publicId = posterUploadResult.public_id;
    const secureUrl = posterUploadResult.secure_url;
    const eventPoster = {
      publicId: publicId,
      secureUrl: secureUrl,
    };
    const timings = {
      startTime: startDate,
      endTime: endDate,
    };
   
    // Create event data based on the schema
    const parsedAmount = parseFloat(amount);

if (isNaN(parsedAmount)) {
  // If amount is not a valid number, return a 400 Bad Request response
  return res.status(400).json({ error: 'Invalid amount. Please provide a valid number.' });
}

    const eventData = new Event({
      clubId,
      clubName,
      eventName,
      eventDescription,
      title,
      timings,
      chiefGuests: chiefGuests || [], // Ensure chiefGuests is an array, default to an empty array if not provided
      amount: amount ? parseFloat(amount) : 0, // Ensure amount is an array, default to an empty array if not provided
      status: status !== undefined ? status : false, // Use provided status or default to true if not provided
      eventPoster,
      minSize:minSizeNumber,
      maxSize:maxSizeNumber
    });
    // Save event with the cnstructed data
    const event = await eventData.save();
    const eventId = event._id;
    // Update the Club's eventCreated field with the new event ID
    await Club.findByIdAndUpdate(
      clubId,
      { $push: { eventCreated: eventId } }, // Push the new event ID to the eventCreated array
      { new: true } // Return the updated document
    );

    res.status(201).send({
      success: true,
      message: "Event Created Successfully",
      event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getEventIds = async (req, res) => {
  try {
    const clubId = req.clubId;
    console.log(clubId);
    const ClubInfo = await Club.findById(clubId).select("eventCreated");
    console.log(ClubInfo);
    res.status(200).json(ClubInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRegistrationform = async (req, res) => {
  try {
    const { eventId } = req.params; // Assuming eventId is in the request parameters
    const data = req.body;
    const additionalQuestions = data.additionalQuestions;

    // Ensure 'name' and 'email' are in the additionalQuestions array
    const updatedAdditionalQuestions = [...new Set(['name', 'email', ...additionalQuestions])];

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: { requiredInfoOfStudent: updatedAdditionalQuestions } },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const publicId = event.eventPoster && event.eventPoster.publicId;

    const clubId = req.clubId; // Assuming the event has a 'club' field with the club ID
    console.log(clubId);
    await Club.findByIdAndUpdate(
      clubId,
      { $pull: { eventCreated: eventId } }, // Remove eventId from the 'events' array
      { new: true }
    );
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const file = req.files.eventPoster;
    const eventData = req.fields;
    const { startDate, endDate , minSize , maxSize} = req.fields;
    const timings = {
      startTime: startDate,
      endTime: endDate,
    };
    eventData.timings = timings;

    eventData.minSize=minSize;
      eventData.maxSize=maxSize;
    

    const existingEvent = await Event.findById(eventId);

    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    const parsedAmount = parseFloat(eventData.amount);

      if (isNaN(parsedAmount)) {
  // If amount is not a valid number, return a 400 Bad Request response
        return res.status(400).json({ error: 'Invalid amount. Please provide a valid number.' });
      }


    if (file) {
      console.log("file is updated");
      const publicId = existingEvent.eventPoster.publicId;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
      const posterUploadResult = await cloudinary.uploader.upload(
        req.files.eventPoster.path,
        {
          folder: "event-posters", // Set the folder in Cloudinary where you want to store event posters
          // Add other Cloudinary upload options as needed
        }
      );

      // Update the event's poster information in the database
      eventData.eventPoster = {
        publicId: posterUploadResult.public_id,
        secureUrl: posterUploadResult.secure_url,
      };
    }
   

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: eventData }, // Use $set to update specific fields
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const UpdateCheckin = async (req, res) => {
  try {
    const { userId, eventId } = req.params;
    const check=req.body.check
    console.log(eventId,userId)

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const userIndex = event.registeredUserIds.findIndex(user => user.userId.toString() === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found in event' });
    }

    // Set the checkIn status to true for the user
    event.registeredUserIds[userIndex].checkIn = true;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: { [`registeredUserIds.${userIndex}.checkIn`]: check} },
      { new: true } // Return the updated document
    );

    return res.status(200).json({ message: 'Checkin status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const UpdateStatus = async (req, res) => {
  try {
      const { status } = req.body; // Assuming 'body' is a typo, and it should be 'req.body'
      const eventId = req.params.eventId;
      console.log("status")
      console.log(status)

      const existingEvent = await Event.findByIdAndUpdate(
          eventId,
          { $set: { status: status } }, // Use $set to update specific fields
          { new: true }
      );

      if (!existingEvent) {
          return res.status(404).json({ error: "Event not found" });
      }

      res.status(200).json(existingEvent);
  } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


