import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DistrictPage = () => {
  const [district, setDistrict] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '' });

  const { stateName, stateId } = useParams();

  const navigate = useNavigate();

  const fetchDistrict = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND}/district/${stateId}`);
    setDistrict(res.data);
  };

  const handleAddState = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND}/district/add`, {
      name: form.name,
      state: stateId
    });

    setModalOpen(false);
    setForm({ name: '' });
    fetchDistrict();
  };

  useEffect(() => {
    fetchDistrict();
  }, [stateId]);

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 onClick={() => navigate(-1)} className="cursor-pointer text-2xl font-semibold">← State/ {stateName}</h1>
        <button onClick={() => setModalOpen(true)} className="bg-black text-white px-4 py-2 rounded-full">+ Add District</button>
      </div>

      <div className="flex flex-wrap gap-6">
        {district.map((district) => (
          <div key={district._id} className="bg-[#EFF1F3] rounded-2xl p-6 shadow-md w-64">

            <h3 className="font-semibold text-lg">{district.name}</h3>
            
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
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded-md w-full"
            />

            <div className="flex justify-between">
              <button onClick={() => setModalOpen(false)} className="border px-6 py-2 rounded-full">Discard</button>
              <button onClick={handleAddState} className="bg-black text-white px-6 py-2 rounded-full">Save</button>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default DistrictPage;
