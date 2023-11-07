import asyncHandler from "express-async-handler";

import dbPool from "../config/dbConnect.js";

// @desc Get status of all parking lots
// @route GET /parking-lot

const getAllParkingLots = asyncHandler(async (request, response) => {
    const connection = await dbPool.getConnection(),
        parkingLots = await connection.query(`SELECT * FROM ParkingLot`),
        total = parkingLots[0].length,
        occupied = parkingLots[0].filter(parkingLot => parkingLot.isOccupied === 1).length;

    connection.release();

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

    const connection = await dbPool.getConnection(),
        parkingLot = await connection.query(`SELECT * FROM ParkingLot WHERE parkingLotId = "${parkingLotId}"`);

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
    
    await connection.query(`UPDATE ParkingLot SET isOccupied = ${isOccupied} WHERE parkingLotId = "${parkingLotId}"`);

    connection.release();
    
    response.status(200).json({
        status: true,
        message: "Parking lot status updated successfully."
    });
});

export { getAllParkingLots, updateParkingLot };