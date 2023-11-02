USE intelliPark;

CREATE TABLE IF NOT EXISTS ParkingLot (
    parkingLotId VARCHAR(4),
    isOccupied BOOLEAN DEFAULT 0,
    PRIMARY KEY(parkingLotId)
);

INSERT INTO ParkingLot(parkingLotId) VALUES("A1");
INSERT INTO ParkingLot(parkingLotId) VALUES("A2");
INSERT INTO ParkingLot(parkingLotId) VALUES("A3");
INSERT INTO ParkingLot(parkingLotId) VALUES("A4");