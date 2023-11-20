import cors from 'cors'
import express from 'express'

require('dotenv').config();
import initRoutes from './api/routes/index.js'
require('./connection_db.js')

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const PORT = process.env.PORT || 7777

const listener = app.listen(PORT, () => {
  console.log("Server listening on port " + listener.address().port);
})
