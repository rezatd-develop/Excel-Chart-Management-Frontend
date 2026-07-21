'use client';

import { useEffect, useState } from "react";
import CuDialog from "@/app/components/dialog/CuDialog";
import { getAllTotalsService } from "@/app/services/apis/dashboard/dashboardServices";
import { FaDollarSign, FaShoppingCart, FaChartLine, FaCoins } from "react-icons/fa";

const TotalOverview = () => {
    const [totals, setTotals] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    async function fetchTotals() {
        try {
            const data = await getAllTotalsService();
            if (data?.hasError || data?.error) {
                setErrorMessage(data?.message || 'there is a problem in fetching data');
                setShowErrorDialog(true);
            } else {
                setTotals(data?.data || data);
            }
        } catch (err) {
            setErrorMessage(err.message || 'Error in load data');
            setShowErrorDialog(true);
        }
    }

    useEffect(() => {
        fetchTotals();
    }, []);

    const cards = totals
        ? [
            { title: "Overall Price", value: totals.totalPrice, color: "ocean", icon: <FaDollarSign size={28} /> },
            { title: "Overall Sale", value: totals.totalPurchase, color: "sunset", icon: <FaShoppingCart size={28} /> },
            { title: "Profit", value: totals.totalProfit, color: "mint", icon: <FaChartLine size={28} /> },
            { title: "Final Price", value: totals.finalAmount, color: "violet", icon: <FaCoins size={28} /> },
        ]
        : [];

    const colorClasses = {
        ocean: "bg-gradient-ocean",
        sunset: "bg-gradient-sunset",
        mint: "bg-gradient-mint",
        violet: "bg-gradient-violet",
    };

    const bootstrapColors = {
        ocean: "#3a86ff",   // Deep blue
        sunset: "#ff6b6b",  // Coral red
        mint: "#2ec4b6",    // Mint green
        violet: "#9d4edd",  // Vibrant violet
    };

    return (
        <div className="mt-4 mb-5">
            {totals ? (
                <div className="row g-4">
                    {cards.map((card, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div
                                className={`card text-white rounded-4 shadow-sm border-0 p-3`}
                                style={{
                                    background: `linear-gradient(135deg, ${bootstrapColors[card.color]}, ${shadeColor(bootstrapColors[card.color], -20)})`,
                                }}
                            >
                                <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
                                    <div className="mb-2">{card.icon}</div>
                                    <h6 className="fw-semibold mb-2">{card.title}</h6>
                                    <h5 className="fw-bold">{Number(card.value || 0).toLocaleString()} $</h5>
                                    <p className="text-white/80 mt-1 text-sm">Overall {card.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted text-center mt-5">Loading data ...</p>
            )}

            <CuDialog
                isOpen={showErrorDialog}
                dialogHeader="Error"
                dialogContent={errorMessage}
                handleClose={() => setShowErrorDialog(false)}
            />
        </div>
    );
};

// Helper to darken the gradient a bit
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    const RR = (R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16);
    const GG = (G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16);
    const BB = (B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
}

export default TotalOverview;
