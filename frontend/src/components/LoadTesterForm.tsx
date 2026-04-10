import { useState } from "react";
import { motion } from "framer-motion";
import { testApi } from "../services/api";

const LoadTesterForm = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [totalRequests, setTotalRequests] = useState(10);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url) {
      alert("Please enter URL");
      return;
    }

    setLoading(true);
    try {
      const data = await testApi({
        url,
        method,
        totalRequests,
      });
      setResult(data);
    } catch (error) {
      alert("Error while testing the API");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">

      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8"
      >

        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          API Load Tester 🚀
        </h2>

       
        <div className="space-y-4">

         
          <input
            className="w-full rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Enter API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          
          <div className="flex gap-4">

            <select
              className="flex-1 rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-white focus:outline-none"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option className="text-black" value="GET">GET</option>
              <option className="text-black" value="POST">POST</option>
            </select>

            <input
              type="number"
              className="flex-1 rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-white placeholder-gray-300 focus:outline-none"
              placeholder="Requests"
              value={totalRequests}
              onChange={(e) => setTotalRequests(Number(e.target.value))}
            />

          </div>

          
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition duration-200"
          >
            {loading ? "Testing..." : "Start Testing"}
          </motion.button>

        </div>

      
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 rounded-xl bg-white/10 border border-white/20"
          >
            <h3 className="text-white font-semibold mb-4">Results</h3>

            <div className="grid grid-cols-2 gap-4 text-white text-sm">

              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-gray-300 text-xs">Total</p>
                <p className="text-lg font-semibold">{result.total}</p>
              </div>

              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-gray-300 text-xs">Success</p>
                <p className="text-lg font-semibold text-green-400">
                  {result.success}
                </p>
              </div>

              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-gray-300 text-xs">Failed</p>
                <p className="text-lg font-semibold text-red-400">
                  {result.failed}
                </p>
              </div>

              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-gray-300 text-xs">Avg Time</p>
                <p className="text-lg font-semibold">
                  {result.avgTime} ms
                </p>
              </div>

              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-gray-300 text-xs">Min Time</p>
                <p className="text-lg font-semibold">
                  {result.minTime} ms
                </p>
              </div>

              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-gray-300 text-xs">Max Time</p>
                <p className="text-lg font-semibold">
                  {result.maxTime} ms
                </p>
              </div>

            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default LoadTesterForm;