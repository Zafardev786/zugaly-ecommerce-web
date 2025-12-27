import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SkeletonLoaderDatatble } from "../Common/Scaliton/Scaliton";

const DataTable = ({ data, online, columns, actions, actionHeader, errorMessage, loading, onAccept }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");

  // Function to handle filtering
  const filteredData = data?.filter((item) => {
    const name = item?.name || "";
    const mobile = item?.mobile || "";
    const email = item?.email || "";
    const status = item?.status || "";
    const paymentStatus = item?.payment_status || "";
    const adharcard = item?.adharcard || "";
    const pancard = item?.pancard || "";
    const username = item?.username || "";

    return (
      (name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adharcard.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pancard.toLowerCase().includes(searchQuery.toLowerCase()) ||
        username.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!statusFilter || status === statusFilter) &&
      (!paymentStatusFilter || paymentStatus === paymentStatusFilter)
    );
  });

  // Function to handle delete action
  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };



  // Render skeleton loader if data is still loading
  if (loading) {
    return <SkeletonLoaderDatatble
      columns={columns}
      actions={actions}
      data={data}

    />;
  }


  return (
    <div className="">
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-[100%] bg-white border border-gray-200 rounded-lg shadow-md table-auto">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              {columns?.map((column, colIndex) => (
                <th
                  key={colIndex}
                  className="px-4 py-3 text-left text-gray-700 font-bold text-xs sm:text-sm border-b border-gray-200 whitespace-nowrap"
                >
                  {column?.header}
                </th>
              ))}
              {actions?.length > 0 && (
                <th className="px-4 py-3 text-left text-gray-700 font-medium text-xs sm:text-sm border-b border-gray-200">
                  {actionHeader}
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredData?.map((item, index) => (
              <tr
                key={index}
                className="table-row-animation hover:bg-gray-50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-2 py-3 border-b border-gray-200 text-gray-600 text-xs sm:text-sm whitespace-nowrap"
                  >
                    {typeof column?.accessor === "function" ? (
                      column?.accessor(item)
                    ) : column?.accessor === "profile_pic" ? (
                      <Image
                        src={item?.profile_pic || "/default-avatar.png"}
                        width={40}
                        height={40}
                        className="rounded-full border border-gray-300 cursor-pointer"
                        alt={item?.name}
                        onClick={() => router.push("/library-management/students/profile-page")}
                      />
                    ) : (
                      item[column?.accessor]
                    )}
                  </td>
                ))}
                {actions?.length > 0 && (
                  <td className="px-6 py-4 text-center">
                    {actions?.map(
                      (action) =>
                        (action?.condition ? action?.condition(item) : true) && (
                          <button
                            key={action?.text}
                            className={`${action?.className} px-3 py-2 rounded-lg text-xs sm:text-sm`}
                            onClick={() =>
                              action?.text === "Edit"
                                ? router.push(`/edit/${item.id}`)
                                : handleDelete(item)
                            }
                          >
                            {action?.text}
                          </button>
                        )
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add CSS for animation */}
      <style jsx>{`
      .table-row-animation {
        opacity: 0;
        transform: scale(0.95);
        animation: scaleIn 0.3s ease-out forwards;
      }
  
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}</style>
    </div>

  );
};

export default DataTable;
