const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

// Generic function to handle API requests
const fetchData = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = {
    method,
    headers,
  };

  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

// User Authentication
export const loginUser = async (email, password) => {
  return await fetchData("auth/login", "POST", { email, password });
};

export const registerUser = async (name, email, password) => {
  return await fetchData("auth/register", "POST", { name, email, password });
};

// Project Management
export const getProjects = async (token) => {
  return await fetchData("projects", "GET", null, token);
};

export const createProject = async (projectData, token) => {
  return await fetchData("projects", "POST", projectData, token);
};

// Tasks
export const getTasks = async (projectId, token) => {
  return await fetchData(`projects/${projectId}/tasks`, "GET", null, token);
};

export const createTask = async (projectId, taskData, token) => {
  return await fetchData(`projects/${projectId}/tasks`, "POST", taskData, token);
};

// Chat Messaging (Optional)
export const sendMessage = async (room, message, token) => {
  return await fetchData("chat/send", "POST", { room, message }, token);
};
