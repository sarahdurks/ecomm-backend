// Dependencies
const router = require('express').Router();
const apiRoutes = require('./api');

// Use
router.use('/api', apiRoutes);
router.use((req, res) => {
  res.send("<p>This route didn't work.</p>")
});

module.exports = router;