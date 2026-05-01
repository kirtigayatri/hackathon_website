const Team = require('../models/Team');

// Upload round 2 ZIP and save URL on Team
const uploadRound2Zip = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No zip file uploaded' });

    const team = await Team.findById(req.user.teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    // Only leader can submit (same rule used for payments)
    if (team.leader.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Only the team leader can submit the round 2 zip' });
    }

    // Since uploadMiddleware now uses Cloudinary, req.file.path IS the Cloudinary URL
    team.round2Zip = req.file.path;
    team.round2Status = 'submitted';
    await team.save();

    return res.status(200).json({ message: 'Round 2 zip uploaded successfully', url: req.file.path });
  } catch (error) {
    console.error('uploadRound2Zip error', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadRound2Zip };
