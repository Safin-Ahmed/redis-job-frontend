import { useEffect, useState } from "react";
import { enqueueJob, getAllJobIds } from "../api";

// eslint-disable-next-line react/prop-types
const JobCreationForm = ({ isOpen, onClose, onJobCreated }) => {
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("normal");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobIds, setJobIds] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [newDependency, setNewDependency] = useState("");

  useEffect(() => {
    const fetchJobIds = async () => {
      const jobs = await getAllJobIds();
      setJobIds(jobs);
    };

    if (isOpen) {
      fetchJobIds();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        type,
        priority,
        data: JSON.parse(data || "{}"), // Parse job data as JSON
      };

      const response = await enqueueJob(jobData);

      if (response.success) {
        alert("Job created successfully");
        onJobCreated(); // Refresh the job list
        onClose(); // Close the popup
      } else {
        alert(response.message || "Failed to create job");
      }
    } catch (error) {
      console.log("Error in job form submission", error);
      alert("Invalid JSON in job data");
    } finally {
      setLoading(false);
    }
  };

  const addDependency = () => {
    if (newDependency && !dependencies.includes(newDependency)) {
      setDependencies([...dependencies, newDependency]);
      setNewDependency("");
    }
  };

  const removeDependency = (dependency) => {
    setDependencies(dependencies.filter((dep) => dep !== dependency));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Job Data (JSON)
            </label>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              placeholder='{"key": "value"}'
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Dependencies (Select Existing Jobs)
            </label>
            <select
              onChange={(e) => addDependency(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">-- Select Job --</option>
              {jobIds.map((jobId) => (
                <option key={jobId} value={jobId}>
                  {jobId}
                </option>
              ))}
            </select>
            <ul className="mt-2">
              {dependencies.map((dependency) => (
                <li
                  key={dependency}
                  className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded mt-1"
                >
                  <span>{dependency}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeDependency(dependency)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreationForm;
