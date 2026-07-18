import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import EmployeeTable from "../../components/employees/EmployeeTable";
import AddEmployeeModal from "../../components/employees/AddEmployeeModal";
import DeleteEmployeeModal from "../../components/employees/DeleteEmployeeModal";
import EmployeeSearch from "../../components/employees/EmployeeSearch";
import DepartmentFilter from "../../components/employees/DepartmentFilter";
import ViewEmployeeModal from "../../components/employees/ViewEmployeeModal";
import EditEmployeeModal from "../../components/employees/EditEmployeeModal";

import {
  getEmployees,
  deleteEmployee,
} from "../../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const data = await getEmployees();

      setEmployees(data.employees);
    } catch (error) {
      console.error("Employee Fetch Error:", error);
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteOpen(true);
  };
  const handleViewClick = (employee) => {
  setSelectedEmployee(employee);
  setIsViewOpen(true);
};
const handleEditClick = (employee) => {
  setSelectedEmployee(employee);
  setIsEditOpen(true);
};

  const handleDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee._id);

      toast.success("Employee Deleted Successfully");

      setIsDeleteOpen(false);
      setSelectedEmployee(null);

      fetchEmployees();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  // Live Search
  const filteredEmployees = employees.filter((emp) => {
  const matchesSearch =
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase());

  const matchesDepartment =
    department === "" ||
    emp.department.trim().toLowerCase() ===
      department.trim().toLowerCase();

  return matchesSearch && matchesDepartment;
});

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold text-slate-800">
          Employees
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Employee
        </button>

      </div>

      <div className="flex flex-col md:flex-row gap-4">

  <EmployeeSearch
    search={search}
    setSearch={setSearch}
  />

  <DepartmentFilter
    department={department}
    setDepartment={setDepartment}
  />

</div>

      {/* Employee Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          Loading Employees...
        </div>
      ) : (
        <EmployeeTable
  employees={filteredEmployees}
  onDelete={handleDeleteClick}
  onView={handleViewClick}
  onEdit={handleEditClick}
/>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchEmployees}
      />
      <ViewEmployeeModal
  isOpen={isViewOpen}
  employee={selectedEmployee}
  onClose={() => {
    setIsViewOpen(false);
    setSelectedEmployee(null);
  }}
/>

      {/* Delete Employee Modal */}
      <DeleteEmployeeModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedEmployee(null);
        }}
        onConfirm={handleDelete}
      />
      <EditEmployeeModal
  isOpen={isEditOpen}
  employee={selectedEmployee}
  onClose={() => {
    setIsEditOpen(false);
    setSelectedEmployee(null);
  }}
  onSuccess={() => {
    fetchEmployees();
    setIsEditOpen(false);
    setSelectedEmployee(null);
  }}
/>

    </div>
  );
}

export default Employees;