import React, { useState, useEffect } from "react";
import Input from "../../commom/Input";
import Title from "../../commom/Title";
import Btn from "../../commom/Buttons";
import postApi from "../../../api/postApi/postApi";
import ConfirmModal from "../../layouts/Modal/ConfirmModal";
import Loader from "../../commom/Loader";
import { useApi } from "../../../api/getApi/getApi";
import Select from "../../commom/Select"; // Import the Select component

const CreatePolling = ({ initialData = {}, onClose, setSuccess, toggle }) => {
  const [formData, setFormData] = useState({
    electionId: "",
    areaId: "",
    polling_station_name: "",
    polling_station_code: "",
    address: "",
    voting_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [elections, setElections] = useState([]);
  const [area, setArea] = useState([]);

  useApi({
    endpoint: "admin/get-elections",
    setData: setElections,
    setError: setErrorMessage,
    setLoading,
  });

  useApi({
    endpoint: "admin/get-areas",
    setData: setArea,
    setError: setErrorMessage,
    setLoading,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        electionId: initialData.electionId?._id || "",
        areaId: initialData.areaId?._id || "",
        polling_station_name: initialData.polling_station_name || "",
        polling_station_code: initialData.polling_station_code || "",
        address: initialData.address || "",
        voting_date: initialData.voting_date || "",
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setErrorMessage(null);

    try {
      const formDataWithFiles = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithFiles.append(key, value);
      });

      const endpoint = initialData?._id
        ? `admin/update-polling-stations/${initialData._id}` // Update endpoint
        : "admin/create-polling-stations"; // Create endpoint

      await postApi(endpoint, formData);

      setModalMessage(
        initialData?._id ? "Polling updated successfully!" : "Polling created successfully!"
      );
      setSuccess(true);

      if (!initialData?._id) {
        setFormData({
          electionId: "",
          areaId: "",
          polling_station_name: "",
          polling_station_code: "",
          address: "",
          voting_date: "",
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      id: "polling_station_name",
      name: "polling_station_name",
      placeholder: "Polling Station Name",
      type: "text",
      required: true
    },
    {
      id: "polling_station_code",
      name: "polling_station_code",
      placeholder: "Polling Station Code",
      type: "text",
      required: true
    },
    {
      id: "address",
      name: "address",
      placeholder: "Address",
      type: "text",
      required: true
    },
    // {
    //   id: "voting_date",
    //   name: "voting_date",
    //   placeholder: "Voting Date",
    //   type: "date",
    //   required: true
    // },
  ];

  const selectFields = [
    {
      id: "electionId",
      name: "electionId",
      placeholder: "Select Election",
      required: true,
      options: elections?.data?.map((election) => ({
        label: election.electionName,
        value: election._id,
      })),
    },
    {
      id: "areaId",
      name: "areaId",
      placeholder: "Select Area",
      required: true,
      options: area?.data?.map((area) => ({
        label: area.areaName,
        value: area._id,
      })),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="form col-12 box2 transbg row">
      <Title title={initialData?._id ? "Edit Polling" : "Create Polling"} className="col-12" />
      <div className="content row">
        {/* Input Fields */}
        {inputFields.map((field) => (
          <div className="col-6 center" key={field.id}>
            <Input
              type={field.type}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleInputChange}
              required={field.required}
            />
          </div>
        ))}

        {/* Select Fields */}
        {selectFields.map((field) => (
          <div className="col-6 center" key={field.id}>
            <Select
              id={field.id}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
              options={field.options}
            />
          </div>
        ))}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="error-box col-12 center">
          <p className="error-text">{errorMessage}</p>
        </div>
      )}

      {/* Loader or Button */}
      <div className="col-12 center">
        {!loading ? (
          <button type="submit" className="btn">
            {initialData?._id ? "Update" : "Create"}
          </button>
        ) : (
          <Loader />
        )}
      </div>

      {modalMessage && (
        <ConfirmModal
          message={modalMessage}
          onClose={() => setModalMessage("")}
        />
      )}
    </form>
  );
};

export default CreatePolling;
