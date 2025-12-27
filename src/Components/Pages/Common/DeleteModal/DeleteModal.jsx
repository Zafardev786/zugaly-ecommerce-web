import React from 'react'

function DeleteModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this patient?</p>
        <div className="flex justify-end">
            <button
                onClick={toggleDeleteModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-4"
            >
                Cancel
            </button>
            <button
                onClick={() => {
                    
                    toggleDeleteModal();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
                Confirm
            </button>
        </div>
    </div>
</div>
  )
}

export default DeleteModal