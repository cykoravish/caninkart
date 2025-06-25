import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const StatePage = () => {
  const [states, setStates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '' });

  const { countryName, countryId } = useParams();
  const navigate = useNavigate();

  const fetchStates = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND}/state/${countryId}`);
    setStates(res.data);
  };
  

  const handleAddState = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND}/state/add`, {
      name: form.name,
      country: countryId,
    });
    setModalOpen(false);
    setForm({ name: '' });
    fetchStates();
  };

  useEffect(() => {
    fetchStates();
  }, [countryId]);

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="flex justify-between items-center mb-6">

        <h1 onClick={() => navigate(-1)} className="cursor-pointer text-2xl font-semibold">
          ← Country / {countryName}
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-full"
        >
          + Add State
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {states.map((state) => (
          <Link
            key={state._id}
            to={`/dashboard/district/${countryId}/${state.name}/${state._id}`}
            className="bg-[#EFF1F3] rounded-2xl p-6 shadow-md w-64 hover:shadow-lg transition duration-200"
          >
            <h3 className="font-semibold text-lg">{state.name}</h3>
            <div className="text-sm mt-2 space-y-1">
              <span className="text-blue-400">● <span className="text-[#777676]">Districts</span></span>
            </div>
          </Link>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-xl p-8 w-96 space-y-4 shadow-lg">
            <input
              type="text"
              placeholder="state Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
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
                onClick={handleAddState}
                className="bg-black text-white px-6 py-2 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatePage;
