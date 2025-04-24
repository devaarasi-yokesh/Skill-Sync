
import { auth } from 'express-oauth2-jwt-bearer';
import express from 'express'
import { connectDB } from "./config/db.js";
import cors from 'cors'
import dotenv from 'dotenv'
import resourceRoutes from './routes/resource.route.js'
import path from 'path'

const app = express();
dotenv.config();

const __dirname = path.resolve();

const audience = process.env.AUDIENCE;
const baseurl = process.env.BASEURL;

app.use(express.json());
app.use(cors())

app.use('/api/res',resourceRoutes);

console.log(audience)
const jwtCheck = auth({
  audience: audience,
  issuerBaseURL: baseurl,
  tokenSigningAlg: 'RS256'
});

app.use('/protected',jwtCheck);

app.get('/protected', function (req, res) {
  res.send('Secured Resource');
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