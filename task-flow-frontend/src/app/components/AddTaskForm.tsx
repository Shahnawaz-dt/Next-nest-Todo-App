'use client';
import { useState } from 'react';

// This interface tells TypeScript that onTaskAdded is a function
interface AddTaskFormProps {
  onTaskAdded: () => void;
}

export default function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Fetching from your Backend on Port 3001
      const res = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: desc, status: 'OPEN' }),
      });

      if (res.ok) {
        setTitle('');
        setDesc('');
        // This triggers the fetchTasks function in page.tsx
        onTaskAdded(); 
      }
    } catch (err) {
      console.error("Failed to save task", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 text-black">
      <input 
        className="p-2 border rounded"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea 
        className="p-2 border rounded"
        placeholder="Task Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
}