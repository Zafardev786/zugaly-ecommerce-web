const SkeletonLoader = ({ }) => {


    return (
        <div className="container mx-auto p-4">
            {/* Filter Skeleton */}
            <div className="mb-4">
                <div className="w-full h-12 bg-gray-300 animate-pulse rounded-lg"></div>
            </div>

            {/* Table Skeleton */}
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto relative">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    {/* Sticky Header Skeleton */}
                    <thead className="bg-gray-100 border-b sticky top-0 z-20">
                        <tr>
                            {/* Student Name Header */}
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 bg-gray-100 sticky left-0 z-30">
                                <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                            </th>
                            {/* Months Headers */}
                            {[...Array(12)].map((_, index) => (
                                <th key={index} className="px-4 py-3 text-center text-sm font-medium text-gray-700 bg-gray-100">
                                    <div className="w-16 h-4 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body Skeleton */}
                    <tbody>
                        {[...Array(10)].map((_, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                {/* Student Name Cell */}
                                <td className="px-6 py-4 text-sm text-gray-600 bg-white sticky left-0 z-10 border-r border-gray-200">
                                    <div className="w-32 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                                </td>
                                {/* Month Cells */}
                                {[...Array(12)].map((_, colIndex) => (
                                    <td key={colIndex} className="px-4 py-4 text-center">
                                        <div className="w-12 h-4 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-4">
                <div className="w-64 h-10 bg-gray-300 animate-pulse rounded-lg"></div>
            </div>
        </div>
    );
};


const SkeletonLoaderDashboard = ({ cardData, studentData, paymentDetails }) => {
    const students = Array.isArray(studentData) ? studentData : [studentData];



    return (
        <div className="bg-white p-4 shadow rounded-lg w-full overflow-hidden">
            {/* Skeleton for Filter Section */}
            <div className="mb-4">
                <div className="w-full h-12 bg-gray-300 animate-pulse rounded-lg"></div>
            </div>

            {/* Skeleton for Overview Cards Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">General Overview</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto sm:overflow-hidden">
                    {cardData?.map((_, index) => (
                        <div key={index} className="bg-gray-300 p-4 rounded flex flex-col items-center min-w-[100px] sm:min-w-[150px] animate-pulse">
                            <span className="text-xl sm:text-2xl mb-1 bg-gray-400 w-8 h-8 rounded-full"></span>
                            <h3 className="text-md sm:text-lg font-semibold bg-gray-400 w-12 h-4 rounded-md"></h3>
                            <p className="text-xs sm:text-sm text-gray-600 text-center truncate bg-gray-400 w-16 h-4 rounded-md"></p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skeleton for Students Per Shift Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Students Per Shift</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto sm:overflow-hidden">
                    {students.map((_, index) => (
                        <div key={index} className="bg-gray-300 p-4 rounded flex flex-col items-center min-w-[100px] sm:min-w-[150px] animate-pulse">
                            <span className="text-xl sm:text-2xl mb-1 bg-gray-400 w-8 h-8 rounded-full"></span>
                            <h3 className="text-md sm:text-lg font-semibold bg-gray-400 w-12 h-4 rounded-md"></h3>
                            <p className="text-xs sm:text-sm text-gray-600 text-center truncate bg-gray-400 w-16 h-4 rounded-md"></p>
                        </div>
                    ))}

                </div>
            </div>

            {/* Skeleton for Payment's Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment&#39;s Section</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto sm:overflow-hidden">
                    {paymentDetails?.map((_, index) => (
                        <div key={index} className="bg-gray-300 p-4 rounded flex flex-col items-center min-w-[100px] sm:min-w-[150px] animate-pulse">
                            <span className="text-xl sm:text-2xl mb-1 bg-gray-400 w-8 h-8 rounded-full"></span>
                            <h3 className="text-md sm:text-lg font-semibold bg-gray-400 w-12 h-4 rounded-md"></h3>
                            <p className="text-xs sm:text-sm text-gray-600 text-center truncate bg-gray-400 w-16 h-4 rounded-md"></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};




const SkeletonLoaderDatatble = ({ columns, actions, data }) => {
    const students = Array.isArray(data) ? data : [data];


    return (
        <div className="container mx-auto p-4">
            {/* Table Skeleton */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            {columns?.map((column, colIndex) => (
                                <th key={colIndex} className="px-4 py-3 text-left text-gray-700 font-bold text-sm border-b border-gray-200">
                                    <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                                </th>
                            ))}
                            {actions?.length > 0 && (
                                <th className="px-4 py-3 text-left text-gray-700 font-medium text-sm border-b border-gray-200">
                                    <div className="w-16 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map((_, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {columns?.map((column, colIndex) => (
                                    <td key={colIndex} className="px-2 py-3 border-b border-gray-200 text-gray-600 text-sm">
                                        {column?.accessor === "profile_pic" ? (
                                            <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>
                                        ) : (
                                            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                                        )}
                                    </td>
                                ))}
                                {actions?.length > 0 && (
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex space-x-2">
                                            {actions?.map((action, actionIndex) => (
                                                <div
                                                    key={actionIndex}
                                                    className="w-16 h-8 bg-gray-300 animate-pulse rounded-lg"
                                                ></div>
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



const SkeletonLoaderPayment = ({ studentData }) => {
    // Generate an array of 10 skeleton rows
    const skeletonRows = new Array(studentData?.length).fill(null);

    return (
        <div className="container mx-auto p-4">
            {/* Filter Skeleton */}
            <div className="mb-4">
                <div className="w-full h-12 bg-gray-300 animate-pulse rounded-lg"></div>
            </div>

            {/* Table Skeleton */}
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto relative">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    {/* Sticky Header Skeleton */}
                    <thead className="bg-gray-100 border-b sticky top-0 z-20">
                        <tr>
                            {/* Student Name Header */}
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 bg-gray-100 sticky left-0 z-30">
                                <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                            </th>
                            {/* Months Headers */}
                            {skeletonRows.map((_, index) => (
                                <th key={index} className="px-4 py-3 text-center text-sm font-medium text-gray-700 bg-gray-100">
                                    <div className="w-16 h-4 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body Skeleton */}
                    <tbody>
                        {skeletonRows.map((_, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                {/* Student Name Cell */}
                                <td className="px-6 py-4 text-sm text-gray-600 bg-white sticky left-0 z-10 border-r border-gray-200">
                                    <div className="w-32 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                                </td>
                                {/* Month Cells */}
                                {skeletonRows.map((_, colIndex) => (
                                    <td key={colIndex} className="px-4 py-4 text-center">
                                        <div className="w-12 h-4 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-4">
                <div className="w-64 h-10 bg-gray-300 animate-pulse rounded-lg"></div>
            </div>
        </div>
    );
};


const SeatBoxSkeleton = () => {
    return (
        <div className="m-2">
            <div
                className="relative border text-center rounded-lg shadow-4xl cursor-pointer 
                flex flex-col justify-center items-center bg-gradient-to-b from-gray-200 to-gray-300 
                hover:shadow-4xl hover:scale-105 hover:translate-y-1 transition-all duration-300 w-24 h-24 animate-pulse"
            >
                {/* Rotating Circle for Loading */}
                <div className="absolute w-10 h-10 border-4 border-dashed border-gray-400 rounded-full animate-spin"></div>

                <div className="flex flex-col items-center">
                    {/* Placeholder for Student Image */}
                    <div className="w-10 h-10 bg-gray-400 rounded-full mb-2 shadow-md border-2 border-gray-300"></div>

                    {/* Placeholder for Student Name */}
                    <div className="w-16 h-4 bg-gray-400 rounded-md mb-1"></div>

                    {/* Placeholder for Seat Number */}
                    <div className="w-10 h-4 bg-gray-400 rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export { SkeletonLoader, SkeletonLoaderDashboard, SkeletonLoaderDatatble, SkeletonLoaderPayment ,SeatBoxSkeleton };
