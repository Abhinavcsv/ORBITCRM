import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CustomerTable from "../../components/customers/CustomerTable";
import AddCustomerModal from "../../components/customers/AddCustomerModal";
import DeleteCustomerModal from "../../components/customers/DeleteCustomerModal";
import ViewCustomerModal from "../../components/customers/ViewCustomerModal";
import EditCustomerModal from "../../components/customers/EditCustomerModal";
import CustomerSearch from "../../components/customers/CustomerSearch";
import StatusFilter from "../../components/customers/StatusFilter";

import {
  getCustomers,
  deleteCustomer,
} from "../../services/customerService";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const data = await getCustomers();

      setCustomers(data.customers);
    } catch (error) {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };

  const handleViewClick = (customer) => {
    setSelectedCustomer(customer);
    setIsViewOpen(true);
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCustomer(selectedCustomer._id);

      toast.success("Customer Deleted Successfully");

      setIsDeleteOpen(false);
      setSelectedCustomer(null);

      fetchCustomers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.company
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold text-slate-800">
          Customers
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Customer
        </button>

      </div>

      <div className="flex flex-col md:flex-row gap-4">

        <CustomerSearch
          search={search}
          setSearch={setSearch}
        />

        <StatusFilter
          status={status}
          setStatus={setStatus}
        />

      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          Loading Customers...
        </div>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          onDelete={handleDeleteClick}
          onView={handleViewClick}
          onEdit={handleEditClick}
        />
      )}

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCustomers}
      />

      <DeleteCustomerModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleDelete}
      />

      <ViewCustomerModal
        isOpen={isViewOpen}
        customer={selectedCustomer}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedCustomer(null);
        }}
      />

      <EditCustomerModal
        isOpen={isEditOpen}
        customer={selectedCustomer}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedCustomer(null);
        }}
        onSuccess={() => {
          fetchCustomers();
          setIsEditOpen(false);
          setSelectedCustomer(null);
        }}
      />

    </div>
  );
}

export default Customers;