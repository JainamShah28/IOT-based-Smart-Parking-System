import Car from "../assets/car.png";

function Footer() {
    return (
        <footer className="w-full border-t border-t-gray-200 py-3 px-4">
            <div className="footer-container max-w-screen-xl mx-auto flex justify-center items-center gap-x-6">
                <div className="filled-symbol flex items-center gap-x-3">
                    <div className="w-16 h-16">
                        <img src={Car} alt="car" />
                    </div>
                    <span>Occupied</span>
                </div>

                <div className="empty-symbol flex items-center gap-x-3">
                    <div className="rounded-md w-10 h-10 border-2 border-dashed border-gray-200"></div>
                    <span>Not Occupied</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;