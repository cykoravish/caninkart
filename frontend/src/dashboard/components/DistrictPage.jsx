import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const DistrictPage = () => {
  const [district, setDistrict] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { stateName, stateId } = useParams();

  const navigate = useNavigate();

  const fetchDistrict = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND}/district/${stateId}`
    );
    setDistrict(res.data);
  };

  
  const handleAddOrUpdateDistrict = async () => {
   
try {
  if (isEditing && editingId) {
    await axios.put(`${import.meta.env.VITE_BACKEND}/district/update/${editingId}`, {
      name: form.name,
      state: stateId,
    });
    toast.success("District updated");
  } else {
    await axios.post(`${import.meta.env.VITE_BACKEND}/district/add`, {
      name: form.name,
      state: stateId,
    });
    toast.success("District added");
  }

  setModalOpen(false);
  setForm({ name: "" });
  setIsEditing(false);
  setEditingId(null);
  fetchDistrict();
} catch (err) {
  console.error("Error adding/updating district", err);
  toast.error("Something went wrong");
}

  };

  useEffect(() => {
    fetchDistrict();
  }, [stateId]);

  const handleDeleteDistrict = async (id) => {
    if (!window.confirm("Are you sure you want to delete this district?"))
      return;
   
try {
  await axios.delete(`${import.meta.env.VITE_BACKEND}/district/delete/${id}`);
  toast.success("District deleted");
  fetchDistrict();
} catch (err) {
  console.error("Error deleting district", err);
  toast.error("Failed to delete district");
}

  };

  return (
    <>
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1
          onClick={() => navigate(-1)}
          className="cursor-pointer text-2xl font-semibold"
        >
          ← State/ {stateName}
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-full"
        >
          + Add District
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {district.map((district) => (
          // <div key={district._id} className="bg-[#EFF1F3] rounded-2xl p-6 shadow-md w-64">

          //   <h3 className="font-semibold text-lg">{district.name}</h3>

          // </div>
          <div
            key={district._id}
            className="bg-[#EFF1F3] rounded-2xl p-6 shadow-md w-64 relative group"
          >
            <h3 className="font-semibold text-lg">{district.name}</h3>

            <div className="absolute bottom-2 right-2 flex gap-2 ">
              <button
                onClick={() => {
                  setForm({ name: district.name });
                  setIsEditing(true);
                  setEditingId(district._id);
                  setModalOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800 text-lg cursor-pointer"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteDistrict(district._id)}
                className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-xl p-8 w-96 space-y-4 shadow-lg">
            <input
              type="text"
              placeholder="State Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded-md w-full"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="border px-6 py-2 rounded-full"
              >
                Discard
              </button>
              <button
                onClick={handleAddOrUpdateDistrict}
                className="bg-black text-white px-6 py-2 rounded-full"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <ToastContainer position="top-right" autoClose={2000} />
   </>
  );
};

export default DistrictPage;
