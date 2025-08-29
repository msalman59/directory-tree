import express from "express";
import dotenv from "dotenv";
import corsMiddleware from "./middleware/cors.js";
import directoryRoutes from "./routes/directoryRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS for React frontend
app.use(corsMiddleware);

app.use("/api", directoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Directory Tree API Server running on port ${process.env.PORT}`);
});
