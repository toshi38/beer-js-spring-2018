import express from 'express';
//SHOW_IN_SLIDE_START_1
import uuid from 'uuid/v4';

let uuidToGuess;
function resetUuid() {
  uuidToGuess = uuid();
}

resetUuid();
//SHOW_IN_SLIDE_END_1

let app = express();
//SHOW_IN_SLIDE_START_2
app.get('/', (req, res) => {
  res.status(200).send('<h1>Guess a uuid!</h1><br>' +
    'Guess here: /guess/:uuid-to-guess<br>' +
    'Reset Game Here: /reset');
});
//SHOW_IN_SLIDE_END_2
//SHOW_IN_SLIDE_START_3
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
//SHOW_IN_SLIDE_END_3

// Spin the server up on localhost:8080
app.listen(8080, () => console.log('Server running on port 8080'));
