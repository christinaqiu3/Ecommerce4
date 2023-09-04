// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'micro-cors';

//export default function handler(req, res) {
//  res.status(200).json({ name: 'John Doe' })
//}

// Initialize CORS
const cors = Cors({
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add the HTTP methods you want to allow
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend app
  credentials: true, // If you need to include cookies in your requests, set this to true
});

async function handler(req, res) {
  // Your API route logic goes here
  
  res.status(200).json({ message: 'This route has CORS enabled.' });
}

export default cors(handler);

