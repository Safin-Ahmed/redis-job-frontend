import { useEffect, useState } from "react";
import { getJobStats } from "../api";

const JobStats = () => {
  const [stats, setStats] = useState({
    PENDING: 0,
    PROCESSING: 0,
    COMPLETED: 0,
    FAILED: 0,
  });

  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const fetchJobStats = async () => {
      const statsData = await getJobStats();
      setStats(statsData);
    };

    if (isFirstTime) {
      fetchJobStats();
      setIsFirstTime(false);
    }

    const interval = setInterval(fetchJobStats, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Job Statistics</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([status, count]) => (
            <tr key={status} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{status}</td>
              <td className="border border-gray-300 px-4 py-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobStats;
