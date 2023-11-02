function StatusBar({ status }) {
    return (
        <div className="status-bar mx-auto flex items-center mt-4 text-sm gap-x-6 w-fit bg-slate-100 rounded-md py-1 px-2 md:text-base">
            <div className="fill-status flex items-center gap-x-3">
                <span className="bg-white py-2 px-4 rounded-md font-bold">{status.occupied}</span>
                <span className="text-orange-500">Occupied</span>
            </div>

            <div className="fill-status flex items-center gap-x-3">
            <span className="bg-white py-2 px-4 rounded-md font-bold">{status.notOccupied}</span>
                <span className="text-orange-500">Not Occupied</span>
            </div>
        </div>
    );
}

export default StatusBar;