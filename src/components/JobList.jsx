import { useEffect, useState } from "react";
import { getAllJobs, cancelJob, getJobResult, deleteJob } from "../api";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    const jobData = await getAllJobs();
    setJobs(jobData);
    setLoading(false);
  };

  const handleCancel = async (jobId) => {
    const response = await cancelJob(jobId);
    if (response.success) {
      alert("Job cancelled successfully");
      fetchJobs(); // Refresh the job list
    } else {
      alert(response.message || "Failed to cancel job");
    }
  };

  const handleViewResult = async (jobId) => {
    const response = await getJobResult(jobId);
    if (response.success) {
      alert(`Job Result: ${response.result || "No result available"}`);
    } else {
      alert(response.message || "Failed to fetch job result");
    }
  };

  const handleDelete = async (jobId) => {
    const response = await deleteJob(jobId);
    if (response.success) {
      alert("Job deleted successfully");
      fetchJobs(); // Refresh the job list
    } else {
      alert(response.message || "Failed to delete job");
    }
  };

  useEffect(() => {
    fetchJobs();
    if (isFirstTime) {
      setIsFirstTime(false);
    }
    const interval = setInterval(fetchJobs, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Job List</h2>
      {loading && isFirstTime ? (
        <div className="text-center text-gray-500">Loading jobs...</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Job ID</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Progress</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.jobId} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {job.jobId}
                </td>
                <td className="border border-gray-300 px-4 py-2">{job.type}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {job.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="relative w-full bg-gray-200 h-4 rounded">
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-600 rounded"
                      style={{ width: `${job.progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-center mt-1">
                    {job.progress || 0}%
                  </p>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleViewResult(job.jobId)}
                    >
                      View Result
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(job.jobId)}
                    >
                      Delete
                    </button>

                    {job.status === "PENDING" || job.status === "PROCESSING" ? (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => handleCancel(job.jobId)}
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobList;
