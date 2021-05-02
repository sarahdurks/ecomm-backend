// Dependencies
const router = require('express').Router();
const apiRoutes = require('./api');// double check

// Use
router.use('/api', apiRoutes);
router.use((req, res) => {
  res.send("This route didn't work")
});

module.exports = router;