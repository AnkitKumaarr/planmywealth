"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import * as XLSX from "xlsx";
import { MdDelete } from "react-icons/md";

// Individual advisor item component with edit and delete options
const AdvisorItem = ({ item, index, onEdit, onDelete }) => (
  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.name || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.email || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.password || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.verified ? "Verified" : "Not Verified"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.role || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.created_at
        ? new Date(item.created_at).toLocaleDateString()
        : new Date().toLocaleDateString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-2">
      <button
        onClick={() => onEdit(item, index)}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        ✏️
      </button>
      <button
        onClick={() => onDelete(index)}
        className="text-red-600 hover:text-red-800 font-medium"
      >
        <MdDelete size={20} />
      </button>
    </td>
  </tr>
);

export default function AddAdvisor() {
  const [advisorData, setAdvisorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingAdvisor, setEditingAdvisor] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verified: true,
    role: "advisor",
  });
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin, if not redirect to dashboard
    if (user && user.role !== "admin" && user.role !== "manager") {
      router.push("/dashboard");
      return;
    }
  }, [user, router]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Add created_at field to each record
        console.log("jsonData", jsonData);
        const processedData = jsonData.map((item) => ({
          ...item,
          created_at: new Date().toISOString(),
          verified: true,
          role: item.role || "advisor", // Default role if not specified
        }));

        setAdvisorData(processedData);
        setError(null);
      } catch (err) {
        console.error("Error processing Excel file:", err);
        setError(
          "Failed to process the Excel file. Please make sure it has the correct format."
        );
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Error reading the file");
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleEditAdvisor = (advisor, index) => {
    setEditingAdvisor(advisor);
    setEditIndex(index);
    setFormData({
      name: advisor.name || "",
      email: advisor.email || "",
      password: advisor.password || "",
      verified: advisor.verified || true,
      role: advisor.role || "advisor",
    });
  };

  const handleDeleteAdvisor = (index) => {
    setAdvisorData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const updatedAdvisors = [...advisorData];
    updatedAdvisors[editIndex] = {
      ...editingAdvisor,
      ...formData,
    };

    setAdvisorData(updatedAdvisors);
    setEditingAdvisor(null);
    setEditIndex(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      verified: true,
      role: "advisor",
    });
  };

  const handleRegisterAll = () => {
    // In a real implementation, this would send data to an API
    alert(`Ready to register ${advisorData.length} advisors to the database`);
    console.log("Data to register:", advisorData);
  };

  if (!user) {
    return (
      <div className="text-center py-10">Please log in to access this page</div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="text-center py-10">
        You don't have permission to access this page
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-full overflow-x-auto">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Add Advisor</h1>
        <p className="text-black text-sm md:text-base">
          Add new advisor to the system.
        </p>
      </div>

      <div className="flex flex-col items-center bg-white rounded-lg shadow p-4 md:p-8 h-[60vh]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader size="48px" />
          </div>
        ) : (
          <>
            {error ? (
              <div className="text-center text-red-500 py-10">
                Error: {error}
              </div>
            ) : (
              <div className="w-full h-full">
                {editingAdvisor ? (
                  <div className="mb-6 bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-3">Edit Advisor</h3>
                    <form onSubmit={handleSubmitEdit} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <input
                          type="text"
                          name="password"
                          value={formData.password}
                          onChange={handleFormChange}
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Verified
                        </label>
                        <select
                          name="verified"
                          value={formData.verified.toString()}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              verified: e.target.value === "true",
                            });
                          }}
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        >
                          <option value="true">Verified</option>
                          <option value="false">Not Verified</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleFormChange}
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        >
                          <option value="user">User</option>
                          <option value="manager">Advisor</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAdvisor(null);
                            setEditIndex(null);
                          }}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : null}

                {advisorData?.length === 0 ||
                advisorData === null ||
                advisorData === undefined ? (
                  <div className="flex items-center justify-center flex-col  h-[100%] gap-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-1">
                      No advisors found
                    </h3>
                    <label className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer">
                      Upload Excel File
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">
                        {advisorData.length} Advisors Ready
                      </h3>
                      <div className="flex gap-2">
                        <label className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer">
                          Upload New File
                          <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          onClick={handleRegisterAll}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          Register All Advisors
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Password
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email Verified
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {advisorData.map((item, index) => (
                            <AdvisorItem
                              key={index}
                              item={item}
                              index={index}
                              onEdit={handleEditAdvisor}
                              onDelete={handleDeleteAdvisor}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
