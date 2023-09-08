// pages/api/auth.js
import { authMiddleware } from "@clerk/nextjs";

const middleware = authMiddleware({});

export default async function handler(req, res) {
  await middleware(req, res);

  // Your protected route logic here
  if (req.method === "GET") {
    // Handle GET request
    res.status(200).json({ message: "Authenticated GET request" });
  } else if (req.method === "POST") {
    // Handle POST request
    res.status(200).json({ message: "Authenticated POST request" });
  } else {
    // Handle other HTTP methods
    res.status(405).end(); // Method Not Allowed
  }
}
