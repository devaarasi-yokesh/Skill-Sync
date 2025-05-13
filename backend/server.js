
import { auth } from 'express-oauth2-jwt-bearer';
import JwksRsa from 'jwks-rsa';
import express from 'express'
import { connectDB } from "./config/db.js";
import cors from 'cors'
import dotenv from 'dotenv'
import resourceRoutes from './routes/goal.route.js'
import path from 'path'

const app = express();
dotenv.config();

const __dirname = path.resolve();

const audience = process.env.AUDIENCE;
const baseurl = process.env.BASEURL;
const clientID = process.env.CLIENTID;
app.use(express.json());
app.use(cors())

app.use('/api/res',resourceRoutes);

console.log(audience,baseurl)

const jwtCheck = auth({
  
  audience: audience,
  clientID:clientID,
  issuerBaseURL: baseurl,
  tokenSigningAlg: 'RS256'
});

app.use(jwtCheck);

app.get('/protected',jwtCheck,(req,res) =>{
  res.json({message:'You came to the private route!',user:req.auth})
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


app.listen(3000, ()=> {
    connectDB();
    console.log('Server run at http://localhost:3000')
})