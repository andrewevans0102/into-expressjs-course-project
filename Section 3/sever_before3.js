const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;
// create a ref to the router here
const router = express.Router();

// for a fun API to get more characters
// https://swapi.co/
let characters = [
  {
    name: 'Luke Skywalker',
    height: 172,
    homeworld: 'Tattooine',
    species: 'Human',
    index: 0
  },
  {
    name: 'C-3P0',
    height: 167,
    homeworld: 'Tattooine',
    species: 'Droid',
    index: 1
  },
  {
    name: 'R2-D2',
    height: 96,
    homeworld: 'Naboo',
    species: 'Droid',
    index: 2
  },
  {
    name: 'Darth Vader',
    height: 202,
    homeworld: 'Tattooine',
    species: 'Human',
    index: 3
  }
];

router
  .route('/characters')
  .get((req, res, next) => {
    res.send(JSON.stringify(characters));
  })
  .put((req, res, next) => {
    const original = req.body.original;
    const update = req.body.update;
    let found = false;

    // replace the character to be updated
    for (let i = 0; i < characters.length; i++) {
      if (original.index === characters[i].index) {
        characters[i] = update;
        found = true;
        break;
      }
    }

    if (found) {
      res.send('PUT success');
    } else {
      // if not found then just append to the end
      res.send('PUT fail');
    }
  })
  .post((req, res, next) => {
    let character = req.body.character;
    const index = characters.length;
    // length is 1 more than the count since we start at 0
    character.index = index;
    characters.push(character);

    res.send('POST success');
  });

router.route('/characters/:index').delete((req, res, next) => {
  const index = parseInt(req.params.index);
  let found = false;
  for (let i = 0; i < characters.length; i++) {
    if (characters[i].index === index) {
      characters.splice(index, 1);
      found = true;
      break;
    }
  }

  if (found) {
    res.send('DELETE success');
  } else {
    res.send('DELETE unsuccessful, value was not found');
  }
});

// signal to the appliation to use the router definition above
app.use('/api', router);

// starts the server listening to port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
