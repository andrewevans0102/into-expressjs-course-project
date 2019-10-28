const express = require('express');
const app = express();
const port = 3000;

// GET endpoint with no path
app.get('/', (req, res, next) => res.send('Hello World!'));

// starts the server listening to port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
