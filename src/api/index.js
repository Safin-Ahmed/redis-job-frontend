import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

// Fetch Worker Health
export const getWorkerHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workers`);
    return response.data.workers;
  } catch (error) {
    console.error("Error fetching worker health", error);
    return [];
  }
};

// Fetch Job Statistics
export const getJobStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/stats`);
    console.log({ response });
    return response.data.stats;
  } catch (error) {
    console.error("Error fetching job statistics: ", error);
    return {
      PENDING: 0,
      PROCESSING: 0,
      COMPLETED: 0,
      FAILED: 0,
    };
  }
};

// Enqueue a New Job
export const enqueueJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error enqueuing job: ", error);
    return { success: false, message: "Failed to enqueue job" };
  }
};

// Fetch Job Details By Job ID
export const getJobDetails = async (jobId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`);
    return response.data.job;
  } catch (error) {
    console.error("Error fetching job details: ", error);
    return null;
  }
};

// Fetch all jobs
export const getAllJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`);
    return response.data.jobs;
  } catch (error) {
    console.error("Error fetching all jobs: ", error);
    return [];
  }
};

// Cancel a job
export const cancelJob = async (jobId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jobs/${jobId}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling job: ", error);
    return { success: false, message: "Failed to cancel job" };
  }
};

// Fetch all job IDs
export const getAllJobIds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/ids`);
    return response.data.jobIds || [];
  } catch (error) {
    console.error("Error fetching job IDs: ", error);
    return [];
  }
};

// Get Job Result
export const getJobResult = async (jobId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}/result`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job result: ", error);
    return { success: false, message: "Failed to fetch job result" };
  }
};

// Delete Job
export const deleteJob = async (jobId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job: ", error);
    return { success: false, message: "Failed to delete job" };
  }
};
