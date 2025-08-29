import express from "express";
import { getDirectoryContents } from "../controllers/directoryController.js";

const router = express.Router();

router.get("/directory", getDirectoryContents);

export default router;
