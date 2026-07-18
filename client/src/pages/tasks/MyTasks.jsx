import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMyTasks } from "../../services/taskService";
import TaskTable from "../../components/tasks/TaskTable";

function MyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const data = await getMyTasks();
      setTasks(data.tasks);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Tasks</h1>

      <TaskTable tasks={tasks} />
    </div>
  );
}

export default MyTasks;