const State = require('../models/State');

// @desc    Get the current hackathon state
// @route   GET /api/state
const getHackathonState = async (req, res) => {
  try {
    const state = await State.get();
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Admin: Update Round 1 status (Start/End)
// @route   POST /api/state/round1
const updateRound1State = async (req, res) => {
  try {
    const { status, deadline } = req.body;
    const state = await State.get();
    
    if (status) {
      // If resetting the round back to Pending, wipe everything for a clean slate
      if (status === 'Pending' && state.round1Status !== 'Pending') {
        const Submission = require('../models/Submission');
        const Team = require('../models/Team');
        const Question = require('../models/Question');
        await Submission.deleteMany({ round: 1 });
        await Question.deleteMany({ round: 1 }); // Or just .deleteMany({}) if there are no round 2 questions
        await Team.updateMany({}, { 
          round1Status: 'not_started',
          round1TestStartedAt: null,
          round1TestFinished: false,
          round1Score: 0,
          round1FinalScore: 0,
          round1AvgSubmissionTime: 0,
          round1Submission: {}
        });
      }
      state.round1Status = status;
    }
    
    if (deadline) {
      state.round1Deadline = deadline;
    } else if (status === 'Active') {
      const oneWeek = new Date();
      oneWeek.setDate(oneWeek.getDate() + 7);
      state.round1Deadline = oneWeek;
    }
    await state.save();
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Admin: Update Round 2 status (Start/End)
// @route   POST /api/state/round2
const updateRound2State = async (req, res) => {
  try {
    const { status, deadline } = req.body;
    const state = await State.get();
    
    if (status) {
      // Validations before starting Round 2
      if (status === 'Active' && state.round2Status !== 'Active') {
        if (state.round1Status !== 'Completed') {
          return res.status(400).json({ message: 'Cannot start Round 2 until Round 1 is Completed.' });
        }
        
        const Question = require('../models/Question');
        const problemExists = await Question.findOne({ round: 2 });
        if (!problemExists) {
          return res.status(400).json({ message: 'Cannot start Round 2 without uploading a problem statement first.' });
        }
      }

      // If resetting the round back to Pending, wipe everything for a clean slate
      if (status === 'Pending' && state.round2Status !== 'Pending') {
        const Submission = require('../models/Submission');
        const Team = require('../models/Team');
        const Question = require('../models/Question');
        await Submission.deleteMany({ round: 2 });
        await Question.deleteMany({ round: 2 });
        await Team.updateMany({}, { round2Status: 'not_started', isFinalist: false });
      }
      state.round2Status = status;
    }

    if (deadline) {
      state.round2Deadline = deadline;
    } else if (status === 'Active') {
      const twoWeeks = new Date();
      twoWeeks.setDate(twoWeeks.getDate() + 14);
      state.round2Deadline = twoWeeks;
    }
    await state.save();
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Admin: Upload a certificate template
// @route   POST /api/state/certificate/:round
const uploadCertificate = async (req, res) => {
  try {
    const { round } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const state = await State.get();
    
    if (round === '1') {
      state.round1CertificatePath = req.file.path;
    } else if (round === '2') {
      state.round2CertificatePath = req.file.path;
    } else {
      return res.status(400).json({ message: 'Invalid round specified' });
    }
    
    await state.save();
    res.json({ message: 'Certificate uploaded successfully', state });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  getHackathonState, 
  updateRound1State, 
  updateRound2State,
  uploadCertificate
};