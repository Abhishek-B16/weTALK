// const express = require('express');

import express from 'express';
import "dotenv/config";
import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express"
import cors from 'cors';


const app = express();
app.use(clerkMiddleware);
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT;

app.get('/', async (req, res) => {
  res.status(200).json({ok:true});
});




app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000');
});