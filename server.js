// Dependenciesno
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// App use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Sync sequelize and start server
sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => 
  console.log(`Listening on port ${PORT}`));
});
