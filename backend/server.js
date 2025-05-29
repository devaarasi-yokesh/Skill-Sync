
import { auth } from 'express-oauth2-jwt-bearer';
import JwksRsa from 'jwks-rsa';
import express from 'express'
import { connectDB } from "./config/db.js";
import cors from 'cors'
import dotenv from 'dotenv'
import resourceRoutes from './routes/goal.route.js'
import path from 'path'
import ddTrace from 'dd-trace'
import winston from 'winston';
import Profile from '../backend/model/profile.model.js'

const app = express();
dotenv.config();

const __dirname = path.resolve();

const audience = process.env.AUDIENCE;
const baseurl = process.env.BASEURL;
const clientID = process.env.CLIENTID;
const datadog_Api_key = process.env.DATADOG_API_KEY;
app.use(express.json());
app.use(cors())

app.use('/api/res',resourceRoutes);



const jwtCheck = auth({
  
  audience: audience,
  issuerBaseURL: baseurl,
  tokenSigningAlg: 'RS256'
});



app.get('/protected',jwtCheck,async(req,res) =>{

  const userId = req.auth.payload.sub; //Creating Auth0 userID
  const userProfile = await Profile.findOne({userId});
  res.json(userProfile);
});

// Store the user auth details when they sign-up
app.post('/create-profile', jwtCheck, async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    const existing = await Profile.findOne({ userId });
    if (existing) return res.json(existing);

    const newProfile = new Profile({
      userId,
      name: req.body.name || req.auth.payload.name,
      email: req.body.email || req.auth.payload.email
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});


app.get('/api/orgs', async (req, res) => {
  const response = await fetch('https://api.coursera.org/api/courses.v1?q=search&query=react&limit=7');
  const data = await response.json();
  res.json(data);
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "frontend","dist")));

  app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

//datadog initialization
ddTrace.init({
  service: 'my-mern-app',
  env:'production'
})

//Creating custom transport for Datadog HTTP intake
const datadogTransport = new winston.transports.Http({
  host:'http-intake.logs.datadoghq.com',
  path:`/v1/input/${datadog_Api_key}`,
  ssl: true,
  port: 443,
  headers: {
    'DD-API-KEY': datadog_Api_key,
    'Content-Type': 'application/json'
  },
});

//logging info to datalog logger via http port and no agent
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'my-mern-app'},
  transports: [
    datadogTransport,
    new winston.transports.Console(),
  ],
});

//Example log - Sentry
logger.info('App started successfully');
logger.error('Something went wrong')

app.use(cors({ origin: 'https://skill-sync-2bln.onrender.com/'}))

app.listen(3000, ()=> {
    connectDB();
    console.log('Server run at http://localhost:3000')
})

