import React from "react";
import Image from "next/image";

const FileUpload = ({ label, Press, name, id, type, preview }) => {
  return (
    <div className="form-group mb-4"> {/* Add some margin at the bottom */}
      <label className="form-label text-gray-600 font-sm" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center">
        <input
          type={type}
          id={id}
          name={name}
          onChange={Press}
          className="hidden" // Hide the input field
        />
        <div className="w-1/2 flex items-center justify-center">
          {preview ? (
            <Image
              src={preview}
              width={60} // Adjust width for better visibility
              height={50} // Adjust height for better visibility
              alt={`${label} Preview`}
              className="object-cover rounded-md border border-gray-300"
            />
          ) : (
            <label
            htmlFor={id}
            className="flex items-center justify-center w-full h-10 border border-dashed rounded-md text-gray-700 cursor-pointer hover:bg-gray-100 transition duration-150 shadow-md hover:shadow-lg"
          >
            <span className="text-sm">Upload</span> {/* Smaller text for compactness */}
          </label>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
