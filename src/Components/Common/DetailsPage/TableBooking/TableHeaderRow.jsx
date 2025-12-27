import moment from "moment";
import Image from "next/image";

const TableHeaderRow = ({ title, data }) => {
    if (!data) return null;

    // Fields to exclude from display
    const excludeFields = ["lockerId", "admissionCharge", "registrationCharge", "seatId", "paymentMode", "_id", "studentId", "createdAt", "updatedAt", "__v", "userId", "isPaid", "password", "attachment"];

    // Function to format date and time using moment
    const formatDateTime = (value) => {
        if (moment(value, moment.ISO_8601, true).isValid()) {
            return moment(value).format("DD MMM YYYY"); // Example: "10 Mar 2025 11:15 AM"
        }
        return value?.toString() || "N/A";
    };

    // Function to check if a value is a valid image URL
    const isImageUrl = (value) => {
        if (typeof value !== "string") return false;
        return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(value);
    };
    const formatDate = (date) => {
        return moment(date).format("Do MMM YYYY [at] hh:mm A");
    };
    return (
        <>
            <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-3 text-center text-gray-700">{title}</h3>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-800">
                            <th className="px-3 py-2 border text-xs sm:text-sm">Field</th>
                            <th className="px-3 py-2 border text-xs sm:text-sm">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(data)
                            .filter(([key]) => !excludeFields.includes(key)) // Remove unwanted fields
                            .map(([key, value]) => (
                                <tr key={key} className="odd:bg-gray-50 even:bg-white">
                                    <td className="px-3 py-2 border-r border-gray-300 text-xs sm:text-sm font-medium text-gray-700">
                                        {key}
                                    </td>
                                    <td className="px-3 py-2 text-xs sm:text-sm text-gray-600">
                                        {Array.isArray(value) ? (
                                            <div className="space-y-2">
                                                {value.map((item, index) => (
                                                    <div key={index} className="border p-3 rounded-md bg-gray-50 shadow-sm">
                                                        {typeof item === "object" && item !== null ? (
                                                            <table className="table-auto w-full">
                                                                <tbody>
                                                                    {Object.entries(item || {}) // Ensure item is not null
                                                                        .filter(([subKey]) => !excludeFields.includes(subKey))
                                                                        .map(([subKey, subValue]) => (
                                                                            <tr key={subKey}>
                                                                                <td className="px-2 py-1 text-xs sm:text-sm font-medium text-gray-700">
                                                                                    {subKey}:
                                                                                </td>
                                                                                <td className="px-2 py-1 text-xs sm:text-sm text-gray-600">
                                                                                    {typeof subValue === "object"
                                                                                        ? JSON.stringify(subValue)
                                                                                        : isImageUrl(subValue) ? (
                                                                                            <Image
                                                                                                src={subValue}
                                                                                                alt={subKey}
                                                                                                width={200}
                                                                                                height={200}
                                                                                                className="w-24 h-24 object-cover rounded-md"
                                                                                            />
                                                                                        ) : (
                                                                                            formatDateTime(subValue)
                                                                                        )}
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                </tbody>
                                                            </table>
                                                        ) : isImageUrl(item) ? (
                                                            <Image
                                                                src={item}
                                                                alt={key}
                                                                width={200}
                                                                height={200}
                                                                className="w-24 h-24 object-cover rounded-md"
                                                            />
                                                        ) : (
                                                            formatDateTime(item)
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : value && typeof value === "object" ? (
                                            <ul className="space-y-2 pl-4">
                                                {Object.entries(value || {})
                                                    .filter(([subKey]) => !excludeFields.includes(subKey)) // Exclude defined fields
                                                    .map(([subKey, subValue]) => {
                                                        if (subKey === "_id") return null; // Skip rendering _id field

                                                        if (Array.isArray(subValue)) {
                                                            return (
                                                                <li key={subKey} className="bg-gray-100 border border-gray-300 rounded-md p-1 shadow-sm text-sm sm:text-base">
                                                                    <span className="font-medium text-gray-700">{subKey}:</span>
                                                                    <ul className="space-y-1 pl-3 mt-1">
                                                                        {subValue?.map((item, idx) => (
                                                                            <li key={idx} className="bg-white border border-gray-200 rounded-md p-2 shadow-sm">
                                                                                <span className="font-semibold text-blue-700">
                                                                                    {`${["First", "Second", "Third", "Fourth", "Fifth"][idx] || `${idx + 1}th`} Payment:`}
                                                                                </span>
                                                                                <span className="text-gray-600 text-xs sm:text-sm">
                                                                                    {typeof item === "object" ? (
                                                                                        // Here, we can map through the properties in `item`
                                                                                        <ul className="space-y-1 pl-3">
                                                                                            {typeof item === "object" && item !== null ? (
                                                                                                <ul className="space-y-1 pl-3">
                                                                                                    {Object.entries(item).map(([key, value]) => {
                                                                                                        if (key === "_id") return null; // Skip _id field
                                                                                                        return (
                                                                                                            <li key={key}>
                                                                                                                <span className="font-medium text-gray-700">{key}: </span>
                                                                                                                <span className="text-gray-600 text-xs sm:text-sm">
                                                                                                                    {key === "paymentUTRs" ? value.join(", ") : value}
                                                                                                                </span>
                                                                                                            </li>
                                                                                                        );
                                                                                                    })}
                                                                                                </ul>
                                                                                            ) : (
                                                                                                <span className="text-gray-600 text-xs sm:text-sm">
                                                                                                    {isImageUrl(item) ? (
                                                                                                        <Image
                                                                                                            src={item}
                                                                                                            alt={key}
                                                                                                            className="w-24 h-24 object-cover rounded-md"
                                                                                                        />
                                                                                                    ) : (
                                                                                                        formatDateTime(item)
                                                                                                    )}
                                                                                                </span>
                                                                                            )}
                                                                                        </ul>
                                                                                    ) : isImageUrl(item) ? (
                                                                                        <Image
                                                                                            src={item}
                                                                                            alt={subKey}
                                                                                            className="w-24 h-24 object-cover rounded-md"
                                                                                        />
                                                                                    ) : (
                                                                                        formatDateTime(item)
                                                                                    )}
                                                                                </span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </li>
                                                            );
                                                        }

                                                        return (
                                                            <li key={subKey} className="bg-gray-100 border border-gray-300 rounded-md p-1 shadow-sm text-xs sm:text-sm">
                                                                <span className="font-medium text-gray-700">{subKey}:</span>
                                                                <span className="text-gray-600 text-xs sm:text-sm">
                                                                    {typeof subValue === "object" ? (
                                                                        <ul className="space-y-1 pl-3">
                                                                            {Object?.entries(subValue).map(([key, value]) => {
                                                                                if (key === "_id") return null; // Skip _id field
                                                                                return (
                                                                                    <li key={key}>
                                                                                        <span className="font-medium text-gray-700">{key}: </span>
                                                                                        <span className="text-gray-600 text-xs sm:text-sm">
                                                                                            {key === "paymentUTRs" ? value.join(", ") : value}
                                                                                        </span>
                                                                                    </li>
                                                                                );
                                                                            })}
                                                                        </ul>
                                                                    ) : isImageUrl(subValue) ? (
                                                                        <Image
                                                                            src={subValue}
                                                                            alt={subKey}
                                                                            className="w-24 h-24 object-cover rounded-md"
                                                                        />
                                                                    ) : (
                                                                        formatDateTime(subValue)
                                                                    )}
                                                                </span>
                                                            </li>
                                                        );
                                                    })}
                                            </ul>

                                        ) : isImageUrl(value) ? (
                                            <Image
                                                src={value}
                                                alt={key}
                                                className="w-24 h-24 object-cover rounded-md"
                                            />
                                        ) : (
                                            formatDateTime(value)
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TableHeaderRow;