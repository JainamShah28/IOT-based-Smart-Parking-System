import classNames from "classnames";

import Car from "../assets/car.png";

function ParkingLot({ parkingLots }) {
    return (
        <div className="parking-lot-container mt-8 flex-1">
            <div className="parking-lot grid grid-cols-2 gap-4 max-w-xs mx-auto">
                {
                    parkingLots.map((parkingLot, index) => (
                        <div
                            key={index}
                            className={classNames({
                                "flex justify-center items-center h-20": true,
                                "border-2 border-dashed border-gray-200 rounded-md": !parkingLot.isOccupied
                            })}>
                                {
                                    parkingLot.isOccupied ?
                                    <img src={Car} alt="car" /> :
                                    `${parkingLot.parkingLotId}`
                                }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ParkingLot;