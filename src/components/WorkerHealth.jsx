import { useEffect, useState } from "react";
import { getWorkerHealth } from "../api";

const WorkerHealth = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkerHealth = async () => {
      const workerData = await getWorkerHealth();
      setWorkers(workerData);
    };
    fetchWorkerHealth();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Worker Health</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Worker ID</th>
            <th className="border border-gray-300 px-4 py-2">Queue</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.worker_id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {worker.worker_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {worker.queue}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 font-bold ${
                  worker.status === "ALIVE" ? "text-green-600" : "text-red-600"
                }`}
              >
                {worker.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {worker.last_seen}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerHealth;
