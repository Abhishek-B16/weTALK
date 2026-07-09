// const express = require('express');

import express from 'express';
import "dotenv/config";
const app = express();

console.log(process.env.MONGO_URI);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});