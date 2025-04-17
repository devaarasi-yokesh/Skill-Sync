import pkg from "express-openid-connect";
import express from 'express'
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv'
import resourceRoutes from './routes/resource.route.js'

const app = express();
const { auth, requiresAuth } = pkg;
dotenv.config();

const config = { 
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'PhHyluJoI99epnscIUI1bTguVMCP2eJl',
    issuerBaseURL: 'https://dev-twhhjyo4gr0nr6br.us.auth0.com'
};

app.use(auth(config));

app.use(express.json());

// app.get('/', (req, res)=> {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });


app.use('/api/res',resourceRoutes);

const artciles = await fetch('https://dev.to/api/articles',{
  headers:{
    "User-Agent":"MyDemoApp"
  }
});
// console.log(await artciles.json())

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});







app.listen(3000, ()=> {
    connectDB();
    console.log('Server run at http://localhost:3000')
})