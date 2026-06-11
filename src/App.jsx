import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
   {
  id: Date.now(),
  text: task,
  completed: false,
  priority: priority,
  dueDate: dueDate,
}
    ]);

   setDueDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Todo Manager
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <select
  value={priority}
  onChange={(e) =>
    setPriority(e.target.value)
  }
  className="border p-2 rounded"
>
  <option>High</option>
  <option>Medium</option>
  <option>Low</option>
</select>
<input
  type="date"
  value={dueDate}
  onChange={(e) =>
    setDueDate(e.target.value)
  }
  className="border p-2 rounded"
/>

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <p className="mb-4 font-semibold">
          <input
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border p-2 rounded mb-4"
/>
<div className="flex gap-2 mb-4">
  <button
    onClick={() => setFilter("All")}
    className="border px-3 py-1 rounded"
  >
    All
  </button>

  <button
    onClick={() => setFilter("Completed")}
    className="border px-3 py-1 rounded"
  >
    Completed
  </button>

  <button
    onClick={() => setFilter("Pending")}
    className="border px-3 py-1 rounded"
  >
    Pending
  </button>
</div>
          Total Tasks: {tasks.length}
        </p>

        <div className="space-y-3">
         {tasks
  .filter((task) =>
    task.text
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter((task) => {
    if (filter === "Completed")
      return task.completed;

    if (filter === "Pending")
      return !task.completed;

    return true;
  })
  .map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleComplete(task.id)
                  }
                />

                <span
                  className={
                    task.completed
                      ? "line-through text-gray-500"
                      : ""
                  }
                >
                 <div>
  <div>
    {task.priority} - {task.text}
  </div>

  <small className="text-gray-500">
    Due: {task.dueDate || "No Date"}
  </small>
</div>
                </span>
              </div>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;