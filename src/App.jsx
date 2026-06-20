import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/todos"
      );

      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    if (!task.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/todos",
        {
          text: task,
          priority,
          completed: false,
          dueDate,
        }
      );

      setTask("");
      setDueDate("");

      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/todos/${id}`
      );

      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };
  const toggleComplete = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/todos/${id}`
    );

    fetchTodos();
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Todo Manager
        </h1>

        <div className="flex gap-2 mb-6 flex-wrap">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
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

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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
            onClick={() =>
              setFilter("Completed")
            }
            className="border px-3 py-1 rounded"
          >
            Completed
          </button>

          <button
            onClick={() =>
              setFilter("Pending")
            }
            className="border px-3 py-1 rounded"
          >
            Pending
          </button>
        </div>

        <p className="mb-4 font-semibold">
          Total Tasks: {tasks.length}
        </p>

        <div className="space-y-3">
          {tasks
            .filter((task) =>
              task.text
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .filter((task) => {
              if (
                filter === "Completed"
              )
                return task.completed;

              if (filter === "Pending")
                return !task.completed;

              return true;
            })
            .map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center border p-3 rounded"
              >
               <div className="flex items-center gap-3">
  <input
    type="checkbox"
    checked={task.completed}
    onChange={() =>
  toggleComplete(task._id)
}
  />

  <div>
    <div
      className={
        task.completed
          ? "line-through text-gray-500"
          : ""
      }
    >
      {task.priority} - {task.text}
    </div>

    <small className="text-gray-500">
      Due: {task.dueDate || "No Date"}
    </small>
  </div>
</div>

                <button
                  onClick={() =>
                    deleteTask(task._id)
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