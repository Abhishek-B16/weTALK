// const express = require('express');

import express from 'express';
import "dotenv/config";
import fs from 'fs';
import path from 'path';



import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express"
import cors from 'cors';


const app = express();
app.use(clerkMiddleware());
const PORT = process.env.PORT || 3000;

const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(cors({
  origin: FRONTEND_URL , credentials: true
}));
app.use(express.json());



const publicDir= path.join(process.cwd(), "public");



app.get('/health', async (req, res) => {
  res.status(200).json({ok:true});
});

// if the public directory exists, serve the static files
// this is for the production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}



app.listen(PORT, "0.0.0.0", () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);

  if(process.env.NODE_ENV === "production") job.start(); // start the cron job only in production
});