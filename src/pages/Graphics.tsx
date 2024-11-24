import React from "react";
import EstimatedVSFinalized from "../components/EstimatedVSFinalizedGrapichs";
import OpportunitiesPieChart from '../components/OpportunitiesPieChart';
import OpportunitiesByBusinessLineChart from '../components/OpportunitiesPieChartLine';
import { useGetOpportunities } from '../hooks/useGetOpportunities';

const Graphics: React.FC = () => {
    const { data: opportunities } = useGetOpportunities();
    const totalOpportunities = opportunities?.length || 0;

    return (
        <div>
            <h1 className="text-center md:text-6xl text-4xl font-extrabold mb-10 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-black-500 to-gray-600">
                GRAPHICS
            </h1>
            <EstimatedVSFinalized />

            <div className="w-full h-px bg-gray-300 mt-10"></div>
            
            <div className="bg-gray-100 rounded-lg shadow-md p-4 pb-16 w-full h-full mx-auto">
                <h2 className="text-center text-3xl font-bold mb-2" style={{ color: '#626262' }}>
                    Opportunities Distribution
                </h2>
                <p className="text-center text-xl font-medium text-gray-900 ">
                    Total Opportunities: <span className="text-gray-600">{totalOpportunities}</span>
                </p>
          

                {/* Flex container to place charts side by side */}
                <div className="flex flex-wrap justify-center gap-10 mt-5">
                    <div className="w-full sm:w-[400px] md:w-[45%] lg:w-[30%]">
                        <OpportunitiesPieChart />
                    </div>
                    <div className="w-full sm:w-[400px] md:w-[45%] lg:w-[30%]">
                        <OpportunitiesByBusinessLineChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Graphics;
