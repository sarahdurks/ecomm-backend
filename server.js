// Dependencies
const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// App use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// App Listen
app.listen(PORT, () => {
  console.log(`The ecomm app is now listening on port ${PORT}!`);
});
