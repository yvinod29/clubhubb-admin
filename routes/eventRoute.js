/*
post event 
get event list 
delete event
update event
form fields 
*/

// eventRoutes.js
import formidable from 'express-formidable'

import express from 'express';
import {
  UpdateCheckin,
  UpdateStatus,
  createEvent,
  deleteEvent,
  getEventById,
  getEventIds,
  updateEvent,
  updateRegistrationform,
} from '../controllers/eventController.js';
 
const router = express.Router();

// Routes
router.post('/create-event',formidable(),createEvent);
router.get('/events', getEventIds);
router.get('/:eventId', getEventById); // New route for fetching a single event
router.delete('/:eventId', deleteEvent);
router.put('/:eventId', formidable(),updateEvent);
router.put("/:eventId/status", UpdateStatus);
router.put('/:eventId/registrationform', updateRegistrationform);

router.put('/:eventId/:userId',UpdateCheckin)
 export default router;
