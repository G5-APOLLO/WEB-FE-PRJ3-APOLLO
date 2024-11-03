import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="spinner-border animate-spin inline-block w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-4 rounded-full border-t-transparent border-blue-500">
            </div>
        </div>
    );
};

export default Spinner;