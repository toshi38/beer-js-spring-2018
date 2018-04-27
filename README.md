# The 3 Stages of Docker Debugging

### Foreword
Thanks to everyone that came out to my talk in Reykjavik April 26. It was a ton of fun!   Below you’ll find a PDF version of the slides, as well as all of the demos I used.  Of particular interest will be in the 30-xx folder where you’ll find the debug.sh script where all of the magic happens.

If you’ve randomly stumbled on this repo, and haven’t seen the talk, feel free to ping me about having a talk!

### About the talk

One of the biggest reasons for using Docker is the isolation that it provides.  Unfortunately for many developers working with Docker for the first time, this isolation also changes how they can use the tools they’ve typically used in the past.

With several teams, I’ve observed that they’ve moved through several stages of Docker debugging with varying levels of pain.  To save you this pain we’ll explore each of them with a simple Node.js app.

We’ll look at how people start debugging, and move through the stages until we manage to punch a hole into an isolated container to directly debug a running process.

