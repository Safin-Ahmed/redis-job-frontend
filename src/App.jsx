import { useState } from "react";
import JobCreationForm from "./components/JobCreationForm";
import JobList from "./components/JobList";
import JobStats from "./components/JobStats";
import WorkerHealth from "./components/WorkerHealth";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Job Queue Dashboard
      </h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-6"
        onClick={() => setIsFormOpen(true)}
      >
        Create Job
      </button>
      <WorkerHealth />
      <JobStats />
      <JobList />
      <JobCreationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onJobCreated={() => window.location.reload()} // Refresh page on job creation
      />
    </div>
  );
};

export default App;
