const TableButtons = ({ onSubmit, floor, onClose }) => (
    <div className="flex justify-end space-x-2 mt-4 flex-wrap">
        <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={onClose} // Pass floor to handleSubmit
        >
            Close
        </button>
        {/* <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            onClick={onClose} // Pass floor to handleSubmit
        >
            Reject
        </button> */}
    </div>
);

export default TableButtons
