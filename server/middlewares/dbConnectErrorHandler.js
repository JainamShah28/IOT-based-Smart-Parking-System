import dbConnection from "../config/dbConnect";

function dbConnectErrorHandler(request, response, next) {
    if (dbConnection.state === "disconnected") {
        dbConnection.connect((error) => {
            if (error) 
                console.log("Failed to reconnect with MySQL database.");
            else
                console.log("MySQL database is reconnected.")
        });
    }

    next();
}

export default dbConnectErrorHandler;