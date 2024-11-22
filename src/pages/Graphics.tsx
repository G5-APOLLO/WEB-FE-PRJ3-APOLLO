import React from "react";
import EstimatedVSFinalized from "../components/EstimatedVSFinalizedGrapichs";
import OpportunitiesPieChart from '../components/OpportunitiesPieChart';
import OpportunitiesByBusinessLineChart from '../components/OpportunitiesPieChartLine';

const Graphics: React.FC = () => {
    return (
        <div>
            <h1 className="text-center md:text-6xl text-4xl font-extrabold mb-10 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-black-500 to-gray-600">
                GRAPHICS
            </h1>
            <EstimatedVSFinalized />

            {/* Flex container to place charts side by side */}
            <div className="flex flex-wrap justify-center gap-10 mt-10">
                <div className="w-full sm:w-[400px] md:w-[45%] lg:w-[30%]">
                    <OpportunitiesPieChart />
                </div>
                <div className="w-full sm:w-[400px] md:w-[45%] lg:w-[30%]">
                    <OpportunitiesByBusinessLineChart />
                </div>
            </div>
        </div>
    );
};

export default Graphics;
