
import Button from "../Button";
import TableButtons from "./TableBooking/TableButtons";
import TableHeaderRow from "./TableBooking/TableHeaderRow";

const DetailsModel = ({ isOpen, onClose,expenceData, student, paymentStudent, paymentDetails, academicDetails, paymentLocker, onSubmit, routesPermission, permission }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg mb-14 sm:mb-0 shadow-md w-full max-w-3xl p-4 sm:p-6 relative max-h-[90%] sm:max-h-[90%] overflow-y-auto">
                <Button
                    text="&times;"
                    onClick={onClose}
                    style="text-gray-500 hover:text-gray-700 text-xl font-bold"
                />
                {/* Patient Details */}
                <TableHeaderRow title="Student Details" data={student} />

                {/* Appointment Details */}
                <TableHeaderRow title="Academic Details" data={academicDetails} />
                <TableHeaderRow title="Payment Admission Time" data={paymentDetails} />
                <TableHeaderRow title="Expence Details" data={expenceData} />
                
                {/* Doctor Details */}
                {
                    paymentLocker && Object.keys(paymentLocker).length > 0 && (
                        <TableHeaderRow title={`Payment Locker Details`} data={paymentLocker} />
                    )
                }

                {
                    paymentStudent && Object.keys(paymentStudent).length > 0 && (
                        <TableHeaderRow title="Payment Student Details" data={paymentStudent} />
                    )
                }


                <TableHeaderRow title={`Permission Details`} data={permission} />

                <TableHeaderRow title="Routes Permission" data={routesPermission} />

                {/* Actions */}
                <TableButtons onSubmit={onSubmit} onClose={onClose} />
            </div>
        </div>
    );
};

export default DetailsModel;