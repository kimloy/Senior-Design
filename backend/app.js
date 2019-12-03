const express = require ("express");
const Pusher = require('pusher');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const Map = require('./models/map');


mongoose.connect('mongodb+srv://kimloy:nccBQM01yxyxThuS@senior-design-rmyr5.mongodb.net/ParkingLots?retryWrites=true&w=majority',{ useNewUrlParser: true })
.then(()=>{
    console.log('Connected to database');
  })
  .catch(()=>{
    console.log('Connection failed')
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pusher = new Pusher({
  appId: '887348',
  key: '8f3ccf2cbbc3a6526876',
  secret: 'cfed76b6c5b8e4ed15ba',
  cluster: 'us2',
  encrypted: true
});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();                                           // This error popped up due to the fact that the server and client are operating on different domains.
});


app.get("/api/maps", (req, res, next) => {
  Map.find().then(documents => {
    res.status(200).json({
      message: "spots fetched successfully!",
      maps: documents
    });
  });
});


  Map.watch({ fullDocument: 'updateLookup' }).
  on('change', (change) => {
    console.log(change);
    const spot = change.fullDocument;
    pusher.trigger(
      'my-channel',
      'update',
      {
        id: spot._id,
        spotId: spot.spotId,
        status: spot.status
      }
    )
  });


module.exports = app;


