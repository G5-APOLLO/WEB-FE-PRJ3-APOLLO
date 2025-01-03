import React from "react";

import TrackingActivitiesTable from "../components/TrackingActivitiesTable";

const OpportunitiesPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-center md:text-6xl text-4xl font-extrabold mb-10 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-black-500 to-gray-600 ">
                TRACKING ACTIVITIES LIST
            </h1>
            <TrackingActivitiesTable/>
        </div>
    );
};

export default OpportunitiesPage;