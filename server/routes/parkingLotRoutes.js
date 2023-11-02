import express from "express";

import { getAllParkingLots, updateParkingLot } from "../controllers/parkingLotController.js";

const router = express.Router();

router.get("/", getAllParkingLots);
router.patch("/", updateParkingLot);

export default router;