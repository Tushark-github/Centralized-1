const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const producer = require('./models/producer');
const consumer = require('./models/consumer');
const bcrypt = require('bcrypt');


//Database connections
mongoose.connect('mongodb://127.0.0.1:27017/21-06')
  .then(() => {
    console.log("MONGO CONNECTION IS OPEN!!!");
  })
  .catch(err => {
    console.log("OH NO MONGO CONNECTION ERR")
    console.log(err)
  })

//Rendering Stuff
app.set('view engine', 'ejs');
app.set('views', 'views');


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))




// get router 
app.get('/', (req, res) => {
  res.json({
    msg: "Project Home page"
  })
})

app.get('/consumerLogin', (req, res) => {
  res.render('consumerLogin');
})

app.get('/consumerRegister', (req, res) => {
  res.render('consumerRegister');
})

app.get('/producerLogin', (req, res) => {
  res.render('producerLogin');
})

app.get('/producerRegister', (req, res) => {
  res.render('producerRegister');
})



// all are post router
app.post('/producerRegister', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 12)
  const newProducer = producer.create({
    username: req.body.username,
    password: hash,
    mobileNo: req.body.mobileNo,
    location: req.body.location,
    address: req.body.address,
    pin: req.body.pin,
    provider: req.body.provider
  })

  console.log(hash);
  res.json({
    msg: req.body,
    hash
  })
})

app.post('/producerLogin', async (req, res) => {
  const { username, password } = req.body;
  const user = await producer.findOne({ username });
  const hash = user.password
  if (user) {
    const validPassword = await bcrypt.compare(password, hash);
    if (validPassword) {
      console.log("password")
      console.log(hash);
      res.json({ msg: req.body });
    }
    else {
      console.log("username");
      res.json({ msg: "password is incorrect" });
    }
  }
  else {
    res.json({ msg: "username is incorrect" })
  }
})

app.post('/consumerRegister', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 12)
  const newProducer = consumer.create({
    username: req.body.username,
    password: hash,
    mobileNo: req.body.mobileNo,
    location: req.body.location,
    address: req.body.address,
    pin: req.body.pin
  })

  console.log(hash);
  res.json({
    msg: req.body,
    hash
  })
})

app.post('/consumerLogin', async (req, res) => {
  const { username, password } = req.body;
  const user = await consumer.findOne({ username });
  const hash = user.password
  if (user) {
    const validPassword = await bcrypt.compare(password, hash);
    if (validPassword) {
      console.log("password")
      console.log(hash);
      res.json({ msg: req.body });
    }
    else {
      console.log("username");
      res.json({ msg: "password is incorrect" });
    }
  }
  else {
    res.json({ msg: "username is incorrect" })
  }
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})