const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

//middleware = something that runs for each request. if someone makes a request to the server, we want to run some code in response. the code is already built in = express.static()


app.use(express.static(publicPath));

//when someone makes a get request that is not in the public folder, we send the index.html
app.get('*', (req, res) => { // setup a function when soemone makes a get request to our server. * is the path to all unmatched routes. public folder and all others. request object, response object, from express.
  res.sendFile(path.join(publicPath, 'index.html')); //send response as index.html.
});

app.listen(port, () => {
  console.log('Server is up!');
});



//HEROKU NOTES

// we are going to push to heroku and heroku will update the repository on git and deploy it.
