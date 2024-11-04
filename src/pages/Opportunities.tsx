import React from "react";

import OpportunitiesTable from "../components/ListOpportunities";

const OpportunitiesPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-center md:text-6xl text-4xl font-extrabold mb-10 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-black-500 to-gray-600 ">
                OPPORTUNITIES LIST
            </h1>
            <OpportunitiesTable  />
        </div>
    );
};

export default OpportunitiesPage;