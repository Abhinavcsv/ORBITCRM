import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TaskTable from "../../components/tasks/TaskTable";
import AddTaskModal from "../../components/tasks/AddTaskModal";
import DeleteTaskModal from "../../components/tasks/DeleteTaskModal";
import ViewTaskModal from "../../components/tasks/ViewTaskModal";
import EditTaskModal from "../../components/tasks/EditTaskModal";
import TaskSearch from "../../components/tasks/TaskSearch";
import TaskStatusFilter from "../../components/tasks/TaskStatusFilter";

import {
  getTasks,
  deleteTask,
} from "../../services/taskService";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data.tasks);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  const handleViewClick = (task) => {
    setSelectedTask(task);
    setIsViewOpen(true);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(selectedTask._id);

      toast.success("Task Deleted Successfully");

      setIsDeleteOpen(false);
      setSelectedTask(null);

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.assignedTo?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "" || task.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <TaskSearch
          search={search}
          setSearch={setSearch}
        />

        <TaskStatusFilter
          status={status}
          setStatus={setStatus}
        />
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          Loading Tasks...
        </div>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          onDelete={handleDeleteClick}
          onView={handleViewClick}
          onEdit={handleEditClick}
        />
      )}

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTasks}
      />

      <DeleteTaskModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedTask(null);
        }}
        onConfirm={handleDelete}
      />

      <ViewTaskModal
        isOpen={isViewOpen}
        task={selectedTask}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedTask(null);
        }}
      />

      <EditTaskModal
        isOpen={isEditOpen}
        task={selectedTask}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedTask(null);
        }}
        onSuccess={() => {
          fetchTasks();
          setIsEditOpen(false);
          setSelectedTask(null);
        }}
      />
    </div>
  );
}

export default Tasks;