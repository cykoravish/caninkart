// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMsg("");

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND}/api/admin/login`,
//         {
//           email,
//           password,
//         },{withCredentials : true},
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       setMsg("✅ Login successful!");

      
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1500);
//     } catch (err) {
//       setMsg(err.response?.data?.message || "❌ Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="p-8 rounded-2xl shadow-md w-full max-w-sm bg-white"
//         autoComplete="off"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
//           Admin Login
//         </h2>

//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-3 px-4 py-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-3 px-4 py-2 border rounded"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full ${
//             loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
//           } text-white py-2 rounded`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         <p className="mt-3 text-center text-sm text-red-600">{msg}</p>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.message === "Login successful") {
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
