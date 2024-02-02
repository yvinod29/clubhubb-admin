import express from 'express';
import formidable from 'express-formidable';
import {
  getClubInfo,
  updateClubDetails,
  addNewMember,
  updateMemberDetails,
  deleteTeamMember,
  updateClubLogo,
  getEventList,
} from '../controllers/clubController.js';

const router = express.Router();

// Routes for club operations
 router.get('/club-events',getEventList);
router.put('/:clubId', updateClubDetails);
router.put('/update-logo/:clubId',formidable(), updateClubLogo)
router.post('/:clubId/members', formidable(),addNewMember);
router.put('/:clubId/members/:memberId', formidable(),updateMemberDetails);
router.delete('/:clubId/members/:memberId',deleteTeamMember)


export default router;
