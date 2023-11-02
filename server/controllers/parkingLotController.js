import asyncHandler from "express-async-handler";

import dbConnection from "../config/dbConnect.js";

// @desc Get status of all parking lots
// @route GET /parking-lot

const getAllParkingLots = asyncHandler(async (request, response) => {
    const parkingLots = await dbConnection.promise().query(`SELECT * FROM ParkingLot`),
        total = parkingLots[0].length,
        occupied = parkingLots[0].filter(parkingLot => parkingLot.isOccupied === 1).length;

    response.status(200).json({
        success: true,
        data: {
            count: total,
            occupied,
            notOccupied: total - occupied,
            parkingLots: parkingLots[0].map(parkingLot => ({
                ...parkingLot,
                isOccupied: parkingLot.isOccupied === 1
            }))
        }
    });
});

// @desc Update status of parking lot
// @route PATCH /parking-lot

const updateParkingLot = asyncHandler(async (request, response) => {
    const { parkingLotId, isOccupied } = request.body;

    // Confirm data.

    if (!parkingLotId || isOccupied === undefined || typeof isOccupied !== "boolean") {
        return response.status(400).json({
            success: false,
            error: {
                code: 400,
                message: "Invalid data."
            }
        });
    }

    // Parking lot validation.

    const parkingLot = await dbConnection.promise().query(`SELECT * FROM ParkingLot WHERE parkingLotId = "${parkingLotId}"`);

    if (parkingLot[0].length === 0) {
        return response.status(404).json({
            success: false,
            error: {
                code: 404,
                message: "Parking lot not found."
            }
        });
    }

    // Update status 
    
    await dbConnection.promise().query(`UPDATE ParkingLot SET isOccupied = ${isOccupied} WHERE parkingLotId = "${parkingLotId}"`);

    response.status(200).json({
        status: true,
        message: "Parking lot status updated successfully."
    });
});

export { getAllParkingLots, updateParkingLot };