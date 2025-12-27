import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import SelectInput from "./SelectInput";
import FormInput from "./FormInput";
import FileInput from "./FileInput";
import Button from "./Button";
import NotificationModal from "../Constant/NotificationModal/NotificationModal";
import Loader from "./Loader";

const AddForm = ({
    title = "Form",
    inputFields = [],
    selectFields = [],
    onCancel,
    defaultValues = {},
    saveText = "Save",
    cancelText = "Cancel",
    handleDeleteImage,
    validationErrors,
    setCurrentForm,
    formFields,
    loading,
    handleSubmit,
    onFileChange,
    handleChange,
    textArea,
    students,
    showDropdown,
    setSearchTerm,
    setStudentId,
    searchTerm,
    setShowDropdown,
    remover,
    handleFileChange,
    imagePreview,
    onNext,
    handleBack,
    currentForm
}) => {
    const [formData, setFormData] = useState(defaultValues);
    const [modal, setModal] = useState({
        isVisible: false,
        message: "",
        type: "", // success or error
    });

    console.log("studentsstudentsstudents", students)
    // Update formData when defaultValues change
    useEffect(() => {
        setFormData(defaultValues);
    }, [defaultValues]);

    const showModal = (message, type) => {
        setModal({
            isVisible: true,
            message,
            type,
        });

        // Hide modal after 3 seconds
        setTimeout(() => {
            setModal({ ...modal, isVisible: false });
        }, 3000);
    };

    const handleSelectStudent = (student) => {
        setSearchTerm(student?.full_name);
        setStudentId(student?._id);
        setFormData(prev => ({ ...prev, studentId: student?._id }));
        setShowDropdown(false);
    };

    const handleRemove = () => {
        setSearchTerm("")
        setFormData(prev => ({ ...prev, studentId: "" }));

    };
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">

            <div className="bg-white rounded-lg mb-14 sm:mb-0 shadow-md w-full max-w-3xl p-4 sm:p-6 relative max-h-[90%] sm:max-h-[90%] overflow-y-auto">
                {/* Header */}
                {loading &&
                    <div className="flex items-center justify-center py-4">
                        <Loader />
                    </div>
                }
                <div className="flex justify-between items-center mb-6">
                    {
                        searchTerm !== "" && (
                            <>
                                {
                                    remover && (
                                        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                            Remove selected <span className="text-blue-600">{searchTerm}</span>
                                            <span
                                                className="ml-2 cursor-pointer text-red-500 text-xl font-bold hover:text-red-700"
                                                onClick={handleRemove} // Search term remove karne ke liye
                                            >
                                                ✕
                                            </span>
                                        </h2>
                                    )
                                }
                            </>

                        )
                    }

                    <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
                    <Button
                        text="&times;"
                        onClick={onCancel}
                        style="text-gray-500 hover:text-gray-700 text-xl font-bold"
                    />
                </div>

                {/* Form */}
                <form onSubmit={(e) => {
                    handleSubmit(e);

                }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">


                        {showDropdown && students?.length > 0 && (
                            <div className="relative">
                                <div className="absolute left-0 top-full z-10 bg-white border border-gray-300 shadow-md w-full max-h-60 overflow-y-auto">
                                    {students.map((student) => (
                                        <div
                                            key={student._id}
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => handleSelectStudent(student)}
                                        >
                                            <p className="font-medium">{student.full_name}</p>
                                            <p className="text-xs text-gray-500">{student.email}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}




                        {
                            formFields && (
                                <>
                                    {formFields?.map(({ label, multiSelect, name, placeholder, disabled, required, options, type = "text", isActive }) => (
                                        <FormInput
                                            key={name}
                                            label={label}
                                            name={name}
                                            value={formData[name] || ""}
                                            onChange={handleChange}
                                            placeholder={placeholder}
                                            type={type}
                                            isActive={isActive}
                                            options={options}
                                            required={required}
                                            disabled={disabled}
                                            multiSelect={multiSelect}
                                            handleFileChange={handleFileChange}
                                            imagePreview={imagePreview}
                                            handleDeleteImage={handleDeleteImage}
                                            error={validationErrors?.[name]}


                                        />
                                    ))}
                                </>
                            )
                        }


                        {selectFields && selectFields?.map(({ label, name, options, isActive, placeholder }) => (
                            <SelectInput
                                key={name}
                                label={label}
                                name={name}
                                value={formData[name] || ""}
                                onChange={handleChange}
                                placeholder={placeholder}
                                options={options}
                                isActive={isActive}
                            />
                        ))}


                        {inputFields?.map(({ label, name, placeholder, type = "text", isActive }) => (
                            <TextInput
                                key={name}
                                label={label}
                                name={name}
                                value={formData[name] || ""}
                                onChange={handleChange}
                                placeholder={placeholder}
                                type={type}
                                isActive={isActive}
                            />
                        ))}

                    </div>

                    {/* File Upload */}
                    {onFileChange && (
                        <FileInput
                            label="Upload File"
                            name="file"
                            value={formData.file?.name || ""}
                            onChange={onFileChange}
                            accept="image/*,application/pdf"
                        />
                    )}

                    {/* Optional TextArea */}
                    {textArea && (
                        <TextAreaInput
                            label="Additional Information"
                            name="additionalInfo"
                            value={formData.additionalInfo || ""}
                            onChange={handleChange}
                            placeholder="Enter any additional information"
                        />
                    )}

                    {/* Action Buttons */}
                    {
                        currentForm ? (
                            <>
                                <div className="flex justify-end space-x-4 pb-3">
                                    {
                                        currentForm === 1 && (
                                            <Button type="button" text="Next" onClick={onNext} style="bg-gray-200 text-gray-600 hover:bg-gray-300">
                                                Next
                                            </Button>






                                        )
                                    }


                                    {
                                        currentForm === 2 && (
                                            <>
                                                <Button
                                                    text="Back"
                                                    onClick={() => setCurrentForm(1)}
                                                    style="bg-gray-200 text-gray-600 hover:bg-gray-300"
                                                />

                                                <Button
                                                    text={loading ? "Processing..." : saveText}
                                                    style="bg-blue-500 text-white hover:bg-blue-600"
                                                    type="submit"
                                                />
                                            </>

                                        )
                                    }


                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-end space-x-4 pb-3">
                                    <Button
                                        text={cancelText}
                                        onClick={onCancel}
                                        style="bg-gray-200 text-gray-600 hover:bg-gray-300"
                                    />
                                    <Button
                                        text={loading ? "Processing..." : saveText}
                                        style="bg-blue-500 text-white hover:bg-blue-600"
                                        type="submit"
                                    />



                                </div>
                            </>
                        )
                    }




                    {/* Action Buttons */}

                </form>
                {/* Notification Modal */}
                <NotificationModal
                    message={modal.message}
                    type={modal.type}
                    isVisible={modal.isVisible}
                    onClose={() => setModal({ ...modal, isVisible: false })}
                />
            </div>
        </div>
    );
};

export default AddForm;
