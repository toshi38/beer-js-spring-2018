import express from 'express';

import uuid from 'uuid/v4';

//SHOW_IN_SLIDE_START_1
let uuidToGuess;
function resetUuid() {
  uuidToGuess = uuid();
  console.log(`uuid to guess: ${uuidToGuess}`);
}
//SHOW_IN_SLIDE_END_1
resetUuid();


let app = express();

app.get('/', (req, res) => {
  res.status(200).send('<h1>Guess a uuid!</h1><br>' +
    'Guess here: /guess/:uuid-to-guess<br>' +
    'Reset Game Here: /reset');
});

app.get('/guess/:uuid', (req, res) => {
  res.status(200).send(
    uuidToGuess === req.params.uuid
      ? '<h1>Correct Guess!</h1>'
      : '<h1>Wrong!</h1>');
});

app.get('/reset', (req, res) => {
  resetUuid();
  res.status(200).send('uuid to guess is now reset!');
});

// Spin the server up on localhost:8080
app.listen(8080, () => console.log('Server running on port 8080'));
