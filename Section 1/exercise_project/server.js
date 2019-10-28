const express = require('express');
const app = express();
const port = 3000;

// GET endpoint with no path
app.get('/', (req, res, next) => {
  const name = req.query.name;
  res.send(`Hello ${name}!`);
});

// starts the server listening to port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
