const API_URL = "http://localhost:5000"; // Must match your backend

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
};

export const addTask = async (title) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};
export const updateTask = async (id, title) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};


export const deleteTask = async (id) => {
  await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
};
