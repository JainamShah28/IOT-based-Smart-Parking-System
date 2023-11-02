import React from "react";
import { io } from "socket.io-client";

import Header from "./components/Header.jsx";
import StatusBar from "./components/StatusBar.jsx";
import ParkingLot from "./components/ParkingLot.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    const [parkingLotsStatus, setParkingLotsStatus] = React.useState({
        occupied: 0,
        notOccupied: 0
    }),
        [parkingLots, setParkingLots] = React.useState([]);

    async function fetchParkingLotDetails() {
        try {
            const response = await fetch('http://localhost:5000/parking-lot');
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        const socket = io('http://localhost:5000', {
            autoConnect: false
        });

        socket.connect();

        socket.on("display-status", (updatedDetails) => {
            setParkingLots(parkingLots => {
                return parkingLots.map(parkingLot => {
                    if (parkingLot.parkingLotId === updatedDetails.parkingLotId) {
                        return {
                            ...parkingLot,
                            isOccupied: updatedDetails.isOccupied
                        }
                    } 

                    return parkingLot;
                });
            });

            setParkingLotsStatus(() => {
                const occupied = parkingLots.filter(parkingLot => parkingLot.isOccupied === true).length,
                    notOccupied = parkingLots.length - occupied;

                return { occupied, notOccupied };
            });
        });

        fetchParkingLotDetails().then(data => {
            if (data.success) {
                const { occupied, notOccupied, parkingLots } = data.data;

                setParkingLotsStatus({ occupied, notOccupied });
                setParkingLots(parkingLots);
            }
        }).catch(error => {
            console.log(error);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <main className="App w-screen min-h-screen flex flex-col">
            <Header />
            <StatusBar status={parkingLotsStatus} />
            <ParkingLot parkingLots={parkingLots} />
            <Footer />
        </main>
    );
}

export default App;