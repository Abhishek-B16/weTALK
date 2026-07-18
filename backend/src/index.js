// const express = require('express');

import express from 'express';
import "dotenv/config";
import fs from 'fs';
import path from 'path';
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { app, server } from "./lib/socket.js";

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express"
import cors from 'cors';





// it's important that you don't parse the webhook event data, it should be in the raw format
app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhook);



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

app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes);

// if the public directory exists, serve the static files
// this is for the production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/*", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}



server.listen(PORT, "0.0.0.0", () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);

  if(process.env.NODE_ENV === "production") {
    job.start();
   } // start the cron job only in production
});