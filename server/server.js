import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import dbPool from "./config/dbConnect.js";

import errorHandler from "./middlewares/errorHandler.js";

import parkingLotRoutes from "./routes/parkingLotRoutes.js";

dotenv.config();

const app = express(),
    port = process.env.PORT || 5000,
    server = http.createServer(app),
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/parking-lot", parkingLotRoutes);

app.all("*", (request, response) => {
    response.status(404).json({
        success: false,
        error: {
            code: 404,
            message: "Resource you have requested doesn't exist."
        }
    });
});

app.use(errorHandler);

dbPool.getConnection((error, connection) => {
    if (error)
        console.log("Failed to connect with MySQL database.");
    else {
        console.log("MySQL database is connected.");
        connection.release();
    }
});

io.on("connect", (socket) => {
    socket.on("parking-status", async (details) => {
        try {
            const { parkingLotId, isOccupied } = JSON.parse(details),
                connection = await dbPool.getConnection();

            await connection.query(`UPDATE ParkingLot SET isOccupied = ${isOccupied} WHERE parkingLotId = "${parkingLotId}"`);
            connection.release();
            
            io.emit("display-status", { parkingLotId, isOccupied });
        } catch (error) {
            console.log(error);
        }
    });
});


server.listen(port, (error) => {
    if (error)
        console.log("Failed to start the server.");
    else
        console.log(`Server is running on port ${port}.`);
});

process.on("SIGINT", () => {
    dbPool.end((error) => {
        if (error) {
            console.error("Error closing MySQL connection pool.");
        } else {
            console.log("MySQL connection pool closed.");
            process.exit(0);
        }
    });
});