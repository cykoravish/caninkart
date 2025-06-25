import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminContact = () => {
  const [contactData, setContactData] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null); // NEW

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/cnt/contact`);
        setContactData(res.data);
      } catch (error) {
        console.error('Error fetching contact messages:', error);
      }
    };

    fetchContactData();
  }, []);

  return (
    <div className='bg-[#D7D9DD] min-h-screen'>
      {/* Contact Table */}
      <div className=" rounded-xl p-4 max-w-7xl mx-auto overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-600 font-semibold text-2xl">Contact</h3>
        </div>
        <div className="bg-[#EFF1F3] px-6 rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="text-gray-500">
              <tr>
                <th className="py-2 pr-4 text-lg">S no</th>
                <th className="py-2 pr-4 text-lg">Name</th>
                <th className="py-2 pr-4 text-lg">Contact</th>
                <th className="py-2 pr-4 text-lg">Email</th>
                <th className="py-2 pr-4 text-lg">Message</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((data, index) => (
                <tr key={data._id} className="hover:bg-gray-50">
                  <td className="py-2 pr-4">{index + 1}</td>
                  <td className="py-2 pr-4">{data.name}</td>
                  <td className="py-2 pr-4">{data.contact}</td>
                  <td className="py-2 pr-4">{data.email}</td>
                  <td
                    className="py-2 pr-4 max-w-[150px] truncate text-blue-600 cursor-pointer"
                    onClick={() => setSelectedMessage(data.message)}
                  >
                    {data.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Full Message */}
      {selectedMessage && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800"> Message</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
