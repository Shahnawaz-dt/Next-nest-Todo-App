'use client';
import { useEffect, useState } from 'react';
import AddTaskForm from '../components/AddTaskForm';



export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Function to fetch tasks from NestJS (Port 3001)
  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:3001/tasks');
      if (!res.ok) throw new Error('Backend unreachable');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Connection Error:", err);
    }
  };

  
  // 1. Set isClient to true once the browser is ready
  // 2. Initial fetch of data
  useEffect(() => {
    setIsClient(true);
    fetchTasks();
  }, []);

  const deleteTask = async (id: string) => {
  await fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' });
  fetchTasks(); // Refresh the list
};

const toggleStatus = async (id: string, currentStatus: string) => {
  const newStatus = currentStatus === 'OPEN' ? 'DONE' : 'OPEN';
  await fetch(`http://localhost:3001/tasks/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });
  fetchTasks(); // Refresh the list
};

  // Return null or a loader while the server and client are syncing
  if (!isClient) return null;

  return (
    <main className="max-w-2xl mx-auto p-8 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Flow</h1>
      
      {/* Pass fetchTasks as the callback to the form */}
      <AddTaskForm onTaskAdded={fetchTasks} />

      <div className="mt-8 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task: any) => (
            <div key={task.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
                  <div>
                    <h2 className={`text-xl font-semibold ${task.status === 'DONE' ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </h2>
                    <p className="text-gray-600">{task.description}</p>
                    </div>
                      <div className="flex gap-2">
                      <button 
                      onClick={() => toggleStatus(task.id, task.status)}
                      className="text-blue-500 hover:underline">
                      {task.status === 'OPEN' ? 'Complete' : 'Undo'}
                       </button>
                      <button 
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No tasks yet. Create one!</p>
        )}

        
      </div>
    </main>
  );
}